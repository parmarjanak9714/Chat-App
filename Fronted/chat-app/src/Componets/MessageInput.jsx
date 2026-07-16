import React, { useState } from 'react'
// 🟢 આઈકોન્સ ઈમ્પોર્ટ કર્યા - IoMicOutline અને IoSend ઉમેર્યા
import { IoAttachOutline, IoCameraOutline, IoMicOutline, IoSend } from 'react-icons/io5'
import { BsEmojiSmile } from 'react-icons/bs'

// આપણે ઉપરના ChatBox માંથી 'onSendMessage' ફંક્શન પ્રોપ્સ (Props) તરીકે લીધું
const MessageInput = ({ onSendMessage, darkMode }) => {
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
    <div className={`p-2 md:p-4 flex items-center gap-2 md:gap-3 transition-colors duration-300 w-full shrink-0 max-w-full overflow-hidden${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
    }`}>
        
        {/* 🟢 આખું વૉટ્સએપ સ્ટાઇલ ઇનપુટ બાર (ઇમોજી અને બાકીના આઇકન્સ સાથે) - min-w-0 થી મોબાઈલમાં કટ નહીં થાય */}
        <div className={`flex-1 flex items-center gap-2 px-3 py-1 md:py-1.5 rounded-xl border min-w-0 transition-all ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
        }`}>
            {/* ૧. ડાબી બાજુ ઇમોજી આઇકન */}
            <button 
              type="button"
              onClick={() => alert('Emoji Picker Opened! 😄')} 
              className="text-gray-400 hover:text-emerald-500 cursor-pointer text-xl shrink-0"
            >
              <BsEmojiSmile />
            </button>

            {/* ૨. અસલી ઇનપુટ બોક્સ - flex-1 અને min-w-0 થી કમ્પ્લીટ રિસ્પોન્સિવ બનશે */}
            <input 
              type='text' 
              placeholder='Type message...' 
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`flex-1 p-2 bg-transparent outline-none min-w-0${
                darkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
              }`}
            />

            {/* ૩. જમણી બાજુ ગેલેરી (પેપરક્લિપ) આઇકન */}
            <button 
              type="button"
              onClick={() => alert('Gallery Opened! 🖼️')} 
              className="text-gray-400 hover:text-emerald-500 cursor-pointer text-xl shrink-0"
            >
              <IoAttachOutline />
            </button>

            {/* ૪. છેલ્લે કેમેરા આઇકન */}
            <button 
              type="button"
              onClick={() => alert('Camera Opened! 📸')} 
              className="text-gray-400 hover:text-emerald-500 cursor-pointer text-xl shrink-0"
            >
              <IoCameraOutline />
            </button>
        </div>

        {/* ૫. સ્માર્ટ વ્હોટ્સએપ બટન: જો લખાણ ખાલી હોય તો માઈક આઈકોન, કઈક ટાઈપ કરો એટલે સેન્ડ આઈકોન (>) */}
        <button 
          onClick={text.trim() ? handleSend : () => alert('Recording Started! 🎙️')}
          className='bg-emerald-600 hover:bg-emerald-700 p-3 rounded-full text-white transition-colors cursor-pointer flex items-center justify-center shrink-0 w-11 h-11'
        >
          {text.trim() ? (
            <IoSend className="text-lg ml-0.5" /> // ટાઈપિંગ સમયે સેન્ડ આઈકોન (>)
          ) : (
            <IoMicOutline className="text-xl" /> // ખાલી હોય ત્યારે રેકોર્ડિંગ માઈક આઈકોન
          )}
        </button>
    </div>
  )
}

export default MessageInput;
