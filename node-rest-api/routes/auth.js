const router = require("express").Router();
const User = require("../models/User");

//REGISTER
router.post("/register", (req,res)=>{
    const user = new User({
        username:"Nur",
        email:"nur@gmail.com" 
    })
});

module.exports = router