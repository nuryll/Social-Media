const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,  //we have to use username so its required true.
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    profilePicture:{  //we do not have to use pp so di not write required. It can be empty.
        type:String,
        default:""
    },
    coverPicture:{  
        type:String,
        default:""
    },
    followers:{
        type:Array, //we used array, any followers ıd nummers will be inside in this array.
        default:[]
    },
    following:{
        type:Array, 
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
},
{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);