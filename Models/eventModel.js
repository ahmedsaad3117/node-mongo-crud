let mongoose = require('mongoose') ;

let eventSchema = new mongoose.Schema({
 
    title : String,
    mainSpeaker: String,
    otherSpeaker : String ,
   
})

mongoose.model('event',eventSchema);