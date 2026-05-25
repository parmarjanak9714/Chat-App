import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
const [fromData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
});

const navigate = useNavigate();

const handleChange = (e) => {
    setFormData({
        ...fromData,
        [e.target.name]: e.target.value,
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post('http://localhost:5000/api/users/register', fromData);
        console.log(response.data);
        alert('Registration successfull');
        navigate('/login');
    }catch(error){
        console.error(error);
        alert('somthing went wrong');
    }
}
  return (
    <div className='h-screen bg-cover bg-center flex items-center justify-center'
    style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')",
    }}
    >
        <div className='bg-white/10 backdrop-blur-lg p-10 rounded-2xl w-[400px] shadow-2xl border border-white/20'>
            <h1 className='text-4xl font-bold text-white text-center mb-8'>
                Create Account
                </h1>
                <form onSubmit={handleSubmit} className='space-y-5'>
                <input type='text' name='name' value={fromData.name} onChange={handleChange}
                 placeholder='Enter your UserName'
                 className='w-full p-3 rounded-xl bg-white/80 text-black placeholder:text-gray-600 outline-none'/>
                <input type='email' name='email' value={fromData.email} onChange={handleChange}
                 placeholder='Enter your Email' 
                className='w-full p-3 rounded-xl bg-white/80 text-black placeholder:text-gray-600 outline-none'/>
                <input type='password'name='password' value={fromData.password} onChange={handleChange}
                 placeholder='Enter your Password' 
                className='w-full p-3 rounded-xl bg-white/80 text-black placeholder:text-gray-600 outline-none'/>
                 <button type='submit'  className='w-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white p-3 rounded-lg font-semibold'>
                    Register
                </button>
                </form>

                <p className='text-white text-center mt-6'>Already have an account?

                    <Link to = '/login' className='text-blue-300 ml-2 hover:underline'>Login</Link>

                </p>
        </div>
      
    </div>
  )
}

export default Register
