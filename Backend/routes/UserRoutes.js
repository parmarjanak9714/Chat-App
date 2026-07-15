const express = require("express");
const router = express.Router();

// ચેક કરી લેજો કે મોડેલનું નામ 'users' છે કે 'user' (આપણે નવું મોડેલ 'user' નામથી બનાવ્યું છે)
const User = require("../models/users"); 

const jwt = require("jsonwebtoken");
const authMiddelware = require("../middelware/authMiddelware");

// ટેમ્પરરી OTP સ્ટોર કરવા માટે એક ઓબ્જેક્ટ (Memory Cache)
let otpCache = {};

// ૧. OTP જનરેટ અને સેન્ડ કરવાનો રાઉટ (ડમી અલર્ટ માટે)
router.post("/send-otp", async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        if (!phoneNumber) {
            return res.status(400).json({ message: "mobile number is required" });
        }

        // ૬ આંકડાનો રેન્ડમ OTP જનરેટ કરો
        const otp = Math.floor(100000 + Math.random() * 900000);
        
        // આ OTP ને ફોન નંબર સામે મેમરીમાં સેવ કરો જેથી વેરિફાય વખતે ચેક થાય
        otpCache[phoneNumber] = otp;

        // ડમી પ્રોજેક્ટ હોવાથી આપણે રિસ્પોન્સમાં જ 'dummyOtp' મોકલીએ છીએ
        res.status(200).json({
            success: true,
            message: "OTP જનરેટ થઈ ગયો છે!",
            dummyOtp: otp // ફ્રન્ટએન્ડમાં alert() કરવા માટે
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "OTP junrate mistak" });
    }
});

// ૨. OTP વેરિફાય કરવાનો રાઉટ (આ જ લોગિન અને ઓટો-રજીસ્ટ્રેશન છે)
router.post("/verify-otp", async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;

        // ચેક કરો કે ઓટીપી સાચો છે કે નહીં
        if (!otpCache[phoneNumber] || otpCache[phoneNumber] !== parseInt(otp)) {
            return res.status(400).json({ message: "wrong otp! please chek your otp!" });
        }

        // વેરિફાય થયા પછી ઓટીપી મેમરીમાંથી ડીલીટ કરો
        delete otpCache[phoneNumber];

        // જો યુઝર નવો હશે તો ડેટાબેઝમાં નહીં મળે, તો તેને ઓટોમેટિક ક્રિએટ (Register) કરો
        let user = await User.findOne({ phoneNumber });
        
        if (!user) {
            user = await User.create({
                phoneNumber,
                name: "", // શરૂઆતમાં નામ ખાલી રહેશે, પ્રોફાઈલ સેટઅપ પેજ પર ભરાશે
                isProfileSetup: false
            });
        }

        // JWT ટોકન જનરેટ કરો
        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // ફ્રન્ટએન્ડને ટોકન સાથે 'isProfileSetup' મોકલો જેથી તે નક્કી કરે કે ચેટ પર જવું કે પ્રોફાઈલ પેજ પર
        res.status(200).json({
            message: "Login is succesfully!",
            token,
            isProfileSetup: user.isProfileSetup 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "verification mistak server!" });
    }
});

// ૩. પ્રોફાઈલ સેટઅપ કરવાનો રાઉટ (માત્ર નવા યુઝર માટે ફર્સ્ટ ટાઈમ નામ સેટ કરવા)
router.post("/profile-setup", authMiddelware, async (req, res) => {
    try {
        const { name, profilePic } = req.body;
        
        // authMiddelware માંથી આપણને req.user.id મળશે (તમારા મિડલવેર મુજબ ચેક કરી લેવું)
        const userId = req.user._id; 

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found!" });
        }

        user.name = name;
        if (profilePic) user.profilePic = profilePic;
        user.isProfileSetup = true; // પ્રોફાઈલ સેટ થઈ ગઈ
        
        await user.save();

        res.status(200).json({
            success: true,
            message: "પ્રોફાઈલ સેટઅપ પૂરું થયું!",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "પ્રોફાઈલ સેવ કરવામાં ભૂલ આવી" });
    }
});

// ૪. પ્રોટેક્ટેડ રાઉટ (તેમ જ રાખ્યો છે)
router.get("/protected", authMiddelware, (req, res) => {
    res.status(200).json({
        message: "you are authorized to access this route",
        user: req.user,
    });
});

// ૫. વ્હોટ્સએપ જેવું નવું ઓલ યુઝર્સ લિસ્ટ ફેચ (જેથી ચેટ કરવા માટે કોન્ટેક્ટ્સ દેખાય)
router.get("/all-users", async (req, res) => {
    try {
        // હવે આપણે ઈમેલની જગ્યાએ 'phoneNumber', 'name', 'profilePic', અને 'about' ફેચ કરીશું
        const allUsers = await User.find({}, "name phoneNumber profilePic about"); 
        res.status(200).json(allUsers); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "સર્વરમાં ભૂલ છે" });
    }
});

module.exports = router;
