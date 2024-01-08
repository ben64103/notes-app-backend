const express = require('express');

const app = express();

// middleware
app.use(express.json());

let contacts = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
  { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
];

const PORT = 3001;

// generate random id for each entry
const generateId = () => {
  let maxId = '';
  for (let i = 0; i < 10; i++) {
    maxId += Math.floor(Math.random() * 10);
  }
  return Number(maxId);
};

const isMissingDetails = (contact) => {
  if (contact.name === '' || contact.number === '') {
    return {
      error: 'missing content!, please field cannot be empty',
    };
  }
};

const isExistingContact = (contact) => {
  const existing = contacts.find((c) => c.name === contact.name);
  if (existing) {
    return {
      error: `name must be unique!`,
      msg: ` ${contact.name} is already in your list of contacts`,
    };
  }
};

app.get('/', (request, response) => {
  response.status(200).send(`<h1>Phonebook App </h1>`);
});

app.get('/api/persons', (request, response) => {
  response.json(contacts);
});

// get info on your phoonebook app
app.get('/info', (request, response) => {
  const contactsLength = contacts.length;
  const date = new Date();

  response.send(
    `<p>Phone has info for ${contactsLength} people</p>
     <p>${date}</p> `
  );
});

// get single phonebook entry
app.get('/api/persons/:contactId', (request, response) => {
  const id = Number(request.params.contactId);

  const contact = contacts.find((contact) => contact.id == id);

  if (!contact) {
    return response.status(404).json({
      error: 'This contact does not exist',
    });
  }

  response.json(contact);
});

// delete single phonebook entry
app.delete('/api/persons/:contactId', (request, response) => {
  const id = Number(request.params.contactId);

  contacts = contacts.filter((contact) => contact.id !== id);
  response.status(204).end();
});

// add a new phonebook entry
app.post('/api/persons', (request, response) => {
  const id = generateId();
  const contact = request.body;
  
  // errors related to auth
  const existingContact = isExistingContact(contact);
  const missingDetails = isMissingDetails().error;

  if (missingDetails) {
    return response.status(400).json(missingDetails);
  } else if (existingContact !== undefined) {
    return response.status(409).json(error);
  }

  const newContact = { id, ...contact };

  contacts = contacts.concat(newContact);
  response.status(201).json(newContact).end();
});

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
