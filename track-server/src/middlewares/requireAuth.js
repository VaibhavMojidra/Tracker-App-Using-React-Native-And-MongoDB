const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const User =mongoose.model('User');

module.exports = (req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization){
        return res.status(401).send({error:'You must be logged in1'});
    }
    const token=authorization.replace('Bearer ','');
    jwt.verify(token,'MY_SECRET_KEY',async(err,payload)=>{
        if(err){
            return res.status(401).send(err.message);
        }
        const {userId}=payload;
        const user=await User.findById(userId);
        req.user=user;
        next();        
    })
};