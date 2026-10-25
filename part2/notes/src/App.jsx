import { useEffect, useState } from "react";
import axios from "axios";
import Note from "./components/Note";
import noteService from "./services/notes";

// const promise = axios.get("http://localhost:3001/notes").then((response) => {
//   const notes = response.data;
//   console.log(notes);
// });

// const promise2 = axios.get("http://localhost:3001/foobar");
// console.log(promise2);
// promise2.then((response) => {
//   console.log(response);
// });

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    //console.log("effect"); //this is not printed when the
    //notes state is updated and the component is  rendered because of the empty array []
    //aka dependency array or just dependincies
    //this can be confirmed by removing the dependency array and checking the console
    //   axios.get("http://localhost:3001/notes").then((response) => {
    //     // console.log("promise fulfilled");
    //     setNotes(notes.concat(response.data));
    //     setNewNote("");
    //   });
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  // console.log("render", notes.length, "notes");

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      // id: String(notes.length + 1),
    };
    // setNotes(notes.concat(noteObject));
    // setNewNote("");
    // axios.post("http://localhost:3001/notes", noteObject).then((response) => {
    //   console.log(response);
    // });
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (e) => {
    console.log(e.target.value);
    setNewNote(e.target.value);
  };

  const noteToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const toggleImportanceOf = (id) => {
    // const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    // axios.put(url, changedNote).then((response) => {
    //   setNotes(notes.map((note) => (note.id === id ? response.data : note)));
    // });
    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id === id ? returnedNote : note)));
      })
      .catch((error) => {
        alert(`the note '${note.content} was already deleted from server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {noteToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
