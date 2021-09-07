const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const oneContact = contacts.filter((item) => item.id === contactId);
  if (!oneContact) {
    return null;
  }
  return oneContact;
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const removeProduct = contacts[idx];
  contacts.splice(idx, 1);
  const updateContacts = fs.writeFile(contactsPath, JSON.stringify(contacts));
  console.log(updateContacts);
  return removeProduct;
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const newContact = { name, email, phone, id: v4() };
  contacts.push(newContact);
  const updateContacts = fs.writeFile(contactsPath, JSON.stringify(contacts));
  console.log(updateContacts);
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
