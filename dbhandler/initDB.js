const uri = "mongodb+srv://sudokuuser:luA2zWENY2fnCMbf@cluster0.0kpjj.mongodb.net/sudokudb?retryWrites=true&w=majority";
let connected = false;
const mongoose = require('mongoose');
mongoose.connect(uri).then(()=>{
    console.log('Mongo Connection Success')
    connected = true;
});

mongoose.connection.on('error', function (err) {
    console.log('Mongo connection FAILED ', err)
});

function isConnected(){
    return connected
}

module.exports={
    isConnected,
    mongoose
}