
import React from 'react'

const MessageInput = () => {
  return (
    <div className='p-2 md:p-4 bg-gray-900 flex items-center gap-2 md:gap-3'>
        <input type='text' placeholder='type message...' 
        className='w-full flex-1 p-2 md:p-3 rounded-xl bg-gray-800 text-white outline-none min-w-0'/>

        <button 
        className='bg-blue-500 hover:bg-blue-600 px-3 md:px-6 py-2 md:py-3 rounded-xl text-white font-semibold whitespace-nowrap'>
            Send
        </button>
      
    </div>
  )
}

export default MessageInput
