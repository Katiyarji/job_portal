import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/job/get`,{withCredentials:true});
        if(res?.data?.success){
          dispatch(setAllJobs(res?.data?.jobs));
        }
       
        
      } catch (error) {
        console.log(error);

      }
    }
    fetchAllJobs();
  }, [])

}

export default useGetAllJobs