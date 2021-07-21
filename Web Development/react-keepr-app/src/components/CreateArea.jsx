import React, { useState } from "react";

function CreateArea(props) {

    const placeholderNote = {
        title: "",
        content:""
    }

    const [note, setNote] = useState(placeholderNote)


    function handleChange(event) {
        const {name, value} = event.target;

        setNote(prevNote => {
            return {
                ...prevNote, [name]: value
            };
        })
    }


    function submitNote(event) {
        props.onAdd(note);
        setNote(placeholderNote);
        event.preventDefault(); // stop page from refreshing from the default button submit behaviour
    }


    return (
    <div>
        <form>
        <input name="title" onChange={handleChange} value={note.title} placeholder="Title" />
        <textarea name="content" onChange={handleChange} value={note.content} placeholder="Take a note..." rows="3" />
        <button onClick={submitNote}>Add</button>
        </form>
    </div>
    );
}

export default CreateArea;
