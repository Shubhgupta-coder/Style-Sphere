const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require('../../models/User.js')

// register

const registerUser = async(req,res)=>{
    // in register form we have username , email , pasword and we get all of this from req.body
    const {userName , email , password} = req.body;

    try {
        const checkUser = await User.findOne({email});

        if(checkUser) return res.json({success:false , message:'User Already Exist with the same email ! Please try again!'});
        // First we need to hash our password
        const hashPassword = await bcrypt.hash(password, 12);

        // Now we will create a new user
        const newUser = new User({
            userName,
            email,
            password: hashPassword,
        })

        // Now we will save our new user in our mongoDB batabase
        await newUser.save();

        res.status(200).json({
           success : true,
            message : 'Successful'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Some error occured'
        })        
    }

}



// login

const loginUser = async(req,res)=>{
    const {email , password} = req.body;
    try {
        const checkUser = await User.findOne({email});
        if(!checkUser){
            return res.json({
                success:false,
                message:'User does not exist ! Please register first!!'
            })
        }

        // Now we have to check that user enter with the password that is stored in DB
        const checkPasswordMatch = await bcrypt.compare(password,checkUser.password);
        if(!checkPasswordMatch) {
            return res.json({
                success:false,
                message:'Wrong Password ! Please try again'
            })
        }

        // if password is correct , then we have to create a token
        const token = jwt.sign({
            id:checkUser._id,
            role:checkUser.role,
            email: checkUser.email,
            userName:checkUser.userName,
            
        },'CLIENT_SECRET_KEY',{expiresIn:'70m'})

        // Now we have to store that token in cookie
        res.cookie('token',token,{httpOnly:true,secure:false}).json({
            success:true,
            message:'Logged in Successfully',
            user:{
                email:checkUser.email,
                role :checkUser.role,
                id   :checkUser._id,
                userName:checkUser.userName,
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Some error occured'
        })        
    }
}




// logout

const logoutUser = async(req,res)=>{
        // for logout we only need to clear the cookie
        res.clearCookie('token').json({
            success:true,
            message:'Logged out successfully!',
        })
}

// auth middleware
// it wil check the auth status of user
const authMiddleware = async(req,res,next)=>{
    // first of all we need to get the token , and our toekn in stored in our cookies
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            success:false,
            message:'Unauthorised User !'
        })
    }
    try {
        // we need to decode the token
        const decoded = jwt.verify(token,'CLIENT_SECRET_KEY');
        req.user = decoded;   //this will return the user data
        next() ;
    } catch (error) {
        res.status(401).json({
            success:false,
            message:'Unauthorised User !'
        })
    }
}


module.exports = {registerUser,loginUser,logoutUser,authMiddleware}