
let express = require('express');

let adminRouter = express.Router();

adminRouter.get('/admin',(request,response)=>{
    response.render('admin');
})

module.exports = adminRouter;