import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { IoChatbubbleEllipsesSharp,IoArrowForward  } from "react-icons/io5";
import { MdPhoneAndroid } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!phoneNumber) {
      return toast.error("Please enter your mobile number");
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://chat-app-rzj8.onrender.com/api/users/send-otp",
        { phoneNumber }
      );

      setLoading(false);
      setIsOtpSent(true);

      toast.success(`Testing OTP : ${response.data.dummyOtp}`, {
        duration: 10000,
        style: {
          border: "1px solid #00a884",
          padding: "16px",
          color: "#111b21",
          background: "#e7fce3",
          fontWeight: "600",
        },
      });
    } catch (error) {
      setLoading(false);
      toast.error("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      return toast.error("Please enter OTP");
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://chat-app-rzj8.onrender.com/api/users/verify-otp",
        {
          phoneNumber,
          otp,
        }
      );

      localStorage.setItem("token", response.data.token);

      toast.success("Login Successful");

      setLoading(false);

      if (response.data.isProfileSetup === false) {
        navigate("/profile-setup");
      } else {
        navigate("/chat");
      }
    } catch (error) {
      setLoading(false);

      toast.error(
        error.response?.data?.message || "Invalid OTP"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0b141a] via-[#111b21] to-[#005c4b] px-4">
      {/* Dark Overlay */}

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl p-8 md:p-10 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,168,132,0.35)]">

        {/* Logo */}
        <div className="flex justify-center mb-6">
  <div className="w-20 h-20 rounded-full bg-[#00a884] flex items-center justify-center shadow-[0_10px_40px_rgba(0,168,132,0.45)]">
    <FaWhatsapp className="text-white text-5xl" />
  </div>
</div>

        {/* Heading */}
        <h1 className="text-white text-4xl font-bold text-center">
          WhatsApp
        </h1>

        <p className="text-center text-gray-200 mt-2 mb-8">
          {!isOtpSent
            ? "Enter your phone number to continue"
            : "Enter the OTP sent to your number"}
        </p>
        {!isOtpSent ? (
  <form onSubmit={handleSendOtp} className="space-y-5">

    <div className="flex items-center bg-white rounded-xl px-4">
      <MdPhoneAndroid className="text-[#00a884] text-2xl mr-3" />

      <input
  type="tel"
  value={phoneNumber}
  onChange={(e) => setPhoneNumber(e.target.value)}
  placeholder="Enter Mobile Number (+91...)"
  className="w-full py-4 bg-transparent outline-none text-gray-800 font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-[#00a884] rounded-lg transition-all duration-300"
/>
    </div>

    <button
  type="submit"
  disabled={loading}
  className="w-full bg-[#00a884] hover:bg-[#01856c] transition-all duration-300 text-white py-4 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
>
  {loading ? (
  <div className="flex items-center gap-2">
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    <span>Sending...</span>
  </div>
) : (
  <>
    Get OTP
    <IoArrowForward className="text-xl" />
  </>
)}
</button>

  </form>
  
) : (
  <form onSubmit={handleVerifyOtp} className="space-y-5">

    <input
  type="text"
  value={otp}
  maxLength={6}
  onChange={(e) => setOtp(e.target.value)}
  placeholder="Enter 6 Digit OTP"
  className="w-full py-4 rounded-xl text-center tracking-[8px] text-2xl font-bold bg-white text-gray-800 outline-none focus:ring-2 focus:ring-[#00a884] transition-all duration-300"
/>

    <button
  type="submit"
  disabled={loading}
  className="w-full bg-[#00a884] hover:bg-[#01856c] transition-all duration-300 text-white py-4 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
>
  {loading ? (
  <div className="flex items-center gap-2">
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    <span>Verifying...</span>
  </div>
) : (
  <>
    Verify OTP
    <IoArrowForward className="text-xl" />
  </>

  )}
</button>

    <button
      type="button"
      onClick={() => setIsOtpSent(false)}
      className="w-full text-center text-green-300 hover:text-white transition cursor-pointer"
    >
      Change Mobile Number
    </button>

  </form>
)}

<div className="mt-8 pt-5 border-t border-white/20 text-center">
  <h3 className="text-lg font-bold text-[#25D366]">
    Janak Parmar
  </h3>

  <p className="text-sm text-gray-300 mt-1">
    MERN Stack Developer
  </p>

  <p className="text-xs text-gray-400 mt-3 leading-6">
      React • Node • Express • MongoDB • Socket.IO

  </p>
</div>


</div>
</div>
);
};

export default Login;