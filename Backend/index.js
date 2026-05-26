const experess = require("express");
const dotenv = require("dotenv");
const connectDB = require("./confing/db");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const http = require("http");

const { Server } = require("socket.io");

dotenv.config();

connectDB();

 const app = experess();
// create http server 
 const server = http.createServer(app);
// socket io setup 
 const io = new Server(server,{
      cors:{
         origin: "*",
      },
 });
// moddelware
 app.use(experess.json());
 app.use(cors());
 
 app.use("/api/users",userRoutes)
// test routes 
 app.get("/",(req,res)=>{
    res.send("happy your server is running");
 });

//  SOCKET CONNECTION 

io.on("connection",(socket)=>{
   console.log("user connected",socket.id);

   // receved message 
socket.on("send_message",(data)=>{
   console.log("message receved",data);

   // send message to all user 
  io.emit("receive_message",data);   
});

// disctonnect 
socket.on("disconnect",()=>{
   console.log("user desconnect");
});

});





const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});