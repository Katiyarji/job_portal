import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'



const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });
  const { loading } = useSelector(store => store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    console.log(input.code);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post('/api/user/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      if (res?.data?.success) {
        navigate("/login");
        toast.success(res.data.message);
      } else {
        console.log("Registration failed:", res);
        toast.error(res?.data?.message || "Registration failed");
      }
    } catch (error) {
      console.log("Axios error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally{
      dispatch(setLoading(false));
    }

  }
  return (
    <div>
      <Navbar></Navbar>
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10 '>
          <h1 className='font-bold text-xl mb-5 text-center'>Sign Up</h1>
          <div className='my-2' >
            <Label >Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Richa katiyar" required
            />
          </div>
          <div className='my-2' >
            <Label >Email</Label>
            <Input type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Richakatiyar@gmail.com"
              required
            />
          </div>
          <div className='my-2' >
            <Label >Phone Number</Label>
            <Input type="number"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder=" Phone Number"
              required
            />
          </div>
          <div className='my-2' >
            <Label >Password</Label>
            <Input type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="****" required
            />
          </div>
          <div className='flex items-center justify-between'>
            <RadioGroup className='flex items-center gap-2 my-5 mx-3 px-1 border-2  rounded-md' >
              <div className="flex items-center gap-3 ">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  id="r1"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  id="r2"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-3">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          <div>
            {
              loading ? <Button className="w-full my-4 bg-pink-500"><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</Button> : <Button type="submit" className="w-full text-xl bg-amber-300 my-4" variant="link" >SignUp</Button>
            }
            <div className='flex items-center justify-center'>
              <span >Already have an account ? <Link to="/login" className='text-blue-600  font-medium'>Login</Link> </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup