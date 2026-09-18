const Contact = require('../models/Contact');
const { successResponse, errorResponse } = require('../utils/apiResponse');

let inMemoryContacts = [];

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
      // In development without active MongoDB, simulate save in memory
      savedContact = {
        _id: 'contact_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        name,
        email,
        subject,
        message,
        createdAt: new Date().toISOString()
      };
      inMemoryContacts.unshift(savedContact);
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

exports.getContacts = async (req, res) => {
  try {
    let contacts = [];
    if (Contact.db.readyState === 1) {
      contacts = await Contact.find().sort({ createdAt: -1 });
    } else {
      contacts = inMemoryContacts;
    }
    return successResponse(res, 200, contacts, 'Messages retrieved successfully');
  } catch (error) {
    return errorResponse(res, 500, 'Failed to fetch contact messages.');
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (Contact.db.readyState === 1) {
      await Contact.findByIdAndDelete(id);
    }
    inMemoryContacts = inMemoryContacts.filter(c => String(c._id) !== String(id));
    return successResponse(res, 200, null, 'Message deleted successfully');
  } catch (error) {
    return errorResponse(res, 500, 'Failed to delete contact message.');
  }
};

