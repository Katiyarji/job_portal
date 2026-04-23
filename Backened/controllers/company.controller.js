import { Company } from '../models/company.model.js';
import uploadOnCloudinary from '../utils/cloudinary.js';

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400), json({
        message: "Company name is required",
        success: false,
      })
    };
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register same company",
        success: false,
      })
    };
    company = await Company.create({
      name: companyName,
      userId: req.Id,
    });
    return res.status(201).json({
      message: "Company reistered successfully",
      company,
      success: true
    });
  }
  catch (error) {
    console.log(error);
  }
}

export const getCompany = async (req, res) => {
  try {
    const userId = req.Id; //loggedin userId
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found",
        success: false,
      })
    };
    return res.status(200).json({
      companies,
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      })
    };

    return res.status(200).json({
      company,
      success: true
    })
  } catch (error) {
    console.log(error)
  }
}

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const file = req.file;
    //idhar cloudinary
    // console.log("File received:", file);
    if (!file) {
      return res.status(400).json({
        message: "Please upload a profile picture",
        success: false
      });
    }

    const CloudinaryFile = await uploadOnCloudinary(file.path, {
      folder: "logo",
    });
    // console.log("Cloudinary response:", CloudinaryFile);

    const updateData = {
      name,
      description,
      website,
      location,
      logo: CloudinaryFile.secure_url
    };
    //console.log("Update Data:", updateData);

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
    // console.log("Updated Company:", company);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false
      })
    };
    return res.status(200).json({
      message: "Company information updated",
      company,
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}