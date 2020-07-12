const mongoose= require('mongoose');
const userSchema = mongoose.Schema({

    username : {
        type : String
    },
    kodeperabot1 : {
        type : String
    },
    jumlahbeli1 : {
        type : String
    },
    kodeperabot2 : {
        type : String
    },
    jumlahbeli2 : {
        type : String
    },
    alamat : {
        type : String
    },
    noTelp : {
        type : String
    }



})

module.exports = mongoose.model('transaksi', userSchema)
