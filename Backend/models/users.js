const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true, // એક નંબર પરથી એક જ એકાઉન્ટ બનશે
    },
    name: {
        type: String,
        default: "", // શરૂઆતમાં ઓટીપી વેરીફાય થાય ત્યારે નામ ખાલી રહેશે
    },
    profilePic: {
        type: String,
        default: "https://flaticon.com", // વ્હોટ્સએપ જેવો ડિફોલ્ટ યુઝર આઈકોન
    },
    about: {
        type: String,
        default: "Hey there! I am using Chat-App.", // વ્હોટ્સએપ જેવું ડિફોલ્ટ સ્ટેટસ
    },
    isProfileSetup: {
        type: Boolean,
        default: false, // નવો યુઝર છે કે જૂનો તે ટ્રેક કરવા માટે
    }
}, { 
    timestamps: true // આનાથી મેસેજ કે યુઝર ક્યારે બન્યો (CreatedAt) તેનો ટાઈમ ઓટોમેટિક સેવ થશે
});

module.exports = mongoose.model("users", userSchema);
