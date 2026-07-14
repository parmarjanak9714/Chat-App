import React from 'react'
import ChatBox from '../Componets/ChatBox'
import SideBar from '../Componets/SideBar'
import { useState } from 'react'

const chat = () => {
    const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`flex w-screen h-screen overflow-hidden transition-all duration-300 ${
      darkMode ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'
    }`}>
      <SideBar darkMode={darkMode} />
<ChatBox darkMode={darkMode} setDarkMode={setDarkMode} /> {/* 🟢 અહીં setDarkMode મોકલવું જ પડશે */}

    </div>
  )
}

export default chat
