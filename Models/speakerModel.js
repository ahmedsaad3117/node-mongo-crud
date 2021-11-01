let mongoose = require('mongoose');

let speakerSchema = new mongoose.Schema({
    _id : Number,
    UserName : String,
    Password: String,
    Age:String
})

mongoose.model('speaker',speakerSchema);