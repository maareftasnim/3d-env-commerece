const mongoose = require('mongoose')

const post = mongoose.model('Post' ,{
    title:{
        type: String ,
        required: true ,
        minlength : 3 ,
        maxlength : 40 

    },
    idUser: {
        type : String 

    },
    description: {
        type : String,
        maxlength : 500

    },
    date: {
        type : String
    },
    image: {
        type : String,
        required: true 


    },
    qrcode:{
        type : String,
        required: false
    }
}


)

module.exports = mongoose.model('Post');
