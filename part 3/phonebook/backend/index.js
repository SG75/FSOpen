const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1> Backend for Phonebook</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end("Page does not exists");
  }
});

app.get("/info", (requests, response) => {
  let count = persons.length;
  response.send(`
    <p>Phonebook has info for ${count} people </p>
    <p>${Date()}</p>
    `);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const generateId = () => {
  let index = Math.floor(Math.random() * 95) + 6;
  return index;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  // console.log("Body:", body);
  // console.log("Name:", body.name);
  // console.log("Number:", body.number);
  // console.log("Name missing:", !body.name);
  // console.log("Number missing:", !body.number);

  if (!body.name || !body.number) {
    return response.status(400).json({ error: "name or number missing" });
  }
  const existingPerson = persons.find((person) => person.name === body.name);

  if (existingPerson) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  // console.log("Validation passed");

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };
  persons = persons.concat(person);
  response.status(204).json(person);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on poart ${PORT}`);
});
