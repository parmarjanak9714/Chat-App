import React, { useState } from 'react'

// આપણે ઉપરના ChatBox માંથી 'onSendMessage' ફંક્શન પ્રોપ્સ (Props) તરીકે લીધું
const MessageInput = ({ onSendMessage }) => {
  // ઇનપુટ બોક્સમાં જે ટાઈપ થાય તે સાચવવા માટે સ્ટેટ
  const [text, setText] = useState("");

  const handleSend = () => {
    // જો યુઝર ખાલી સ્પેસ મૂકીને મોકલે તો મોકલવું નહીં
    if (!text.trim()) return;

    // ઉપરના ChatBox ને અસલી મેસેજ મોકલો
    onSendMessage(text);

    // મેસેજ મોકલ્યા પછી ઇનપુટ બોક્સ ખાલી કરી નાખો
    setText("");
  };

  // જો યુઝર માઉસથી ક્લિક ન કરે અને કીબોર્ડ પરથી 'Enter' દબાવે તો પણ મેસેજ જવો જોઈએ
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className='p-2 md:p-4 bg-gray-900 flex items-center gap-2 md:gap-3'>
        <input 
          type='text' 
          placeholder='Type message...' 
          value={text} // આ લાઈન સ્ટેટ સાથે કનેક્ટ કરે છે
          onChange={(e) => setText(e.target.value)} // ટાઈપ કરીએ તેમ સ્ટેટ અપડેટ થાય
          onKeyDown={handleKeyDown} // એન્ટર કી માટે
          className='w-full flex-1 p-2 md:p-3 rounded-xl bg-gray-800 text-white outline-none min-w-0'
        />

        <button 
          onClick={handleSend} // ક્લિક કરવા પર મેસેજ સેન્ડ થાય
          className='bg-emerald-600 hover:bg-emerald-700 px-3 md:px-6 py-2 md:py-3 rounded-xl text-white font-semibold whitespace-nowrap transition-colors'
        >
            Send
        </button>
    </div>
  )
}

export default MessageInput
