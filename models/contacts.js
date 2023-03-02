const fs = require('fs').promises;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');


const listContacts = async () => {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    return contacts;
  };
  
  const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact || null;
  };

  const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex((contact) => contact.id === contactId);
    if (idx === -1) {
      return null;
    }
    const [removeContact] = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removeContact;
  };

  const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  };

  const updateContact = async (contactId, data) => {
    const contacts = await listContacts();
    const idx = await contacts.findIndex(contact => contact.id === contactId);
    
    if(idx === -1){
      return null;
    };
    
    const id = await contactId;
    contacts[idx] = await {id, ...data};
  
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[idx];
  };
  
  module.exports = { listContacts, getContactById, addContact, removeContact, updateContact };

