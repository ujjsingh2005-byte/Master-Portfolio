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

// Certification Endpoints
router.post('/profile/certifications', profileController.addCertification);
router.delete('/profile/certifications/:id', profileController.deleteCertification);

// Education Endpoints
router.post('/profile/education', profileController.addEducation);
router.delete('/profile/education/:id', profileController.deleteEducation);

// Experience Endpoints
router.post('/profile/experience', profileController.addExperience);
router.delete('/profile/experience/:id', profileController.deleteExperience);

module.exports = router;
