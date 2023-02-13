import React, { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {


  const initialState = JSON.parse(localStorage.getItem("notes")) || [];
  const [notes, setNotes] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    fetch("http://localhost:8000/notes").then((res) => {
        return res.json();
    }).then((resp) => {
        setNotes(resp);
    }).catch((err) => {
        console.log(err.message);
    })
}, [])


  return (
    <div>
      <Header />
      <CreateArea  />
      {notes.map((noteItem, index) => {
        console.log(noteItem);
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.ftitle}
            content={noteItem.fcontent}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
