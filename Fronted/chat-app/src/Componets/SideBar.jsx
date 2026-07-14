import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BsChatLeftTextFill } from 'react-icons/bs'
import { IoCallOutline, IoCallSharp, IoSettingsOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom' // 🟢 આ લાઇન ઉમેરો


const SideBar = ({ darkMode }) => {
    const navigate = useNavigate();
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("chats");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://chat-app-rzj8.onrender.com/api/users/all-users'); 
        setUsers(response.data); 
        setLoading(false);
      } catch (error) {
        console.error("database users fetch mistak:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = Array.isArray(users) 
    ? users.filter(user => {
        const nameToCheck = user.name || user.username || "";
        return nameToCheck.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : [];

  const handleDummyCall = (name) => {
    alert(`Calling ${name}... 📞\n(is this fake call !)`);
  };

  return (
    <div className={`hidden md:flex w-[380px] h-screen border-r transition-all duration-300 ${
      darkMode ? 'bg-gray-950 text-white border-gray-800' : 'bg-white text-gray-900 border-gray-200'
    }`}>
      
      {/* 🟢 ડાબી બાજુનું વૉટ્સએપ આઇકન બાર (બટન વગરનું) */}
      <div className={`w-[70px] flex flex-col items-center justify-between py-6 border-r ${
        darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'
      }`}>
        <div className='flex flex-col space-y-6 text-xl text-gray-400'>
          <div onClick={() => setActiveTab("chats")} className={`cursor-pointer transition-colors ${activeTab === "chats" ? "text-emerald-500" : "hover:text-emerald-500"}`}><BsChatLeftTextFill /></div>
          <div onClick={() => setActiveTab("calls")} className={`cursor-pointer transition-colors ${activeTab === "calls" ? "text-emerald-500" : "hover:text-emerald-500"}`}><IoCallOutline /></div>
          <div onClick={() => setActiveTab("settings")} className={`cursor-pointer transition-colors ${activeTab === "settings" ? "text-emerald-500" : "hover:text-emerald-500"}`}><IoSettingsOutline /></div>
        </div>
        <div></div> {/* નીચે ખાલી જગ્યા રાખવા */}
      </div>

      {/* 🔵 જમણી બાજુનો બદલાતો ડાયનેમિક ભાગ */}
      <div className='flex-1 p-5 overflow-y-auto'>
        
        {activeTab === "chats" && (
          <div>
            <h1 className='text-2xl font-bold mb-6'>Chats</h1>
            <input 
              type='text' 
              placeholder='Search users chats..' 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full p-3 rounded-xl outline-none mb-6 text-sm transition-all ${darkMode ? 'bg-gray-800 text-white placeholder-gray-500' : 'bg-gray-100 text-gray-900 placeholder-gray-400'}`}
            />
            <div className='space-y-2'>
              {loading ? (
                <p className='text-gray-500 text-sm text-center mt-4 animate-pulse'>Loading...</p>
              ) : filteredUsers.length === 0 ? (
                <p className='text-gray-500 text-sm text-center mt-4'>not users found!</p>
              ) : (
                filteredUsers.map((user, index) => (
                  <div key={user._id || index} className={`flex items-center p-3 rounded-xl cursor-pointer transition-all ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                    <div className='w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-lg shrink-0'>
                      {(user.name || user.username || "U").charAt(0).toUpperCase()}
                    </div>
                    <div className='flex-1 min-w-0 ml-3.5'>
                      <h2 className='font-semibold text-[15px] truncate'>{user.name || user.username}</h2>
                      {/* <p className='text-xs text-gray-400 truncate mt-0.5'>{user.email || 'Hey there!'}</p> */}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "calls" && (
          <div>
            <h1 className='text-2xl font-bold mb-6'>Calls</h1>
            <p className='text-xs text-gray-400 mb-4'>user fake call click now!</p>
            <div className='space-y-2'>
              {filteredUsers.map((user, index) => (
                <div key={user._id || index} className={`flex items-center justify-between p-3 rounded-xl transition-all ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                  <div className='flex items-center'>
                    <div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm'>
                      {(user.name || "U").charAt(0).toUpperCase()}
                    </div>
                    <div className='ml-3'>
                      <h2 className='font-semibold text-[14px]'>{user.name || user.username}</h2>
                      <p className='text-[10px] text-gray-400'>video & Audio call Avalable!</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDummyCall(user.name || user.username)}
                    className='p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-sm cursor-pointer transition-colors'
                  >
                    📞
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h1 className='text-2xl font-bold mb-6'>Settings</h1>
            <div className='space-y-4'>
              <div className={`p-4 rounded-xl flex items-center space-x-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <div className='w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xl text-white'>
                  M
                </div>
                <div>
                  <h2 className='font-bold text-lg'>My Account</h2>
                  <p className='text-xs text-gray-400'>MERN Stack Developer</p>
                </div>
              </div>
              <div className='space-y-2 text-sm'>
                <div className={`p-3.5 rounded-xl cursor-pointer ${darkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-100 hover:bg-gray-200'}`}>🔒Privacy Settings</div>
                <div className={`p-3.5 rounded-xl cursor-pointer ${darkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-100 hover:bg-gray-200'}`}>🔔Notifications</div>
                <div className={`p-3.5 rounded-xl text-red-500 font-semibold cursor-pointer ${darkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-100 hover:bg-gray-200'}`} 
                onClick={() =>{ 
                    const isCornfirmed = window.confirm('Are you sure your account is logout?');
                    if(isCornfirmed){
                        alert('your account is logout succesfully!');
                        navigate('/login');
                    }else{
                        console.log('logout is cencel!')
                    }}}>
                    🚪Log Out
                    </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default SideBar
