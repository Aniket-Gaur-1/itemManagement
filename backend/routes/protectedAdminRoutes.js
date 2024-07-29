const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/admin-only', auth, (req, res) => {
    res.json({ message: 'This is a protected admin route' });
});

module.exports = router;