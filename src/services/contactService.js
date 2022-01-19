const Axios = require('axios');
// import Axios from 'axios'
var axios = Axios.create({ withCredentials: true });

const KEY = 'contactsDB';

export const contactService = {
  query,
  getById,
  deleteContact,
  save,
  getEmptyContact,
};

function _getUrl(id = '') {
  const BASE_URL =
    process.env.NODE_ENV !== 'development'
      ? '/api/contact'
      : '//localhost:3030/api/contact';
  return `${BASE_URL}/${id}`;
}

async function query(page) {
  console.log(page);
  try {
    const contacts = await axios.get(_getUrl(), { params: { page } });
    return contacts.data;
  } catch (err) {
    console.log(err);
  }
}

async function getById(contactId) {
  try {
    const res = await axios.get(_getUrl(contactId), contactId);
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

async function deleteContact(contactId) {
  try {
    const res = await axios.delete(_getUrl(contactId));
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

async function save(contact) {
  try {
    if (!contact._id) {
      console.log('TOY', contact);
      const addedContact = await addContact(contact);
      return addedContact;
    } else {
      const updatedContact = await updateContact(contact);
      return updatedContact;
    }
  } catch (err) {
    console.log(err);
  }
  // const savedContact = contact._id ? updateContact(contact) : addContact(contact)
  // return savedContact
}

async function updateContact(updateContact) {
  try {
    const res = await axios.put(_getUrl(updateContact._id), updateContact);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

async function addContact(contact) {
  try {
    const res = await axios.post(_getUrl(), contact);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

function getEmptyContact() {
  return {
    name: '',
    price: null,
    labels: [],
    createdAt: null,
    inStock: null,
  };
}
