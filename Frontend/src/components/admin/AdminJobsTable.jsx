
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'

const AdminJobsTable = () => {
  useGetAllAdminJobs();

  const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJob = allAdminJobs.filter((Job) => {
      if (!searchJobByText) {
        return true;
      };
      return Job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || Job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredJob);
  }, [allAdminJobs, searchJobByText])
  return (
    <div>
      <Table>
        <TableCaption>List of your recent Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {

            (
              <>
                {
                  filterJobs?.map((Job) => (
                    <TableRow key={Job._id}>


                      <TableCell>{Job?.company?.name}</TableCell>
                      <TableCell>{Job?.title}</TableCell>
                      <TableCell>{Job.createdAt.split("T")[0]}</TableCell>
                      <TableCell className="text-right cursor-pointer">
                        <Popover>
                          <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                          <PopoverContent className="w-32">
                            <div className='flex items-center gap-2 w-fit' onClick={() => navigate(`/admin/companies/${Job?._id}`)}>
                              <Edit2 />
                              <span>Edit</span>
                            </div>
                            <div onClick={()=>navigate(`/admin/jobs/${Job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2' >
                              <Eye className='w-4'/>
                              <span>Applicants</span>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>


                  ))
                }

              </>
            )
          }

        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobsTable