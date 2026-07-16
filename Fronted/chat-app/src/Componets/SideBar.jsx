import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsChatLeftTextFill } from 'react-icons/bs';
import { IoCallOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineDonutLarge } from 'react-icons/md'; // 🟢 Status માટે
import { FiRadio } from 'react-icons/fi'; // 🟢 Channels માટે
import { HiOutlineUserGroup } from 'react-icons/hi'; // 🟢 Communities માટે
import { useNavigate } from 'react-router-dom';

const SideBar = ({ darkMode, setSelectedUser }) => {
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

  // વ્હોટ્સએપ જેવું સર્ચ: નામ અથવા ફોન નંબર બંનેથી સર્ચ થશે
  const filteredUsers = Array.isArray(users)
    ? users.filter(user => {
        const nameToCheck = user.name || "";
        const phoneToCheck = user.phoneNumber || "";
        return (
          nameToCheck.toLowerCase().includes(searchTerm.toLowerCase()) ||
          phoneToCheck.includes(searchTerm)
        );
      })
    : [];

  const handleDummyCall = (name) => {
    alert(`Calling ${name}... 📞\n(is this fake call !)`);
  };

  return (
    <div className={`flex flex-col-reverse md:flex-row w-full md:w-[380px] h-screen border-r transition-all duration-300 ${
      darkMode ? 'bg-gray-950 text-white border-gray-800' : 'bg-[#fff] text-gray-900 border-gray-200'
    }`}>
      
      {/* 🟢 વૉટ્સએપ આઇકન બાર - મોબાઇલમાં નીચે અને લેપટોપમાં ઊભી સાઇડમાં (Fully Responsive) */}
      <div className={`fixed bottom-0 left-0 z-50 w-full h-[65px] md:w-[70px] md:h-full flex flex-row md:flex-col items-center justify-around md:justify-start md:py-6 md:space-y-8 border-t md:border-t-0 md:border-r ${
        darkMode ? 'bg-gray-900 border-gray-800' : 'bg-[#f0f2f5] border-gray-200'
      }`}>
        <div onClick={() => setActiveTab("chats")} className={`cursor-pointer text-2xl transition-colors p-2 rounded-xl ${activeTab === "chats" ? "text-[#00a884]" : "text-gray-400 hover:text-[#00a884]"}`}>
          <BsChatLeftTextFill />
        </div>
        <div onClick={() => setActiveTab("calls")} className={`cursor-pointer text-2xl transition-colors p-2 rounded-xl ${activeTab === "calls" ? "text-[#00a884]" : "text-gray-400 hover:text-[#00a884]"}`}>
          <IoCallOutline />
        </div>
        <div onClick={() => alert('Status feature Coming Soon! ⭕')} className="cursor-pointer text-2xl text-gray-400 hover:text-[#00a884] p-2 rounded-xl transition-colors">
  <MdOutlineDonutLarge />
</div>
        
        {/* 🆕 આ ત્રણ નવા આઈકોન અહીં ચેટ્સ આઈકોનની નીચે ઉમેરી દો */}
<div onClick={() => alert('Communities feature Coming Soon! 👥')} className="cursor-pointer text-2xl text-gray-400 hover:text-[#00a884] p-2 rounded-xl transition-colors">
  <HiOutlineUserGroup />
</div>

<div onClick={() => alert('Channels feature Coming Soon! 📢')} className="cursor-pointer text-2xl text-gray-400 hover:text-[#00a884] p-2 rounded-xl transition-colors">
  <FiRadio />
</div>
<div onClick={() => setActiveTab("settings")} className={`cursor-pointer text-2xl transition-colors p-2 rounded-xl ${activeTab === "settings" ? "text-[#00a884]" : "text-gray-400 hover:text-[#00a884]"}`}>
          <IoSettingsOutline />
        </div>

      </div>

      {/* 🔵 ડાયનેમિક ચેટ/કોલ/સેટિંગ્સ લિસ્ટ */}
      <div className='flex-1 p-5 overflow-y-auto h-[calc(100vh-65px)] md:h-full'>
        
        {/* CHATS TAB */}
        {activeTab === "chats" && (
          <div>
            <h1 className='text-2xl font-bold mb-4 text-[#111b21] dark:text-white'>Chats</h1>
            <input 
              type='text' 
              placeholder='Search Name & Mobile Numbet...' 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full p-3 rounded-xl outline-none mb-4 text-sm transition-all shadow-sm ${
                darkMode ? 'bg-gray-800 text-white placeholder-gray-500' : 'bg-[#f0f2f5] text-gray-900 placeholder-gray-500'
              }`}
            />
            <div className='space-y-1'>
              {loading ? (
                <p className='text-gray-500 text-sm text-center mt-4 animate-pulse'>Loading...</p>
              ) : filteredUsers.length === 0 ? (
                <p className='text-gray-500 text-sm text-center mt-4'>No Users match!</p>
              ) : (
                filteredUsers.map((user, index) => (
                  <div key={user._id || index} 
                    onClick={() => setSelectedUser(user)}
                    className={`flex items-center p-3 rounded-xl cursor-pointer transition-all ${
                      darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                    }`}
                  >
                    {/* વ્હોટ્સએપ જેવો પ્રોફાઈલ ફોટો લોજિક */}
                    <div className='w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-lg shrink-0 shadow-sm border border-emerald-500'>
                     {(user.name || "U").charAt(0).toUpperCase()}
                    </div>

                    <div className='flex-1 min-w-0 ml-3.5'>
                      <div className='flex items-center justify-between'>
                        <h2 className='font-semibold text-[15px] truncate'>{user.name || "New Users"}</h2>
                        {/* <span className='text-[11px] text-gray-400'>{user.phoneNumber?.slice(-10)}</span> */}
                      </div>
                      {/* વ્હોટ્સએપ જેવું સ્ટેટસ (About) નીચે બતાવો */}
                      <p className='text-xs text-gray-400 truncate mt-0.5'>{user.about || 'Hey there! I am using Chat-App.'}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* CALLS TAB */}
        {activeTab === "calls" && (
          <div>
            <h1 className='text-2xl font-bold mb-4'>Calls</h1>
            <p className='text-xs text-gray-400 mb-4'>Call testing please click button</p>
            <div className='space-y-2'>
              {filteredUsers.map((user, index) => (
                <div key={user._id || index} className={`flex items-center justify-between p-3 rounded-xl transition-all ${darkMode ? 'bg-gray-900' : 'bg-[#f0f2f5]'}`}>
                  <div className='flex items-center'>
                    <div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-sm'>
                      {(user.name || "U").charAt(0).toUpperCase()}
                         </div>

                    <div className='ml-3'>
                      <h2 className='font-semibold text-[14px]'>{user.name || "New Users"}</h2>
                      <p className='text-[10px] text-gray-400'>Audio call available</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDummyCall(user.name || "New Users")}
                    className='p-2 bg-[#00a884] hover:bg-[#028a6c] text-white rounded-full text-sm cursor-pointer transition-colors'
                  >
                    📞
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div>
            <h1 className='text-2xl font-bold mb-6'>Settings</h1>
            <div className='space-y-4'>
              <div className={`p-4 rounded-xl flex items-center space-x-4 ${darkMode ? 'bg-gray-900' : 'bg-[#f0f2f5]'}`}>
                <div className='w-14 h-14 rounded-full bg-[#00a884] flex items-center justify-center font-bold text-xl text-white'>
                  M
                </div>
                <div>
                  <h2 className='font-bold text-lg'>My Account</h2>
                  <p className='text-xs text-gray-400'>MERN Stack Developer</p>
                </div>
              </div>
              <div className='space-y-2 text-sm'>
                <div className={`p-3.5 rounded-xl cursor-pointer ${darkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-[#f0f2f5] hover:bg-gray-200'}`}>🔒 Privacy Settings</div>
                <div className={`p-3.5 rounded-xl cursor-pointer ${darkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-[#f0f2f5] hover:bg-gray-200'}`}>🔔 Notifications</div>
                <div className={`p-3.5 rounded-xl text-red-500 font-semibold cursor-pointer ${darkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-[#f0f2f5] hover:bg-gray-200'}`} 
                  onClick={() => { 
                    const isConfirmed = window.confirm('Are Your Sure Logout?');
                    if(isConfirmed){
                      localStorage.removeItem("token"); // લાઈવ પ્રોજેક્ટ માટે ટોકન ક્લીન કરો
                      alert('Logout Succesfully!');
                      navigate('/login');
                    }
                  }}
                >
                  🚪 Log Out
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SideBar;
