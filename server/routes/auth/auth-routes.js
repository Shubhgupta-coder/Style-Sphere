// We need to tell by which route we need to route which controller

const express = require('express');
const {registerUser,loginUser,logoutUser,authMiddleware}= require('../../controllers/auth/auth-controller')

const router = express.Router();

// For registering User Post method will be done

// Whenever we will  go to our '/register' in our frontend we willcall registerUser controller
router.post('/register',registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// for auth middleware we use get since here we need to get the auth status of user
router.get('/check-auth',authMiddleware,(req,res)=>{
    const user = req.user;   // in authmiddleware we get user info form req.user . If the token is valid, the authMiddleware sets req.user with the decoded user information.
    res.status(200).json({
        success:true,
        message:"Authenticated User!",
        user,
    })
})
module.exports = router;