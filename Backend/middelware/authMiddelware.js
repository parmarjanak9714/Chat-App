const jwt = require("jsonwebtoken");

const authMiddelware = (req,res,next)=>{
    const token = req.header("Authorization");

    if(!token){
        return res.status(401).json({
            message:"NO token provided",
        
        });
    }

    try{
        const actualToken = token.split(" ")[1];
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({
            message:"invalid token"
        });
    }
};

module.exports = authMiddelware;