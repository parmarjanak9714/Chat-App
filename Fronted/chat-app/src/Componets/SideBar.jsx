import React, { useState, useEffect } from 'react'
import axios from 'axios' // API માંથી ડેટા લાવવા માટે
// વૉટ્સએપ જેવા આઇકન્સ અને મૂન/સન આઇકન (Light/Dark Mode માટે)
import { BsChatLeftTextFill, BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { IoCallOutline, IoSettingsOutline } from 'react-icons/io5'

const SideBar = () => {
  // ૧. થીમ સ્ટેટ (Light / Dark Mode માટે)
  const [darkMode, setDarkMode] = useState(true);
  
  // ૨. MongoDB ડેટાબેઝમાંથી આવતા અસલી યુઝર્સ સાચવવા માટે સ્ટેટ
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // ૩. પેજ લોડ થાય ત્યારે રેન્ડર (Render) બેકએન્ડમાંથી યુઝર્સ લાવવા માટે useEffect
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // ⚠️ અહીં તમારી અસલી રેન્ડર લિંક મૂકો (દા.ત. 'https://onrender.com')
        const response = await axios.get('https://chat-app-rzj8.onrender.com'); 
        
        // જો બેકએન્ડમાંથી ડેટા એરે (Array) ફોર્મેટમાં આવે છે તો તેને સેટ કરો
        setUsers(response.data); 
        setLoading(false);
      } catch (error) {
        console.error("ડેટાબેઝમાંથી યુઝર્સ લાવવામાં ભૂલ થઈ:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ૪. કામ કરતું સર્ચ ફિલ્ટર (ડેટાબેઝના 'name' અથવા 'username' ફિલ્ડ પ્રમાણે ચેક કરશે)
  // 🟢 આ સેફ કોડ જુના 'filteredUsers' ની જગ્યાએ મૂકો
const filteredUsers = Array.isArray(users) 
  ? users.filter(user => {
      const nameToCheck = user.name || user.username || "";
      return nameToCheck.toLowerCase().includes(searchTerm.toLowerCase());
    })
  : []; // જો ડેટા એરે ના હોય તો ખાલી એરે સેટ થશે, એરર ગાયબ થઈ જશે!


  return (
    // આખું સાઇડબાર કન્ટેનર (થીમ આધારિત કલર બદલાશે - ડાર્ક કે લાઇટ)
    <div className={`hidden md:flex w-[380px] h-screen border-r transition-all duration-300 ${
      darkMode ? 'bg-gray-950 text-white border-gray-800' : 'bg-white text-gray-900 border-gray-200'
    }`}>
      
      {/* 🟢 ડાબી બાજુનું વૉટ્સએપ આઇકન બાર (MNC/Startup લેવલ ડિઝાઇન) */}
      <div className={`w-[70px] flex flex-col items-center justify-between py-6 border-r ${
        darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'
      }`}>
        {/* ટોચના આઇકન્સ */}
        <div className='flex flex-col space-y-6 text-xl text-gray-400'>
          <div className='text-emerald-500 cursor-pointer'><BsChatLeftTextFill /></div>
          <div className='hover:text-emerald-500 cursor-pointer transition-colors'><IoCallOutline /></div>
          <div className='hover:text-emerald-500 cursor-pointer transition-colors'><IoSettingsOutline /></div>
        </div>

        {/* નીચેનું ડાર્ક/લાઇટ મોડ બટન */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-xl text-lg transition-all cursor-pointer ${
            darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-indigo-600'
          }`}
        >
          {darkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
        </button>
      </div>

      {/* 🔵 અસલી ચેટ લિસ્ટ વાળો ભાગ */}
      <div className='flex-1 p-5 overflow-y-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold'>Chats</h1>
        </div>

        {/* કામ કરતું સર્ચ બાર */}
        <input 
          type='text' 
          placeholder='Search users chats..' 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full p-3 rounded-xl outline-none mb-6 text-sm transition-all ${
            darkMode ? 'bg-gray-800 text-white placeholder-gray-500' : 'bg-gray-100 text-gray-900 placeholder-gray-400'
          }`}
        />

        {/* ડેટાબેઝમાંથી આવતા યુઝર્સનું લિસ્ટ */}
        <div className='space-y-2'>
          {loading ? (
            <p className='text-gray-500 text-sm text-center mt-4 animate-pulse'>ડેટાબેઝમાંથી યુઝર્સ લોડ થઈ રહ્યા છે...</p>
          ) : filteredUsers.length === 0 ? (
            <p className='text-gray-500 text-sm text-center mt-4'>કોઈ યુઝર મળ્યા નથી</p>
          ) : (
            filteredUsers.map((user, index) => (
              <div 
                key={user._id || index} 
                className={`flex items-center p-3 rounded-xl cursor-pointer transition-all ${
                  darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
              >
                {/* પ્રોફાઇલ સર્કલ - ડેટાબેઝના નામના પહેલા અક્ષર સાથે */}
                <div className='w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-lg shadow-md shrink-0'>
                  {(user.name || user.username || "U").charAt(0).toUpperCase()}
                </div>

                {/* યુઝરની ડિટેલ્સ */}
                <div className='flex-1 min-w-0 ml-3.5'>
                  <h2 className='font-semibold text-[15px] truncate'>{user.name || user.username}</h2>
                  {/* ઇમેઇલ અથવા બાયો સ્ટેટસ */}
                  <p className='text-xs text-gray-400 truncate mt-0.5'>{user.email || 'Hey there! I am using Chat App.'}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  )
}

export default SideBar
