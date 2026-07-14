import React, { useState } from 'react'
// 🟢 આ લાઈન સૌથી ઉપર રિપ્લેસ કરો
import { IoAttachOutline, IoCameraOutline } from 'react-icons/io5'
import { BsEmojiSmile } from 'react-icons/bs'



// આપણે ઉપરના ChatBox માંથી 'onSendMessage' ફંક્શન પ્રોપ્સ (Props) તરીકે લીધું
const MessageInput = ({ onSendMessage,darkMode }) => {
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
  // 🟢 આખું મુખ્ય કન્ટેનર: થીમ પ્રમાણે bg-gray-900 અથવા bg-gray-100 થશે
  <div className={`p-2 md:p-4 flex items-center gap-2 md:gap-3 transition-colors duration-300 ${
    darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
  }`}>
      
      {/* 🟢 આખું વૉટ્સએપ સ્ટાઇલ ઇનપુટ બાર (ઇમોજી અને બાકીના આઇકન્સ સાથે) */}
      <div className={`flex-1 flex items-center gap-2 px-3 py-1 md:py-1.5 rounded-xl border transition-all ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
      }`}>
          {/* ૧. ડાબી બાજુ ઇમોજી આઇકન */}
          <button 
            onClick={() => alert('Emoji Picker Opened! 😄')} 
            className="text-gray-400 hover:text-emerald-500 cursor-pointer text-xl"
          >
            <BsEmojiSmile />
          </button>

          {/* ૨. અસલી ઇનપુટ બોક્સ (આમાં કલર હાર્ડકોડેડ કાઢીને સેફ કંડિશનલ કર્યો) */}
          <input 
            type='text' 
            placeholder='Type message...' 
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full flex-1 p-2 bg-transparent outline-none min-w-0 ${
              darkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
            }`}
          />

          {/* ૩. જમણી બાજુ ગેલેરી (પેપરક્લિપ) આઇકન */}
          <button 
            onClick={() => alert('Gallery Opened! 🖼️')} 
            className="text-gray-400 hover:text-emerald-500 cursor-pointer text-xl"
          >
              <IoAttachOutline />

          </button>

          {/* ૪. છેલ્લે કેમેરા આઇકન */}
          <button 
            onClick={() => alert('Camera Opened! 📸')} 
            className="text-gray-400 hover:text-emerald-500 cursor-pointer text-xl"
          >
            <IoCameraOutline />
          </button>
      </div>

      {/* ૫. તમારું જૂનું સેન્ડ બટન જે જમણી બાજુ એમનેમ જ રહેશે */}
      <button 
        onClick={handleSend}
        className='bg-emerald-600 hover:bg-emerald-700 px-3 md:px-6 py-2.5 md:py-3 rounded-xl text-white font-semibold whitespace-nowrap transition-colors cursor-pointer'
      >
          Send
      </button>
  </div>
)

}

export default MessageInput
