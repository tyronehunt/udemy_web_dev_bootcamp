import React, {useState} from 'react';
import { Form, Input, Rating, Button } from 'semantic-ui-react';

export const MovieForm = ({onNewMovie}) => {
const [title, setTitle] = useState('');
const [rating, setRating] = useState(1);

    return (
        <Form>
            <Form.Field>
                <Input 
                    placeholder="movie title" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Rating 
                    icon='star' 
                    rating={rating} 
                    maxRating={5} 
                    onRate={(_, data) => {
                        setRating(data.rating);
                    }}
                />
            </Form.Field>
            <Form.Field>
                <Button onClick={async () => {
                    const movie = {title, rating};
                    const response = await fetch('/add_movie', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(movie)
                    })

                    if (response.ok) {

                        // If response from flask worked, pass the movie object it sent to the prop onNewMovie
                        onNewMovie(movie)
                        // Reset state on input form
                        setTitle('');
                        setRating(1);
                    }

                }}>Submit</Button>
            </Form.Field>
        </Form>
    )
}