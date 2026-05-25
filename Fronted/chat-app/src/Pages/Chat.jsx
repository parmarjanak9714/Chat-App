import React from 'react'
import ChatBox from '../Componets/ChatBox'
import SideBar from '../Componets/SideBar'

const chat = () => {
  return (
    <div className='flex h-screen overflow-hidden'>
      <SideBar/>
      <ChatBox/>
    </div>
  )
}

export default chat
