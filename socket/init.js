const { Server } = require("socket.io");
let io = new Server();
module.exports = {
    init: function(httpServer){
        io = new Server(httpServer, { 
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
                credentials:true
              }
         });
    },
    getIO: ()=>io
}