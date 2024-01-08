const express = require('express');

const app = express();

app.use(express.json());

let notes = [
  { id: 1, content: 'HTML is easy', important: true },
  { id: 2, content: 'Browser can only execute JavaScript!', important: false },
  {
    id: 3,
    content: 'GET and POST are the most important methods of the HTTP protocol',
    important: true,
  },
];

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

// fetching a single resource
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    return response.json(note);
  } else {
    return response.status(404).end();
  }
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

// add a single resource
app.post('/api/notes', (request, response) => {
  // const maxId = notes.length;
  // const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  // const maxId = notes.length > 1 ? notes.length + 1 : 1;

  // const note = request.body;

  // Status code - 400 means bad request

  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing!',
    });
  }

  let random = Math.random();

  const note = {
    id: generateId(),
    content: body.content,
    important: random > 0.5,
    condition: `${
      random > 0.5 ? 'random is greater than 0.5' : 'random is not greater than 0.5'
    }`,
    random: random.toFixed(2),
  };

  notes = notes.concat(note);
  response.json(note);
});

// deleting resources
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).json(notes).end();
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
