const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
//update user
router.put("/:id", async (req, res) => {
    if(req.body.userId == req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch(err){
                return res.status(500).json(err);
        } 
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id,{$set:req.body,});
        res.status(200).json({message:"User updated successfully"});
    }catch(err){
        return res.status(500).json(err);
    }
    } else{
        return res.status(403).json("You can update only your account")
    }
})
//delete user
router.delete("/:id", async (req, res) => {
    if(req.body.userId == req.params.id || req.body.isAdmin){
       
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"User deleted successfully"});
    }catch(err){
        return res.status(500).json(err);
    }
    } else{
        return res.status(403).json("You can delete only your account")
    }
})
//get a user
router.get("/:id",async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password,updatedAt, ...other} = user._doc
        res.status(200).json(other)
    }catch(err){
        res.status(500).json(err);
    }
});
//follow a user
router.put("/:id/follow", async (req, res) => {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}});
                await currentUser.updateOne({$push:{followings:req.params.id}});
                res.status(200).json({message:"User followed successfully"});
            }else{
                res.status(403).json("You have already follow this user");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("you can not follow yourself")
    }

})
//unfollow a user 
router.put("/:id/unfollow", async (req, res) => {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}});
                await currentUser.updateOne({$pull:{followings:req.params.id}});
                res.status(200).json({message:"User unfollowed successfully"});
            }else{
                res.status(403).json("You do not follow this user");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("you can not unfollow yourself")
    }

})

module.exports = router;