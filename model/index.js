const fs = require('fs/promises');
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsFilePath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsFilePath, "utf-8");
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const contactById = allContacts.find(contact => String(contact.id) === contactId);
    return contactById;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactToRemove = getContactById(contactId);
    if (!contactToRemove) {
      return;
    };

    const allContacts = await listContacts();
    const filteredContacts = allContacts.filter(contact => String(contact.id) !== contactId);

    const stringifiedData = JSON.stringify(filteredContacts, null, 2);
    await fs.writeFile(contactsFilePath, stringifiedData, "utf8");

    return contactToRemove;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const allContacts = await listContacts();
    const newContact = { id: uuidv4(), ...body };
    const newContacts = [...allContacts, newContact];

    const stringifiedData = JSON.stringify(newContacts, null, 2);
    await fs.writeFile(contactsFilePath, stringifiedData, "utf8");

    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const allContacts = await listContacts();
    const findedContact = allContacts.find((contact) => String(contact.id) === contactId);

    const newContact = { ...findedContact, ...body };
    const mappedContacts = contacts.map((item) =>
      String(item.id) === contactId ? newContact : item);

    const stringifiedData = JSON.stringify(mappedContacts, null, 2);
    await fs.writeFile(contactsFilePath, stringifiedData, "utf8");

    return newContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
