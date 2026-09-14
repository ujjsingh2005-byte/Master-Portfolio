const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/profile', profileController.getProfile);
router.put('/profile', profileController.updateProfile);

// Profile Photo Endpoints
router.post('/profile/photo', profileController.updateProfilePhoto);
router.delete('/profile/photo', profileController.deleteProfilePhoto);

// Resume Endpoints
router.post('/profile/resume', profileController.uploadResume);
router.get('/profile/resume', profileController.getResume);
router.delete('/profile/resume', profileController.deleteResume);

module.exports = router;
