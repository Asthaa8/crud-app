require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const setupPassport = require('./config/passport');
const authRoutes = require('./routes/auth');
const twoFactorRoutes = require('./routes/twoFactorRoutes');
const User = require('./models/User');

const app = express();


// =======================
// Middleware
// =======================

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));


// =======================
// Passport OAuth
// =======================

app.use(passport.initialize());
setupPassport();


// =======================
// Routes
// =======================

app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

app.use('/api/2fa', twoFactorRoutes);


// =======================
// MongoDB Connection
// =======================

const mongoUri =
  process.env.MONGO_URI ||
  'mongodb://127.0.0.1:27017/crud-app';


mongoose.connect(mongoUri)
.then(() => {
  console.log('MongoDB connected');

  seedAdminUser();
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});


// =======================
// User Seed
// =======================

async function seedAdminUser() {

  try {

    const count = await User.countDocuments();

    if(count === 0){

      const adminEmail =
        process.env.ADMIN_EMAIL ||
        'admin@example.com';

      const adminPassword =
        process.env.ADMIN_PASSWORD ||
        'password123';


      const hashedPassword =
        await bcrypt.hash(adminPassword,10);


      const admin = new User({
        name:'Admin',
        email:adminEmail.toLowerCase(),
        password:hashedPassword
      });


      await admin.save();


      console.log(
        `Admin created: ${adminEmail}`
      );

    }

  }
  catch(error){

    console.error(
      'Admin seed error:',
      error
    );

  }

}



// =======================
// Product Model
// =======================

const productSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  description:{
    type:String
  },

  price:{
    type:Number,
    required:true,
    min:0
  },

  inStock:{
    type:Boolean,
    default:true
  }

},
{
  timestamps:true
});


const Product =
mongoose.model(
  'Product',
  productSchema
);



// =======================
// Test Route
// =======================

app.get('/',(req,res)=>{

  res.json({
    message:'CRUD API is running'
  });

});



// =======================
// GET ALL PRODUCTS
// =======================

app.get('/api/products',
async(req,res)=>{

try{

const products =
await Product.find()
.sort({
 createdAt:-1
});


res.json(products);


}
catch(error){

res.status(500)
.json({
 error:'Unable to fetch products'
});

}

});



// =======================
// GET SINGLE PRODUCT
// =======================

app.get('/api/products/:id',
async(req,res)=>{

try{


const product =
await Product.findById(
 req.params.id
);


if(!product){

return res.status(404)
.json({
 error:'Product not found'
});

}


res.json(product);


}
catch(error){

res.status(400)
.json({
 error:'Invalid product id'
});

}


});



// =======================
// CREATE PRODUCT
// =======================

app.post('/api/products',
async(req,res)=>{


try{


const product =
new Product(req.body);


await product.save();


res.status(201)
.json(product);



}
catch(error){

res.status(400)
.json({
error:error.message
});

}


});



// =======================
// UPDATE PRODUCT
// =======================

app.put('/api/products/:id',
async(req,res)=>{


try{


const product =
await Product.findByIdAndUpdate(
req.params.id,
req.body,
{
new:true,
runValidators:true
}
);



if(!product){

return res.status(404)
.json({
error:'Product not found'
});

}


res.json(product);


}
catch(error){

res.status(400)
.json({
error:error.message
});

}


});



// =======================
// DELETE PRODUCT
// =======================

app.delete('/api/products/:id',
async(req,res)=>{


try{


const product =
await Product.findByIdAndDelete(
req.params.id
);



if(!product){

return res.status(404)
.json({
error:'Product not found'
});

}


res.json({
message:'Product deleted successfully'
});


}
catch(error){

res.status(400)
.json({
error:error.message
});

}


});



// =======================
// Server Start
// =======================

const PORT =
process.env.PORT || 3000;


app.listen(PORT,()=>{

console.log(
`Server running on http://localhost:${PORT}`
);

});