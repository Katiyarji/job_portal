
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany = companies.length >= 0 && companies.filter((company) => {
      if (!searchCompanyByText) {
        return true;
      };
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText])
  return (
    <div>
      <Table>
        <TableCaption>List of your recent registered Companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            companies.length === 0 ? <span>You have not registered company yet</span> :
              (
                <>
                  {
                    filterCompany?.map((company) => (
                      <TableRow key={company._id}>

                        <TableCell>
                          <Avatar className="h-14 w-14 ">
                            <AvatarImage src={company?.logo} alt="Profile" ></AvatarImage>
                          </Avatar>
                        </TableCell>
                        <TableCell>{company.name}</TableCell>
                        <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                        <TableCell className="text-right cursor-pointer">
                          <Popover>
                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                            <PopoverContent className="w-32">
                              <div className='flex items-center gap-2 w-fit' onClick={()=>navigate(`/admin/companies/${company?._id}`)}>
                                <Edit2 />
                                <span>Edit</span>
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

export default CompaniesTable