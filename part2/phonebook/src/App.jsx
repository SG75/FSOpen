import { useState, useEffect } from "react";
import Persons from "./Persons";
import Filter from "./Filter";
import Form from "./Form";
import personsService from "./services/persons";
import Notification from "./Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchPerson, setSearchPerson] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("success");

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

  useEffect(() => {
    if (notification === null) {
      return;
    }
    const timer = setTimeout(() => {
      setNotification(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification]);

  // console.log("render", persons.length, "persons");

  // const addPerson = (e) => {
  //   e.preventDefault();
  //   // const personObj = {
  //   //   id: newName,
  //   //   name: newName,
  //   //   number: newNumber,

  //   const nameExists = persons.some((person) => person.name === newName);
  //   if (nameExists) {
  //     alert(`${newName} is already added to phonebook`);
  //     return;
  //   }
  //   const personObj = {
  //     name: newName,
  //     number: newNumber,
  //   };
  //   personsService
  //     .create(personObj)
  //     .then((returnedPerson) => {
  //       setPersons(persons.concat(returnedPerson));
  //       setNewName("");
  //       setNewNumber("");
  //     })
  //     .catch((error) => {
  //       console.error("Error adding person", error);
  //       alert("Failed to add person to phonebook");
  //     });
  // };

  const addPerson = (e) => {
    e.preventDefault();

    const trimmedName = newName.trim();
    const trimmedNumber = newNumber.trim();

    if (!trimmedName || !trimmedNumber) {
      alert("please enter both name and number");
      return;
    }
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === trimmedName.toLowerCase(),
    );
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${existingPerson.name} is already added ot the phonebook. Replace the old number with a new one?`,
      );

      if (!confirmUpdate) {
        return;
      }
      const updatedPerson = {
        ...existingPerson,
        number: trimmedNumber,
      };
      personsService
        .update(existingPerson.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons((perviousPersons) =>
            perviousPersons.map((person) =>
              person.id === returnedPerson.id ? returnedPerson : person,
            ),
          );
          setNotification({
            message: `Number updated for ${returnedPerson.name}`,
            type: "success",
          });
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error("error updating number:", error);
          alert("Failed to update phoen number");
        });
      return;
    }
    const personObject = {
      name: trimmedName,
      number: trimmedNumber,
    };

    personsService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons((previousPersons) => previousPersons.concat(returnedPerson));

        setNotification({
          message: `${returnedPerson.name} added successfully`,
          type: "success",
        });
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.error("Error adding person:", error);
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
          showNotification("Failed to add person", "error");
          alert(
            `The person '${person.name}' was already removed from the server`,
          );
        });
    }
    // const deletedPerson = { ...person, number: newNumber };
    // console.log(person);
  };

  // testing error notification helper function

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  return (
    <div className="container">
      <h2>Phonebook</h2>
      <Notification
        message={notification?.message ?? null}
        type={notification?.type ?? "success"}
      />
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
      {/* <button onClick={() => showNotification("Simulated error!", "error")}>
        Test error notification
      </button> */}
    </div>
  );
};

export default App;
