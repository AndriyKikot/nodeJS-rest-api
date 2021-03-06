const express = require('express');
const router = express.Router();

const contactsContreller = require('../../controllers/contacts.js');
const validate = require('./validation.js');

router.get("/", contactsContreller.listContacts);

router.get("/:contactId", contactsContreller.getContactById);

router.post("/", validate.createContact, contactsContreller.addContact);

router.delete("/:contactId", contactsContreller.removeContact);

router.patch(
  "/:contactId",
  validate.updateContact,
  contactsContreller.updateContact
);

module.exports = router;
