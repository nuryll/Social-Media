const router = require("express").Router();

router.get("/", (req,res)=>{
    res.send("hej it is login router");
})

module.exports = router