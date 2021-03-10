const express = require('express');
const router = express.Router();

const contactsContreller = require('../../../controllers/contacts.js');
const validate = require('./validation.js');
const validateId = require('./validationId.js');
const guard = require('../../../helpers/guard');

router.get("/", guard, contactsContreller.listContacts);

router.get("/:contactId", guard, validateId, contactsContreller.getContactById);

router.post("/", guard, validate.createContact, contactsContreller.addContact);

router.delete("/:contactId", guard, validateId, contactsContreller.removeContact);

router.patch(
  "/:contactId",
  guard,
  validateId,
  validate.updateContact,
  contactsContreller.updateContact
);

module.exports = router;
