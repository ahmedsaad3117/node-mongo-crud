let express = require('express');
let path = require('path');
let mongoose = require('mongoose');

let eventRouter = express.Router();
require('../Models/eventModel');
let eventSchema = mongoose.model('event');


require('../Models/speakerModel');
let speakerSchema = mongoose.model('speaker');


eventRouter.get('/list', (req, resp) => {
    eventSchema.find({}).then((data)=>{
        resp.render('event/list',{events :data})
    }).catch(()=>{resp.send("there is an erorr")})
    

})

eventRouter.post('/add', (req, resp) => {

  
    let events = new eventSchema({
        
        title: req.body.title,
        mainSpeaker: req.body.mainSpeaker,
        otherSpeaker : req.body.otherSpeaker,
    })
    events.save().then(() => {
        resp.redirect('/event/list');
    }).catch(() => { resp.send('sorry cannot load data') })


}) 

eventRouter.get('/add', (req, resp) => {
    speakerSchema.find({})
        .then((data) => {
            console.log(data);
            resp.render('event/add', { speakers: data });
        })
        .catch(() => { resp.send('sorry cannot load data') });




})  






module.exports = eventRouter;