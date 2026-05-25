import React from 'react'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Chat from './Pages/Chat'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
  
  <Routes>
    <Route path='/' element={<Register/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/chat' element={<Chat/>}/>
  </Routes>

      
    </div>
  )
}

export default App
