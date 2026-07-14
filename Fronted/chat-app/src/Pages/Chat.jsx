import React from 'react'
import ChatBox from '../Componets/ChatBox'
import SideBar from '../Componets/SideBar'
import { useState } from 'react'

const Chat = () => {
    const [darkMode, setDarkMode] = useState(false);

      const [selectedUser, setSelectedUser] = useState(null);


  return (
  <div className={`flex w-screen h-screen overflow-hidden transition-all duration-300 ${
    darkMode ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'
  }`}>
    
    {/* 🟢 મોબાઈલમાં જો કોઈ યુઝર સિલેક્ટ કરેલો હોય, તો લિસ્ટ છુપાઈ જશે (hidden md:block). નહીંતર દેખાશે. */}
    <div className={`w-full md:w-[380px] h-full shrink-0 ${selectedUser ? 'hidden md:block' : 'block'}`}>
      <SideBar darkMode={darkMode} setSelectedUser={setSelectedUser} />
    </div>
    
    {/* 🟢 જો મોબાઈલમાં કોઈ યુઝર સિલેક્ટ ન હોય, તો ચેટબોક્સ છુપાયેલું રહેશે. જેવું ક્લિક થશે એટલે આખું ચેટબોક્સ ખુલી જશે! */}
    <div className={`flex-1 h-full ${!selectedUser ? 'hidden md:flex' : 'flex'}`}>
      <ChatBox darkMode={darkMode} setDarkMode={setDarkMode} selectedUser={selectedUser} setSelectedUser={setSelectedUser} /> 
    </div>

  </div>
)

}

export default Chat
