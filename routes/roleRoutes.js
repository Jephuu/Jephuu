const express = require('express');
const Role = require('../models/Role');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new role
router.post('/create', protect, authorizeRoles('Admin'), async (req, res) => {
    const { name, permissions } = req.body;

    try {
        const role = new Role({ name, permissions });
        await role.save();
        res.status(201).json({ message: 'Role created successfully', role });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error });
    }
}); 

// Update a role's permissions
router.put('/update/:id', protect, authorizeRoles('Admin'), async (req, res) => {
    const { permissions } = req.body;

    try {
        const role = await Role.findByIdAndUpdate(
            req.params.id,
            { permissions },
            { new: true }
        );
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json({ message: 'Role updated successfully', role });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// Delete a role
router.delete('/delete/:id', protect, authorizeRoles('Admin'), async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        if (!role) { 
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
