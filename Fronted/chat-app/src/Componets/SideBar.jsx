import React from 'react'

const SideBar = () => {
    const users =[
        "bhavesh",
        "chirag",
        "rusbha",
        "prtik",
    ];
  return (
    <div className='hidden md:block w-[300px] bg-gray-900 text-white p-5 border-r border-gray-700 overflow-y-auto'>
        <h1 className='text-3xl font-bold mb-8'>Chats</h1>

        <input type='text' placeholder='Search users chats..' 
        className='w-full p-3 rounded-lg bg-gray-800 outline-none mb-6'/>

        <div className='space-y-4'>
            {users.map((user,index)=>(
                <div key={index} 
                className='bg-gray-800 p-4 rounded-xl hover:bg-gray-700 cursor-pointer transition-all'>
                    <h2 className='font-semibold'>{user}</h2>

                </div>
            ))}

        </div>
      
    </div>
  )
}

export default SideBar
