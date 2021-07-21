import React, { useState } from "react";

// Styling 
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import { tsNullKeyword } from "@babel/types";


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

    // Animation Effect (conditional rendering)
    const [isExpanded, setExpanded] = useState(false);

    function expandArea() {
        setExpanded(true);
    }

    return (
    <div>
        <form className="create-note">
        {isExpanded && (
            <input 
            name="title" 
            onChange={handleChange} 
            value={note.title} 
            placeholder="Title" 
            />
        )}

        <textarea 
            name="content" 
            onClick = {expandArea}
            onChange={handleChange} 
            value={note.content} 
            placeholder="Take a note..." 
            rows={isExpanded ? 3 : 1} 
        />
        <Zoom in={isExpanded}>
            <Fab onClick={submitNote}>
                <AddIcon />
            </Fab>
        </Zoom>
     
        </form>
    </div>
    );
}

export default CreateArea;
