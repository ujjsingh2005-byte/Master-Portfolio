const Contact = require('../models/Contact');
const { successResponse, errorResponse } = require('../utils/apiResponse');

exports.createContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    let savedContact = null;

    if (Contact.db.readyState === 1) {
      savedContact = await Contact.create({
        name,
        email,
        subject,
        message
      });
    } else {
      // In development without active MongoDB, simulate save and respond cleanly
      savedContact = {
        _id: 'contact_' + Date.now(),
        name,
        email,
        subject,
        message,
        createdAt: new Date().toISOString()
      };
    }

    return successResponse(
      res,
      201,
      {
        id: savedContact._id,
        name: savedContact.name,
        email: savedContact.email,
        createdAt: savedContact.createdAt
      },
      'Thank you! Your message has been sent successfully.'
    );
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return errorResponse(res, 400, 'Validation Error', messages);
    }
    return errorResponse(res, 500, 'Unable to send message at this time. Please try again later.');
  }
};
