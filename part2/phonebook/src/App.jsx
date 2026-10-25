import { useState, useEffect } from "react";
import Persons from "./Persons";
import Filter from "./Filter";
import Form from "./Form";

import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchPerson, setSearchPerson] = useState("");

  // useEffect(() => {
  //   console.log("effect");
  //   axios.get("http://localhost:3002/persons").then((response) => {
  //     console.log("promise fulfilled");
  //     setPersons(response.data);
  //   });
  // }, []);

  useEffect(() => {
    personsService.getAll().then((initialList) => {
      setPersons(initialList);
    });
  }, []);

  // console.log("render", persons.length, "persons");

  const addPerson = (e) => {
    e.preventDefault();
    // const personObj = {
    //   id: newName,
    //   name: newName,
    //   number: newNumber,

    const nameExists = persons.some((person) => person.name === newName);
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const personObj = {
      name: newName,
      number: newNumber,
    };
    personsService
      .create(personObj)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.error("Error adding person", error);
        alert("Failed to add person to phonebook");
      });
  };

  const handlePersonChange = (e) => {
    // console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    if (!person) {
      console.log(`Person with ${id} notfound`);
      return;
    }
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          console.log("Error deleting person:", error);
          alert(
            `The person '${person.name}' was already removed from the server`,
          );
        });
    }
    // const deletedPerson = { ...person, number: newNumber };
    // console.log(person);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchPerson={searchPerson} setSearchPerson={setSearchPerson} />
      <h3>add a new </h3>
      <Form
        addPerson={addPerson}
        handlePersonChange={handlePersonChange}
        newName={newName}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        searchPerson={searchPerson}
        onClick={handleDelete}
      />
    </div>
  );
};

export default App;
