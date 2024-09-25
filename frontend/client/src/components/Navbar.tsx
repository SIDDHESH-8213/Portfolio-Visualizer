import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-[#e9ecf3] rounded-[4rem] py-4 px-6 flex flex-row justify-between mt-2 mx-[1.5rem]'>
        
        <div className='text-black font-bold text-lg'>
            <Link to="/">Portfolio Pro</Link>
        </div>

        <div className='flex flex-row justify-between w-[25%] text-base'>
            <Link to='/Analysis'>Analysis</Link>
            <Link to='/Markets'>Indicators</Link>
            <Link to='/'>Docs</Link>
            <Link to='/'>Sign Up</Link>
            <Link to='/'>Log In</Link>
        </div>
    </div>
  )
}

export default Navbar