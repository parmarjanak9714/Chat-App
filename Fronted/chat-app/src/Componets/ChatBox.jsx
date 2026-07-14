import React, { useState } from 'react'
import MessageInput from './MessageInput'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs' // આઇકન્સ ઈમ્પોર્ટ કર્યા

const ChatBox = ({ darkMode, setDarkMode }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello 👋", sender: "other", time: "10:30 AM" },
    { id: 2, text: "Hi 😄, how are you?", sender: "me", time: "10:31 AM" }
  ]);

  const handleSendMessage = (inputText) => {
    if (!inputText.trim()) return;
    const newMsg = {
      id: Date.now(),
      text: inputText,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
  };

  return (
    <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
        
        {/* 🟢 Header - હવે આમાં જમણી બાજુ થીમ ચેન્જર બટન છે */}
        <div className={`p-4 border-b flex items-center justify-between ${
          darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'
        }`}>
            {/* ડાબી બાજુ યુઝર પ્રોફાઇલ */}
            <div className='flex items-center space-x-4'>
                <div className='w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-lg'>
                    J
                </div>
                <div>
                    <h1 className='text-xl font-semibold'>Janak</h1>
                    <p className='text-emerald-500 text-xs flex items-center'>Online</p>
                </div>
            </div>

            {/* 🟢 જમણી બાજુ ટોચ પર રહેલું લાઇટ/ડાર્ક મોડ બટન */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl text-lg transition-all cursor-pointer shadow-sm ${
                darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-white text-indigo-600 hover:bg-gray-200 border border-gray-300'
              }`}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
            </button>
        </div>

        {/* Messages Area */}
        <div className={`flex-1 p-4 md:p-6 overflow-y-auto space-y-3 ${
          darkMode ? 'bg-slate-900' : 'bg-gray-200'
        }`}>
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-2xl max-w-[70%] shadow-md relative ${
                        msg.sender === 'me' 
                        ? 'bg-emerald-600 text-white rounded-tr-none' 
                        : darkMode ? 'bg-gray-800 text-gray-100 rounded-tl-none' : 'bg-white text-gray-800 rounded-tl-none'
                    }`}>
                        <p className='pr-10 text-[15px] break-words'>{msg.text}</p>
                        <span className='absolute bottom-1 right-2 text-[10px] opacity-70'>{msg.time}</span>
                    </div>
                </div>
            ))}
        </div>

        <MessageInput onSendMessage={handleSendMessage} darkMode={darkMode} />
    </div>
  )
}

export default ChatBox
