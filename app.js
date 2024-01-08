const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
];

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

// fetching a single resource
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);

  const note = notes.find((n) => n.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// deleting resources
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);

  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

const generateId = () => {
  const id = notes.length > 0 ? Math.max(...notes.length) : 1;
  return id + 1;
};
// post resource
app.post('/api/notes', (request, response) => {
  const body = request.body;

  const note = {
    id: generateId(),
    content: body.content,
    important: Boolean(body.important) || false,
  };

  if (body.content) {
    response.status(400).json({ error: 'content missing' });
  }

  notes = notes.concat(note);
  response.status(201).json(note);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
