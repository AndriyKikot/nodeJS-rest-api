const Contact = require('./schemas/contact');

const listContacts = async (userId) => {
  const result = await Contact.find({ owner: userId }).populate({
    path: 'owner',
    select: 'email subscription -_id',
  });
  return result;
};

const getContactById = async (contactId, userId) => {
  const result = await Contact.findOne({ _id: contactId, owner: userId, }).populate({
    path: 'owner',
    select: 'email subscription -_id',
  });
  return result;
};

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (contactId, body, userId) => {
  const result = await Contact.findByIdAndUpdate(
    { contactId, owner: userId },
    ...body,
    { new: true },
  );
  return result;
};

const removeContact = async (contactId, userId) => {
  const result = await Contact.findByIdAndRemove({ contactId, owner: userId });
  return result;
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
