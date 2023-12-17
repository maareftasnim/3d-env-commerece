const mongoose = require('mongoose')

const user = mongoose.model('User' , {

    firstname: {
        type : String ,
        required: true,
        minlength : 3 ,
        maxlength : 12 
    },
    lastname:{
        type: String ,
        required: true,
        minlength : 3 ,
        maxlength : 12 
    },
    email: {
        type: String ,
        unique: true
    },
    password: {
        type: String ,
        required: true,
        minlength: 8
      },
    age: {
        type: Number,
        min: 15,
        max: 110

      },
    gender: {
        type: String ,
        enum: ['male', 'female']
      },
    date: {
        type: String ,
    },
    image: {
        type: String ,

    }
    
    

})

module.exports = mongoose.model('User');
