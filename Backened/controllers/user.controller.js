import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import uploadOnCloudinary from "../utils/cloudinary.js";


export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    }
    const file = req.file;
    const CloudinaryFile = await uploadOnCloudinary(file.path, {
      folder: "Profiles",
    });

    if (!file) {
      return res.status(400).json({
        message: "Please upload a profile picture",
        success: false
      });
    }


    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      Profile: {
        profilePhoto:CloudinaryFile.secure_url,
       } // Save the Cloudinary URL
    });

    console.log("User created successfully:", newUser); // ✅ Proper logging

    return res.status(201).json({
      message: "Account created successfully",
      user: newUser,
      success: true
    });

  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    };

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    };

    //check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role",
        success: false
      });
    };

    const tokenData = {
      userId: user._id
    }
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

    // user = {
    //   _id: User._id,
    //   fullname: User.fullname,
    //   email: User.email,
    //   phoneNumber: User.phoneNumber,
    //   role: User.role,
    //   Profile: User.Profile,

    // }


    return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
      message: `Welcome back ${user.fullname}`,
      user,
      success: true
    })

  } catch (error) {
    console.log(error);
  }
}

export const logout = async (req, res) => {
  try {
    console.log(req.body);

    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged Out Successfully",
      success: true
    })

  } catch (error) {
    console.log(error);
  }
}


export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    // ✅ Use req.file for single file upload

    console.log("File received:", req.file);
    // console.log("Body received:", req.body);
    const file = req.file.path; // ✅ Use req.file for single file upload
    // console.log("path\n");
    // console.log(file);
    const CloudinaryFile = await uploadOnCloudinary(file, {
      folder: "Profiles",
    });

    // console.log("Cloudinary response:", CloudinaryFile);
    const skillsArray = skills ? skills.split(",").map(skill => skill.trim()) : [];

    const userId = req.Id; // ✅ Same name from middleware authentication
    let user = await User.findById(userId);


    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Update only if fields are provided
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.Profile.bio = bio;
    if (skills) user.Profile.skills = skillsArray;

    // resume comes later
    if (CloudinaryFile) {
      user.Profile.resume = CloudinaryFile.secure_url//save the cloudinary url
      user.Profile.resumeOriginalName = req.file?.originalname //save the original file name
      console.log("Resume uploaded to Cloudinary:", user.Profile.resume);
      console.log("Resume originalName to Cloudinary:", user.Profile.resumeOriginalName);

    }

    await user.save();

    // Optional: return cleaned user object
    const responseUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      Profile: user.Profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user: responseUser,
      success: true,
    });

  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      message: "Server error while updating profile",
      success: false,
    });
  }
};
