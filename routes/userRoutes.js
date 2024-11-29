const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');
dotenv.config();

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            username,
            email,
            password: hashedPassword,
            role,
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// Protected route example (to test the middleware)
router.get('/profile', protect, (req, res) => {
    res.status(200).json({ message: 'This is a protected profile route', user: req.user });
});

router.get('/admin', protect, authorizeRoles('Admin'), (req, res) => {
    res.status(200).json({ message: 'Welcome Admin!' });
}); 

// Example: Route accessible by Admin or Moderator
router.get('/dashboard', protect, authorizeRoles('Admin', 'Moderator'), (req, res) => {
    res.status(200).json({ message: 'Welcome to the dashboard!' });
});

// Example route accessible only by Moderator and Admin
router.get('/moderator', protect, authorizeRoles('Moderator', 'Admin'), (req, res) => {
    res.status(200).json({ message: 'Welcome Moderator!' });
});

// Example route accessible by all logged-in users
router.get('/user', protect, (req, res) => {
    res.status(200).json({ message: 'Welcome User!' });
});

// Update role route
// Update role route
router.put('/update-role/:id', protect, authorizeRoles('Admin'), async (req, res) => {
    const { id } = req.params;
    const { role } = req.body; // Role can be a string or ObjectId depending on your implementation

    try {
        // Find the user and update their role
        const user = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true } // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'Role updated successfully',
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
});

module.exports = router;
