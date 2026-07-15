import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// તમારા પેજીસ
import Login from './Pages/Login'
import Chat from './Pages/Chat'
import ProfileSetup from './Pages/ProfileSetup'

// 🟢 ૧. આ એક નવું પ્રોટેક્ટેડ કમ્પોનન્ટ છે જે ચેક કરશે કે ટોકન છે કે નહીં
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  
  // જો સ્ટોરેજમાં ટોકન ન હોય, તો તેને સીધો લોગિન પેજ પર મોકલી દો
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // જો ટોકન હોય, તો જ તેને અંદર જવા દો
  return children;
};

const App = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} /> 

      <Routes>
        {/* વ્હોટ્સએપની જેમ સૌથી પહેલા લોગિન પેજ જ ખુલશે */}
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        
        {/* 🟢 ૨. પ્રોફાઈલ સેટઅપ પેજને પણ પ્રોટેક્ટ કરો (લોગિન પછી જ ખુલે) */}
        <Route path='/profile-setup' element={
          <ProtectedRoute>
            <ProfileSetup />
          </ProtectedRoute>
        } />
        
        {/* 🟢 ૩. મેઈન ચેટ સ્ક્રીનને પ્રોટેક્ટ કરો (ટોકન વગર કોઈ અંદર ન જઈ શકે) */}
        <Route path='/chat' element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        } />

        {/* જો યુઝર કોઈ ખોટી લિંક નાખે, તો પણ ઓટોમેટિક લોગિન પર જાય */}
        <Route path='*' element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  )
}

export default App
