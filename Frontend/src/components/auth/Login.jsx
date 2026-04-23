import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button, buttonVariants } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setLoading, setUser } from '@/redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { Loader2 } from 'lucide-react'


const Login = () => {

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault();


    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      if (res?.data?.success) {
        navigate("/");
        dispatch(setUser(res?.data?.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login failed");

    } finally {
      dispatch(setLoading(false));
    }
  }
  return (
    <div>
      <Navbar></Navbar>
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10 '>
          <h1 className='font-bold text-xl mb-5 text-center'>Login</h1>

          <div className='my-2' >
            <Label >Email</Label>
            <Input type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Richakatiyar@gmail.com" required
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

          </div>
          <div>
            {
              loading ? <Button className="w-full my-4 bg-pink-500"><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</Button> : <Button type="submit" className="w-full text-xl bg-amber-300 my-4" variant="link" >Login</Button>
            }

            <div className='flex items-center justify-center'>
              <span >Don't have an account ? <Link to="/signup" className='text-blue-600  font-medium'>SignUp</Link> </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login