import React from "react";

function Note(props) {
  function handleClick() {
    console.log(props.id);
   
      if (window.confirm('Do you want to remove?')) {
          fetch("http://localhost:8000/notes/" + props.id, {
              method: "DELETE"
          }).then((res) => {
              alert('Removed successfully.')
              window.location.reload();
          }).catch((err) => {
              console.log(err.message)
          })
      }
  
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>DELETE</button>
    </div>
  );
}

export default Note;
