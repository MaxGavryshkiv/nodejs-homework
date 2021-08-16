const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    return console.table(contacts);
  } catch (error) {
    console.error(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const selectContact = contacts.find(
      (contact) => contact.id === Number(contactId)
    );
    return console.table(selectContact);
  } catch (error) {
    console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    const idx = contacts.findIndex(
      (contact) => contact.id === Number(contactId)
    );
    if (idx === -1) {
      throw new Error(`Contact with id=${contactId} not found`);
    }
    const newContacts = contacts.filter(
      (contact) => contact.id !== Number(contactId)
    );
    const contactsString = JSON.stringify(newContacts);
    await fs.writeFile(contactsPath, contactsString);
    return console.log(contacts[idx]);
  } catch (error) {
    console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = { name, email, phone };

    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    const newContacts = [...contacts, newContact];
    const contactsString = JSON.stringify(newContacts);
    await fs.writeFile(contactsPath, contactsString);
    return console.table(newContacts);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
