let express = require('express');
let mongoose = require('mongoose');
let path = require('path');

let speakerRouter = express.Router();

require('../Models/speakerModel');
let speakerSchema = mongoose.model('speaker');

speakerRouter.get('/list',(request,response)=>{
        speakerSchema.find({})
        .then((data)=>{
            console.log(data);
            response.render('speaker/list', {speakers : data});
        })
    .catch(()=>{response.send('sorry cannot load data')})
})

speakerRouter.get('/add',(request,response)=>{
   
    
    response.render('speaker/add');
})

speakerRouter.post('/add',(request,response)=>{
    
    let speaker = new speakerSchema({
        _id : request.body._id,
        UserName : request.body.username,
        Password : request.body.Password,
        Age : request.body.age
    })
    speaker.save().then(()=>{
        response.redirect('/speaker/list');
    }).catch(()=>{response.send('sorry cannot load data')})
})



speakerRouter.get('/edit/:id',(request,response)=>{

    
    speakerSchema.findOne({_id:request.params.id}).then((data)=>{
        
        
        console.log(data);
        response.render('speaker/edit',{speaker:data})
    }).catch(()=>{response.send('error URL ...');})
  
})

speakerRouter.post('/edit/:id',(request,response)=>{
    speakerSchema.updateOne({_id:request.params.id},{
        $set:{
            UserName:request.body.username,
            Password:request.body.Password,
            Age:request.body.age
        }
    }).then((data)=>{
        console.log(data);
        response.render('speaker/list')

    }).catch(()=>{response.send('connot update ...');})
})

speakerRouter.get('/delete/:id',(request,response)=>{
    speakerSchema.deleteOne({_id: request.params.id}).then((data)=>{
        
        response.render('speaker/list')
    }).catch(()=>{response.send('sorry cannot load data')})
})



module.exports= speakerRouter;