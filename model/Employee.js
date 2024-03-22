
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//Mongoose Schema
const employeeSchema = new Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    MobileNumber:{
        type:Number,
        required:true
    }
})

//now we are creating a data model right here.
module.exports =mongoose.model('Employee',employeeSchema) ;

// Employee that is uppercase first letter and not plural.
//Now by default mongoose when it creates this model will set this to lowercase and plural .so,it will look for an 'employees' collection in mongoDB and the employees collection will be all lowercase once again it will be plural and we can see that  in document too.


