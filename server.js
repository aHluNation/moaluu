const express = require('express')
const mongoose = require('mongoose')

const app = express()

// Create view engine
app.set('view engine','ejs')

app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(express.json())

// connect to database
mongoose.connect("mongodb://0.0.0.0:27017/portfolioDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('Database connected successfully')
}).catch((err)=>{
    console.log(err)
})

const Schema=new mongoose.Schema({
    name:String,
    email:String,
    message:String
})

const portfolioModel=mongoose.model('portfolioDocument',Schema)
module.exports=portfolioModel

app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/',async(req,res)=>{
    let newMessage=new portfolioModel(req.body)
    let result=await newMessage.save()
    res.send(result)

    res.redirect('/')
})


app.listen(3500, ()=>{
    console.log('app is listening on PORT 3500')
})