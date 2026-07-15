import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast' // સુંદર ઓટીપી પોપ-અપ માટે

// તમારા પેજીસ
import Login from './Pages/Login'
import Chat from './Pages/Chat'
import ProfileSetup from './Pages/ProfileSetup' // નવું પેજ

const App = () => {
  return (
    <div>
      {/* આ Toaster લાઈનથી આખા પ્રોજેક્ટમાં ગમે ત્યાં સુંદર ગ્રીન ટોસ્ટ (Toast) દેખાડી શકાશે */}
      <Toaster position="top-center" reverseOrder={false} /> 

      <Routes>
        {/* વ્હોટ્સએપની જેમ સૌથી પહેલા લોગિન (નંબર નાખવાનું) પેજ જ ખુલશે */}
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        
        {/* માત્ર નવા યુઝર માટે ફર્સ્ટ ટાઈમ નામ સેટ કરવાનું પેજ */}
        <Route path='/profile-setup' element={<ProfileSetup />} />
        
        {/* મેઈન ચેટ સ્ક્રીન */}
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </div>
  )
}

export default App
