const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const oneContact = await contacts.find((item) => item.id === +contactId);
    if (!oneContact) {
      return null;
    }
    return oneContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const idx = await contacts.findIndex((item) => item.id === +contactId);
    if (idx === -1) {
      return null;
    }
    const removeProduct = contacts[idx];
    contacts.splice(idx, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts));

    return removeProduct;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContact = { name, email, phone, id: v4() };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts));

    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
