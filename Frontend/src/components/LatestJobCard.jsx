import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom';

const LatestJobCard = ({job}) => {
const navigate = useNavigate();

  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
      <div>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>{job?.company?.location}</p>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4' >
        <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position}</Badge>
        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
        <Badge className={'text-[#7209B7] font-extrabold'} variant="ghost">{job?.salary} LPA</Badge>
      </div>
      <div className='flex items-center gap-4 mt-5'>
        <Button variant="outline" onClick={()=>navigate(`/description/${job?._id}`)} >Details</Button>
        <Button className="bg-[#7209B7]">Save for later</Button>
      </div>
    </div>
  )
}

export default LatestJobCard