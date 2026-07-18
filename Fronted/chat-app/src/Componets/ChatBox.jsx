import React, { useState } from 'react'
import MessageInput from './MessageInput'
import { BsFillSunFill, BsFillMoonFill,BsThreeDotsVertical  } from 'react-icons/bs' 
// 🟢 WhatsApp જેવા એડવાન્સ આઇકન્સ ઇમ્પોર્ટ કર્યા (Video, Call, Search)
import { IoVideocamOutline, IoCallOutline, IoSearchOutline } from 'react-icons/io5'

const ChatBox = ({ darkMode, setDarkMode, selectedUser, setSelectedUser   }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello 👋", sender: "other", time: "10:30 AM" },
    { id: 2, text: "Hi 😄, how are you?", sender: "me", time: "10:31 AM" }
  ]);

  // 🟢 આ લાઇન ફંક્શનની અંદર સૌથી ઉપર ઉમેરો
const [showDropdown, setShowDropdown] = useState(false);

// 🟢 આ કોડ શો-ડ્રોપડાઉન સ્ટેટની બિલકુલ નીચે ઉમેરો
const handleLogout = () => {
  const isConfirmed = window.confirm('Are you sure you want to log out? 🚪');
  if (isConfirmed) {
    alert('your account is logout successfully!');
    // જો તમે useNavigate વાપરતા હોવ તો અહી નેવિગેટ કરાવી શકો, નહીંતર સાદું વિન્ડો રીડાયરેક્ટ:
    window.location.href = '/login'; 
  }
  setShowDropdown(false);
};


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

  // કોલિંગ બટન માટે ડમી એલર્ટ ફંક્શન્સ
  const handleActionClick = (actionName) => {
    if (!selectedUser) {
      alert("please select chat!");
      return;
    }
    const name = selectedUser.name || selectedUser.username;
    alert(`${actionName} starting with ${name}... 🚀`);
  };

  return (
    <div className={`w-full h-full flex flex-col overflow-hidden ${
  darkMode ? "bg-slate-950 text-white" : "bg-gray-50 text-gray-900"
}`}>
        
        {/* 🟢 Header - હવે આમાં ડાબી બાજુ પ્રોફાઇલ અને જમણી બાજુ વૉટ્સએપ આઇકન્સ છે */}
        <div className={`h-[65px] p-3 md:p-4 border-b flex items-center justify-between gap-2 min-w-0 shrink-0 ${
          darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'
        }`}>
            {/* 🔴 ડાબી બાજુ: યુઝર પ્રોફાઇલ અને નામ */}
            <div className='flex items-center space-x-4'>
                    <button onClick={() => setSelectedUser(null)} 
      className='md:hidden p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full cursor-pointer text-xl font-bold text-gray-500 mr-1'
      title="Back to Chats">
      ←
    </button>
                <div className='w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-lg shadow-sm'>
                    {selectedUser ? (selectedUser.name || selectedUser.username || 'u').charAt(0).toUpperCase() : '?'}
                </div>
                <div  className='min-w-0 flex-1'>
                    <h1 className='text-lg md:text-xl font-semibold truncate'>
                        {selectedUser ? (selectedUser.name || selectedUser.username) : 'selected Chat'  }
                    </h1>
                    <p className='text-emerald-500 text-xs flex items-center'>
                        {selectedUser ? 'online' : 'not active users'}
                    </p>
                </div>
            </div>

            {/* 🔵 જમણી બાજુ: વૉટ્સએપ આઇકન્સ + થીમ ચેન્જર */}
            <div className='flex items-center space-x-2 md:space-x-4 text-xl text-gray-500 dark:text-gray-400'>
               {/* વિડીયો કોલ આઇકન */}
                 <button 
                    onClick={() => handleActionClick("Video Call")}
                     className='hidden sm:block p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full cursor-pointer transition-colors'
                      title="Video Call">
                       <IoVideocamOutline />
                         </button>

                  {/* ઓડિયો કોલ આઇકન */}
                       <button 
                         onClick={() => handleActionClick("Voice Call")}
                          className='hidden sm:block p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full cursor-pointer transition-colors'
                          title="Voice Call">
                          <IoCallOutline />
                           </button>
                {/* સર્ચ આઇકન */}
                <button 
                  onClick={() => handleActionClick("Search in Chat")}
                  className='p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full cursor-pointer transition-colors'
                  title="Search Chat"
                >
                  <IoSearchOutline />
                </button>

                {/* લાઈન સેપરેટર (નાની લીટી) */}
                <span className='h-6 w-[1px] bg-gray-300 dark:bg-gray-700 hidden sm:inline-block'></span>

                {/* લાઇટ/ડાર્ક મોડ બટન */}
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-xl text-lg transition-all cursor-pointer shadow-sm ${
                    darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-white text-indigo-600 hover:bg-gray-200 border border-gray-300'
                  }`}
                  title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  {darkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
                </button>
                <button 
  onClick={() => setShowDropdown(!showDropdown)} 
  className='p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full cursor-pointer text-lg'
>
  <BsThreeDotsVertical />
</button>

{/* ૩-ડોટ નું ડ્રોપડાઉન લિસ્ટ */}
{showDropdown && (
  <div className={`absolute right-4 top-16 w-48 rounded-xl shadow-xl py-2 border z-50 ${
    darkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-gray-800'
  }`}>
    <div onClick={() => alert('Privacy')} className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">🔒 Privacy Settings</div>
    <div onClick={() => alert('Notifications')} className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">🔔 Notifications</div>
    <div className="border-t border-gray-200 dark:border-gray-800 my-1"></div>
    <div onClick={handleLogout} className="px-4 py-2 text-sm font-semibold text-red-500 cursor-pointer hover:bg-red-500/10">🚪 Log Out</div>
  </div>
)}
            </div>
        </div>

        {/* Messages Area */}
        <div className={`flex-1 overflow-y-auto ${
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
      <div className="w-full shrink-0">
  <MessageInput
    onSendMessage={handleSendMessage}
    darkMode={darkMode}
  />
</div>
    </div>
  )
}

export default ChatBox
