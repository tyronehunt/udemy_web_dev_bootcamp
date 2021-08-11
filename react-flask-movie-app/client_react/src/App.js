import React, { useEffect, useState } from 'react';
import './App.css';
import {Movies} from "./components/Movies";
import MovieForm from "./components/MovieForm";
import { Container } from 'semantic-ui-react';

function App() {

  const [movies, setMovies] = useState([]);

  function addMovie(movie) {
    setMovies(currentMovies => {
            return [...currentMovies, movie];
    });
  }

  useEffect(() => {
    fetch('/get_movies')
      .then(response => response.json()
      .then(data => {
        setMovies(data.movies)
      })
    );
  }, []);

  return (
    <div className="App" style= {{textAlign: "left"}}>
      <Container style= {{marginTop: 40}}>
        <MovieForm onAdd={addMovie}/> 
        <Movies prop={movies}/>
      </Container>
    </div>
  );
}

export default App;
