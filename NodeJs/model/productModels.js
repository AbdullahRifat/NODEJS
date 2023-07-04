const mongoose = require("mongoose")

const productShema = mongoose.Schema({

    bookName :{
        type:String,
        required:true
    },
    bookId:{
        type:Number,
        required:true
    },
    author:{
        type:String,
        required:true
    }
})

const Product = mongoose.model('Product',productShema)

module.exports = Product