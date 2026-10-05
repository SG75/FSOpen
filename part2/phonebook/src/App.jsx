import { useState, useEffect } from "react";
import axios from "axios";
import Persons from "./Persons";
import Filter from "./Filter";
import Form from "./Form";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchPerson, setSearchPerson] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3002/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const addPerson = (e) => {
    e.preventDefault();
    const personObj = {
      id: newName,
      name: newName,
      number: newNumber,
    };
    const nameExists = persons.some((person) => person.name === newName);
    if (!nameExists) {
      setPersons(persons.concat(personObj));
      setNewNumber("");
      setNewName("");
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const handlePersonChange = (e) => {
    // console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchPerson={searchPerson} setSearchPerson={setSearchPerson} />
      <h3>add a new </h3>
      <Form
        addPerson={addPerson}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} searchPerson={searchPerson} />
    </div>
  );
};

export default App;
