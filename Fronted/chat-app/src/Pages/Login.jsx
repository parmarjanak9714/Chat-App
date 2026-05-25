import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] =useState({
    email:"",
    password:"",
  });
   const navigate = useNavigate();

   const handlechange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
        })
   }

   const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5000/api/users/login',formData);
      localStorage.setItem("token", response.data.token);
      alert("Login successful");
      navigate('/chat');
    }catch(error){
      alert('Login failed please check your credentials');
    }
   }
  return (
    <div className='h-screen bg-cover bg-center flex items-center justify-center'
    style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      <div className='bg-white/10 backdrop-blur-lg p-10 rounded-3xl w-[400px] shadow-2xl border border-white/20'>
      <h1 className='text-4xl font-bold text-white text-center mb-8'>
        Welcome Back 
      </h1>
      <form onSubmit={handleSubmit} className= 'space-y-5'>
        <input type='email' name='email' value={formData.email} onChange={handlechange}
         placeholder='Enter your email' 
        className='w-full p-3 rounded-xl bg-white/80 text-black placeholder:text-gray-600 outline-none'/>

        <input type='password'name='password' value={formData.password} onChange={handlechange}
         placeholder='Enter your password' 
        className='w-full p-3 rounded-xl bg-white/80 text-black placeholder:text-gray-600 outline-none'/>

        <button  type='submit'
        className='w-full bg-green-500 hover:bg-green-600 transition-all duration-300 text-white p-3 rounded-xl font-semibold'>
          Login
        </button>
      </form>

      <p className='text-white text-center mt-6'>
        Dont have an account?
        <Link to='/register' className='text-green-300 ml-2 hover:underline'>Register</Link>
      </p>

      </div>
      
    </div>
  )
}

export default Login
