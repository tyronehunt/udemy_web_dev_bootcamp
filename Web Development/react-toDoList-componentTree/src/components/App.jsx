import React, { useState } from "react";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";

function App() {
  // Initiate state for collection of entered items (as empty array)
  const [items, setItems] = useState([]);

  // Modify list of items to add newly added inputText
  function addItem(inputText) {
    setItems((prevItems) => {
      return [...prevItems, inputText];
    });
  }

  // Modify list of items by deleting clicked on item
  function deleteItem(id) {
    setItems((prevItems) => {
      return prevItems.filter((item, index) => {
        return index != id;
      });
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      {/* Pass addItem function to InputArea component, by creating onAdd property */}
      <InputArea onAdd={addItem} />
      <div>
        <ul>
          {/* Best practice is to not use index as key. Use uuid package. */}
          {/* We create our own onChecked component property in order to pass deleteItem function through to ToDoItem component 
          - which in turn passes back an id of clicked div */}
          {items.map((todoItem, index) => (
            <ToDoItem
              key={index}
              id={index}
              text={todoItem}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
