import React from 'react'
import { Link } from 'react-router-dom'

interface functions {
    name: string;
    addre: string;
}

interface props  {
    Title: string;
    description: string;
    functions1: functions[];
}

const ToolBox = ({Title, description, functions1 = []}: props) => {
  return (
    <div className='h-[380px] w-[330px] bg-[#f3f4f6e9] p-5 rounded-2xl'>
        <div>
            <h1 className='text-[1.75rem] font-normal mb-[0.5rem] text-[#212529]'>{Title}</h1>
        </div>
        <hr className="border-[#1200ff] mb-3 border-[1.5px]" />
        <p className='text-left mb-[1rem] text-gray-800 text-base'>
            {description}
        </p>
        <div className='flex flex-col gap-2'>

            {functions1.map((opt) => (
                <div className='flex flex-row align-middle items-center'>
                    <Link to={opt.addre} className=' hover:underline font-[500] text-sm'>{opt.name}</Link>
                    <span className='text-[#1200ff] ml-1 font-medium text-xl'>{'»'}</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ToolBox