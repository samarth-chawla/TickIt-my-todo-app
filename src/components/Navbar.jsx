import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-[#444479] w-full py-4 flex text-[#FF6E6E] items-center justify-between px-10 gap-5'>
        <h1 className='font-bold text-2xl'>TickIt</h1>
        <ul className='list-none flex gap-8 text-[#FF6E6E] justify-center text-lg items-center'>
            <li className='cursor-pointer hover:font-bold'>Home</li>
            <li className='cursor-pointer hover:font-bold'>Your Tasks</li> 
        </ul>
    </div>
  )
}

export default Navbar