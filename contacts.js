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
    let contacts = await listContacts();
    const contactToDelete = contacts.find(contact => contact.id === contactId.toString());
    if (!contactToDelete) {
        return null;
    };
    const remainingСontacts = contacts.filter(contact => contact.id !== contactId.toString());
    contacts = remainingСontacts;
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

async function addContact(name, email, phone) {
    const id = nanoid();
    const contact = { id, name, email, phone };
    let contacts = await listContacts();
    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};