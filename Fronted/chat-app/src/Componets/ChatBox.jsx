import React from 'react'
import MessageInput from './MessageInput'


const ChatBox = () => {
  return (
    <div className='flex-1 flex flex-col text-white bg-cover bg-center overflow-hidden'>
        <div className='p-5 border-b border-gray-800 bg-gray-900'>
            <h1 className='text-2xl font-bold'>Janak</h1>

            <p className='text-green-400 text-sm'>
                Online
            </p>
        </div>

        <div className='flex-1 p-3 md:p-5 overflow-y-auto space-y-4'>
            <div className='flex'>
                <div className='bg-gray-800 p-4 rounded-2xl max-w-[300px]'>
                    Hello 👋
                    </div>
            </div>
            <div className='flex justify-end'>
                <div className='bg-blue-500 p-4 rounded-2xl max-w-[300px]'>Hi 😄</div>

            </div>

        </div>
        <MessageInput/>
      
    </div>
  )
}

export default ChatBox
