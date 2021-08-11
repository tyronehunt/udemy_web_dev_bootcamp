import React, {useState} from 'react';
import { Form, Input, Rating, Button } from 'semantic-ui-react';

function MovieForm (props) {
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(1);

    function handleChange(event) {
        setTitle(event.target.value)
    }

    function handleRate(_, data) {
        setRating(data.rating);
    }

    return (
        <Form>
            <Form.Field>
                <Input 
                    placeholder="movie title" 
                    value={title} 
                    onChange = {handleChange}
                />
            </Form.Field>
            <Form.Field>
                <Rating 
                    icon='star' 
                    rating={rating} 
                    maxRating={5} 
                    onRate={handleRate}
                />
            </Form.Field>
            <Form.Field>
                <Button onClick={async () => {
                    const movie = {title, rating};
                    console.log("adding:")
                    console.log(movie)
                    console.log("in format:")
                    console.log(JSON.stringify(movie))
                    const response = await fetch('/add_movie', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(movie)
                    })

                    if (response.ok) {

                        // If response from flask worked, pass the movie object it sent to the prop onNewMovie
                        props.onAdd(movie)
                        // Reset state on input form
                        setTitle('');
                        setRating(1);
                    }

                }}>Submit</Button>
            </Form.Field>
        </Form>
    );
}

export default MovieForm;