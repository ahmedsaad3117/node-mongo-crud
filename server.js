// requires 
// npm init 
// npm install express
// npm install nodemon -g
// npm path 
// ejs
// body-parser

let express = require('express');

let authRouter = require('./Routing/authRouter');
let path = require('path');
let adminRouter = require('./Routing/adminRouter');
let speakerRouter = require('./Routing/speakerRouter');
let eventRouter = require('./Routing/eventRouter')
let body_parser = require('body-parser');
let mongoose = require('mongoose');
let express_session = require('express-session');
let connect_flash = require('connect-flash');


// open server
let app = express();
mongoose.connect('mongodb://localhost:27017/ITInode');

// setting 
app.use(connect_flash());
app.use(express_session({secret:'dalia',resave:false,saveUninitialized:false}))
app.use(body_parser.urlencoded())
app.use(express.static(path.join(__dirname,'Public')));
app.use(express.static(path.join(__dirname,'node_modules','jquery','dist')));
app.use(express.static(path.join(__dirname,'node_modules','bootstrap','dist')));
// setting for use ejs
// to use ejs
// 1- setting
// 2- using render not send file
// 3- file direct without /
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'Views'));
// middlewares    1 => 2 => 3  1=> order => 2
app.use((request,response, next)=>{
    console.log(request.url, request.method);
    // response.send('welcome');
    // response.send('hi'); cannot set two response
    next();
})


app.use('/home',(request,response ,next)=>{
    let data ={id : 1, courseName : 'nodeJS'};
response.render('home',{id : 2, courseName : 'nodeJS'});
   
})

app.use(authRouter);


app.use((request,response,next)=>{
    if(request.session.role=='admin'){
        next();
    }else{
        request.flash('msg','session ended ...')
        response.redirect('/login');
    }
})
app.use(adminRouter);


app.use('/speaker',speakerRouter);
app.use('/event',eventRouter);
app.use('/', (request,response)=>{
    response.send('404 cannot find page ..');
})

app.use((request,response)=>{
    response.send(" express server ...");

})



// error Mw 
app.use((error, request, response, next)=>{
    response.send(error+" this is error")
})
// listen
app.listen(8084, ()=>{ 
    console.log('I am listening ...');
})