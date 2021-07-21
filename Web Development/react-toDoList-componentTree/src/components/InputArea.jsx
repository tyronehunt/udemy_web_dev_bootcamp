import React, { useState } from "react";

function InputArea(props) {
  // Initiate State for text in input field
  const [inputText, setInputText] = useState("");

  // Modify state of input text field to user-entered value
  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  return (
    <div className="form">
      <input onChange={handleChange} type="text" value={inputText} />
      <button
        onClick={() => {
          props.onAdd(inputText);
          setInputText("");
        }}
      >
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
