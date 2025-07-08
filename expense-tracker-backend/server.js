const express = require('express'); //Imports the express module, which simplifies handling HTTP requests and routing.express is a lightweight web application framework for Node.js.
const mongoose = require('mongoose'); //Imports mongoose, an ODM (Object Data Modeling) library for MongoDB and Node.js.Helps define schemas and models to structure your data.
const cors = require('cors'); //Imports cors middleware to allow cross-origin requests.
const authRoutes = require('./routes/authRoutes')


require('dotenv').config(); // loads env variables to keep sensitive data out of the codebase


const app = express();  // initializes an express application
// app will be used to define rouutes, middleware and start the server


app.use(cors()); //Adds the CORS middleware to allow frontend access

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/expenses', require('./routes/expenseRoutes'));

app.get('/',(req,res)=>{
    res.send('Expense tracker API is working')
})

mongoose.connect(process.env.MONGO_URI,{
}).then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log('Server running on port 5000');
})