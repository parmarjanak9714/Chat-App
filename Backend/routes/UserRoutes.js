const experess = require("express");

const router = experess.Router();

const User = require("../models/users")

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const authMiddelware = require("../middelware/authMiddelware");

router.post("/register", async(req,res)=>{
try{

    const {name,email,password} = req.body;

    const hashpassword =  await bcrypt.hash(password,10);
    
    const user = await User.create({
        name,
        email,
        password:hashpassword
    });
    res.status(201).json(user);
}catch(error){
    console.log(error);
}

    
    
});

// login routes 

router.post("/login",async(req,res)=>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                message: "user is not found",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({
                message:"invalid password",
            });
        }
        // jwt token 

        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );


        res.status(200).json({
            message:"Login successful",
            token,
        });
    }catch(error){
        console.log(error);
    }
});
         // protect route :
        router.get("/protected", authMiddelware, (req,res)=>{
            res.status(200).json({
                message:"you are authorized to access this route",
                user:req.user,
            });
        });


module.exports = router;