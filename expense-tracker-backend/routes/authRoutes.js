const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User')

router.post('/register', async(req,res)=>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400).json({message:'Please fill all the fields!'})
    }
try{
    const existingUser = await User.findOne({email});
    if(existingUser){
        res.status(400).json({message:'User already exists'})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        name,email,password:hashedPassword
    });
    await newUser.save();
    res.status(201).json({message:'User registered successfully'});
} catch(err){
    console.log(err);
    res.status(400).json({ message : 'Server error'});
}
});


router.post('/login',async (req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message:"Please fill all the fields"});
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message:'User not found, please register first!'})
    }

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({message:'Invalid Credentials!'})
    }

    const token = jwt.sign(
        {userId : user._id},process.env.JWT_SECRET,{expiresIn:'1h'}
    );

    res.status(200).json(
        {
            message:'Login success',
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        }
        )
})

module.exports = router;