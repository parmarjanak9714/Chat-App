import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'; // સુંદર ટોસ્ટ પોપ-અપ માટે

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false); // ઓટીપી મોકલાયો છે કે નહીં તે જોવા
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ૧. ડમી OTP જનરેટ કરવા માટેનું ફંક્શન
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phoneNumber) return toast.error("please enter your mobile number!");
    
    setLoading(true);
    try {
      // તમારા બેકએન્ડના નવા રાઉટ પર હિટ કરો
      const response = await axios.post('https://chat-app-rzj8.onrender.com', { phoneNumber });
      
      setIsOtpSent(true);
      setLoading(false);

      // વ્હોટ્સએપ સ્ટાઈલનો સુંદર ગ્રીન ટોસ્ટ પોપ-અપ
      toast.success(`your testing OTP: ${response.data.dummyOtp}`, {
        duration: 10000, // ૧૦ સેકન્ડ સુધી સ્ક્રીન પર રહેશે
        style: {
          border: '1px solid #00a884',
          padding: '16px',
          color: '#111b21',
          background: '#e7fce3', 
          fontWeight: 'bold'
        },
        iconTheme: {
          primary: '#00a884',
          secondary: '#FFFAEE',
        },
      });
    } catch (error) {
      setLoading(false);
      toast.error("OTP fetch mistak! please try again!");
    }
  };

  // ૨. OTP વેરિફાય કરીને લોગિન કે ઓટો-રજીસ્ટર કરવા માટેનું ફંક્શન
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return toast.error("please enter your OTP!");

    setLoading(true);
    try {
      const response = await axios.post('https://chat-app-rzj8.onrender.com', { phoneNumber, otp });
      
      localStorage.setItem("token", response.data.token);
      toast.success("Login is Succesfully!");
      setLoading(false);

      // જો નવો યુઝર હોય તો પ્રોફાઈલ સેટઅપ પેજ પર મોકલો, નહીંતર ડાયરેક્ટ ચેટ પર
      if (response.data.isProfileSetup === false) {
        navigate('/profile-setup');
      } else {
        navigate('/chat');
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "wrong OTP ! Please try again!.");
    }
  };

  return (
    <div className='h-screen bg-cover bg-center flex items-center justify-center'
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      <div className='bg-white/10 backdrop-blur-lg p-10 rounded-3xl w-[400px] shadow-2xl border border-white/20 text-center'>
        
        {/* વ્હોટ્સએપ આઈકોન જેવો લુક અને હેડિંગ */}
        <div className="text-5xl mb-4">💬</div>
        <h1 className='text-3xl font-bold text-white mb-2'>
          WhatsApp Chat
        </h1>
        <p className='text-gray-200 text-sm mb-8'>
          {!isOtpSent ? "your phone number verified " : "enter your OTP!"}
        </p>

        {/* સ્ટેપ ૧: જો ઓટીપી ન મોકલાયો હોય તો ફોન નંબરનું બોક્સ બતાવો */}
        {!isOtpSent ? (
          <form onSubmit={handleSendOtp} className='space-y-5'>
            <input 
              type='text' 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder='Enter Your Phonr Number (+91...) ' 
              className='w-full p-3 rounded-xl bg-white/80 text-black placeholder:text-gray-600 outline-none text-center font-semibold text-lg'
            />
            <button 
              type='submit'
              disabled={loading}
              className='w-full bg-[#00a884] hover:bg-[#028a6c] transition-all duration-300 text-white p-3 rounded-xl font-semibold'
            >
              {loading ? "Send..." : "Move (Fethch OTP)"}
            </button>
          </form>
        ) : (
          /* સ્ટેપ ૨: જો ઓટીપી મોકલાઈ ગયો હોય તો ઓટીપી નાખવાનું બોક્સ બતાવો */
          <form onSubmit={handleVerifyOtp} className='space-y-5'>
            <input 
              type='text' 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)}
              placeholder='please enter 6 character otp! ' 
              maxLength={6}
              className='w-full p-3 rounded-xl bg-white/80 text-black placeholder:text-gray-600 outline-none text-center font-bold text-xl tracking-widest'
            />
            <button 
              type='submit'
              disabled={loading}
              className='w-full bg-green-500 hover:bg-green-600 transition-all duration-300 text-white p-3 rounded-xl font-semibold'
            >
              {loading ? "verified..." : "verified otp!"}
            </button>
            <button 
              type="button"
              onClick={() => setIsOtpSent(false)} 
              className="text-sm text-green-300 hover:underline block mx-auto mt-2"
            >
              Change Your Number?
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default Login;
