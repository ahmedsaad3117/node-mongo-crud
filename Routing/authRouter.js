let express = require('express');

let authRouter = express.Router();

authRouter.get('/login',(request,response)=>{
    
    request.session.role='';
    response.render('login',{errormessage:request.flash('msg')});
})


authRouter.post('/login',(request,response)=>{
  
    console.log(request.body);
    if(request.body.UserName=='ahmed' && request.body.UserPassword =='123'){
        
        request.session.role='admin';
        console.log(request.session);
        response.redirect('/admin');
    }else{
        request.session.role='user';
        request.flash('msg','password incorrect...')
        response.render('login',{errormessage:request.flash('msg')});
    }

})

authRouter.get('/register',(request,response)=>{
    response.send('register page...');
})

authRouter.post('/register',(request,response)=>{
    
})
authRouter.get('/logout',(request,response)=>{
    response.send('logout page...');

})
module.exports = authRouter;