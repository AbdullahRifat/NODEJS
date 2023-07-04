const express = require("express")
const bodyParser = require('body-parser');
const app = express()


const Product = require('./model/productModels')
const mongoose = require('mongoose');
const product = require("./model/productModels");

app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}))

app.get('/books/',async(req,res)=>{
    try{
        const product = await Product.find({})
        res.status(200).json({product})
        
    }catch(err){
        res.status(400).json({message:err.message})
    }
})


app.get('/books/:bookId',async(req,res)=>{
    try{
        const{bookId} = req.params
        const product = await Product.findOne({bookId})
        res.status(200).json({product})
        
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

app.patch('/books/:bookId',async(req,res)=>{
    try{
        const{bookId} = req.params
        const product = await Product.findOne({bookId})
        if (!product) {
            return res.status(404).json({ message: `Product not found of ${bookId}` });
        }

        const updates = req.body;

        
        Object.assign(product, updates);
        await product.save();
        
        res.status(200).json({product})
        
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

app.post('/books/',async(req,res)=>{
    try{
        const product = await Product.create(req.body)
        if(product){
            return res.status(200).json({"message": "Product already exists"});
        }
        res.status(200).json({product})
        
    }catch(err){
        res.status(400).json({message:err.message})
    }
})


app.delete('/books/:bookId',async(req,res)=>{
    try{
        const{bookId} = req.params
        const product = await Product.findOneAndDelete({bookId})
        if (!product) {
            return res.status(404).json({ message: `Product not found of ${bookId}` });
        }
        res.status(200).json({message:`product is successfully deleted`})
        
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

mongoose.connect('mongodb+srv://admin:12345678admin@cluster0.0phzq4e.mongodb.net/')
.then(()=>{
    console.log('connected to mongodb')
    app.listen(3000,()=>{

        console.log("server is running")
    })
    
}).catch(err=>console.log(err))