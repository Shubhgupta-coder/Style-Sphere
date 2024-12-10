const express = require('express');

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter  = require('./routes/auth/auth-routes');
const adminProductRouter =  require('./routes/admin/products-routes.js')
const adminOrderRouter = require("./routes/admin/order-routes");

const shopProductsRouter = require('./routes/shop/products-routes.js')
const shopCartRouter = require('./routes/shop/cart-routes.js')
const shopAddressRouter = require("./routes/shop/address-routes.js");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");
// Create a Database Connection

mongoose.connect('mongodb+srv://ShubhGupta:Shubh%40123@cluster0.hlc7s.mongodb.net/').
then(()=>console.log('Mongo DB Connencted')).
catch((e)=>console.log(e))

const app = express();
const PORT = process.env.PORT || 5000;

// Whenever i will be running i want to  run this client side server port here

app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders: [   
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
    //   Help us in login and register
      credentials: true,
}));

app.use(cookieParser());
app.use(express.json());


app.use('/api/auth',authRouter);
app.use('/api/admin/products',adminProductRouter) 
app.use("/api/admin/orders", adminOrderRouter);

app.use('/api/shop/products',shopProductsRouter)
app.use('/api/shop/cart',shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);
// whenever i will go to /api/auth and then /register in authRouter u need to call registerUser controller
// /api/auth/register -> registerUser

app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`)
})