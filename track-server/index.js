require('./src/models/User');
require('./src/models/Track');

const express =require('express');
const mongoose=require('mongoose');
const bodyParser= require('body-parser');
const authRoutes=require('./src/routes/authRoutes');
const trackRoutes=require('./src/routes/trackRoutes');
const app =express();
const requireAuth=require('./src/middlewares/requireAuth');

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);


const mongoURI='URL'; //URL from mongo db to connect api
mongoose.connect(mongoURI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
}).then(() => console.log('mongo connected'))
.catch(err => console.log('Errrrrooooooorrr:     ',err));

mongoose.connection.on('connected',()=>{
    console.log('Connected to mongo db');
});
mongoose.connection.on('error',(err)=>{
    console.log('Error connecting to mongo db: ',err);
});

app.get('/',requireAuth,(req,res)=>{
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000,()=>{
    console.log('Listening on port 3000');
})