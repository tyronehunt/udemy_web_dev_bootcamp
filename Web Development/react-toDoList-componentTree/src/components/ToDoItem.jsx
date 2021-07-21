import React from "react";

function ToDoItem(props) {
  // Pick up onChecked property from App.jsx and pass it back the id of the div.
  // ONLY once clicked, hence the arrow function.
  return (
    <div
      onClick={() => {
        props.onChecked(props.id);
      }}
    >
      <li>{props.text}</li>
    </div>
  );
}

export default ToDoItem;
