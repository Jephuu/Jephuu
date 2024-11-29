const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Add the routes file
const roleRoutes = require('./routes/roleRoutes'); // Import the role routes



dotenv.config();  // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());  // For parsing JSON request bodies
app.use(cors());  // Enable Cross-Origin Request sharing
app.use('/api/roles', roleRoutes); // Register role routes


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

// Use the user routes for API
app.use('/api/users', userRoutes); // Register routes here

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
