import React, { useState } from "react";

function App() {
  // State for input box
  const [inputText, setInputText] = useState("");

  // State for to do list
  const [items, setItems] = useState([]);

  // Handle input box
  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  // Handle add items to list
  function addItem() {
    setItems((prevItems) => {
      return [...prevItems, inputText];
    });
    // Clear input from input box once it was added to items
    setInputText("");
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={inputText} />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((toDoItem) => (
            <li>{toDoItem}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
