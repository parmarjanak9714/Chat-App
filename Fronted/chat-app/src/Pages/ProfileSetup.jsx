import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProfileSetup = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!name) return toast.error("Please enter your name!");

    setLoading(true);
    try {
      // લોકલ સ્ટોરેજમાંથી ટોકન મેળવો જેથી બેકએન્ડને ખબર પડે કે કયો યુઝર છે
      const token = localStorage.getItem('token');

      // તમારા ઓનરેન્ડર વાળા બેકએન્ડ પર પ્રોફાઈલ સેવ કરવાની API હિટ કરો
      await axios.post('https://chat-app-rzj8.onrender.com/api/users/profile-setup', 
        { name }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success("Your Profile verifed!");
      setLoading(false);
      
      // પ્રોફાઈલ સેટ થયા પછી સીધા મેઈન ચેટ સ્ક્રીન પર મોકલો
      navigate('/chat'); 
    } catch (err) {
      setLoading(false);
      toast.error("Your profile is not verifed!please try again!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F0F2F5]">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-96 text-center border border-gray-200">
        <h2 className="text-2xl font-bold text-[#111b21] mb-2">Profile Information</h2>
        <p className="text-gray-500 text-sm mb-6">Please set your name.</p>
        
        {/* વ્હોટ્સએપ જેવું ગોળ ડિફોલ્ટ પ્રોફાઈલ આઈકોન */}
        <div className="w-28 h-28 bg-gray-100 rounded-full mx-auto mb-8 flex items-center justify-center text-gray-400 text-5xl shadow-inner border border-gray-200">
          👤
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-6">
          <input 
            type="text" 
            placeholder="Please Enter Your Name..." 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border-b-2 border-gray-300 outline-none focus:border-[#00a884] text-center font-semibold text-lg transition-all duration-300"
          />

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#00a884] hover:bg-[#028a6c] text-white p-3 rounded-xl font-semibold transition-all duration-300 shadow-md"
          >
            {loading ? "Saving......" : "Start"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
