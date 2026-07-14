import React, { useState } from 'react'
import MessageInput from './MessageInput'

const ChatBox = () => {
  // ૧. મેસેજીસને સાચવવા માટે useState એરે (આમાં ડમી ડેટા નાખ્યો છે)
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello 👋", sender: "other", time: "10:30 AM" },
    { id: 2, text: "Hi 😄, how are you?", sender: "me", time: "10:31 AM" },
    { id: 3, text: "i am fine!", sender: "other", time: "10:32 AM" }
  ]);

  // ૨. જ્યારે કોઈ નવો મેસેજ મોકલે ત્યારે આ ફંક્શન રન થશે
  const handleSendMessage = (inputText) => {
    if (!inputText.trim()) return; // જો ખાલી સ્પેસ હોય તો મોકલવું નહીં

    const newMsg = {
      id: Date.now(), // યુનિક આઈડી માટે
      text: inputText,
      sender: "me", // આપણે મોકલીએ છીએ એટલે "me"
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // કરન્ટ ટાઈમ
    };

    // જુના મેસેજીસની અંદર નવો મેસેજ ઉમેરવો
    setMessages([...messages, newMsg]);
  };

  return (
    <div className='flex-1 flex flex-col text-white bg-slate-950 overflow-hidden font-sans'>
        {/* Header - WhatsApp Style */}
        <div className='p-4 border-b border-gray-800 bg-gray-900 flex items-center space-x-4'>
            <div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg'>
                J
            </div>
            <div>
                <h1 className='text-xl font-semibold'>Janak</h1>
                <p className='text-emerald-400 text-xs flex items-center'>
                    <span className='w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-pulse'></span>
                    Online
                </p>
            </div>
        </div>

        {/* Messages Area */}
        <div className='flex-1 p-4 md:p-6 overflow-y-auto space-y-3 bg-[radial-gradient(#2c3e50_0.5px,transparent_0.5px)] [background-size:12px_12px] bg-slate-900'>
            {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                    {/* WhatsApp જેવા કલર્સ: આપણો મેસેજ ડાર્ક ગ્રીન જેવો અને સામેવાળાનો ગ્રે */}
                    <div className={`p-3 rounded-2xl max-w-[70%] shadow-md relative group ${
                        msg.sender === 'me' 
                        ? 'bg-emerald-600 text-white rounded-tr-none' 
                        : 'bg-gray-800 text-gray-100 rounded-tl-none'
                    }`}>
                        <p className='pr-10 text-[15px] break-words'>{msg.text}</p>
                        {/* મેસેજનો સમય */}
                        <span className='absolute bottom-1 right-2 text-[10px] text-gray-300 opacity-70'>
                            {msg.time}
                        </span>
                    </div>
                </div>
            ))}
        </div>

        {/* Message Input - આમાં આપણે ફંક્શન પ્રોપ્સ તરીકે પાસ કરીએ છીએ */}
        <MessageInput onSendMessage={handleSendMessage} />
    </div>
  )
}

export default ChatBox
