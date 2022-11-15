const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
    const contactsRaw = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsRaw);
    return contacts;
};

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contactToFind = contacts.find(contact => contact.id === contactId.toString());
    return contactToFind;
};

async function removeContact(contactId) {
    const contacts = await listContacts();
    const contactToDelete = contacts.find(contact => contact.id === contactId.toString());
    if (!contactToDelete) {
        return null;
    };
    const remainingСontacts = contacts.filter(contact => contact.id !== contactId.toString());
    await fs.writeFile(contactsPath, JSON.stringify(remainingСontacts));
    return contactToDelete;
};

async function addContact(name, email, phone) {
    const id = nanoid();
    const newContact = { id, name, email, phone };
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};