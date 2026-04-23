import { Radio } from 'lucide-react'
import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "NCR", "Mumbai", "Bangalore", "Pune", "Chennai", "Hyderabad"]
  },
  {
    filterType: "Industry",
    array: ["Frontened Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1 lakh to 5 lakh"]
  }
]

const FilterCard = () => {
  return (
    <div className='w-full bg-white p-2 rounded-full '>
      <h1  className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3 ' />
      <RadioGroup>
        {
          filterData.map((data, index) => (
            <div key={index}>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item, indx) => {
                  return (
                    <div key={indx} className='flex items-center space-x-2 m-2'>
                      <RadioGroupItem value={item} />
                      <Label>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard