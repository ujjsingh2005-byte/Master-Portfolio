const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { validateContactInput } = require('../middleware/validation');
const { contactLimiter } = require('../middleware/rateLimiter');

router.post('/contact', contactLimiter, validateContactInput, contactController.createContact);
router.get('/contact', contactController.getContacts);
router.delete('/contact/:id', contactController.deleteContact);

module.exports = router;
