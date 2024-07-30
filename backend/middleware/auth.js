const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const router = express.Router();

router.post('/signup', async(req, res) => {
    const { username, password } = req.body;
    try {
        const newAdmin = new Admin({ username, password });
        await newAdmin.save();
        res.status(201).json({ message: 'Admin created' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating admin' });
    }
});

router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin || !(await admin.comparePassword(password))) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

module.exports = router;