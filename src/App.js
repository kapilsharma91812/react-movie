import React, {useState, useEffect, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const[movie, setMovies] =useState([]);
  const[isLoading, setIsLoading]=useState(false);
  const[error, setError]= useState(null);



const fetchMovieHandler =useCallback(async () => {
  setIsLoading(true);
  setError(null);
  try{
    const response = await fetch('https://swapi.dev/api/films/');
    if(!response.ok) {
    throw new Error("Something went wrong!");
    }

  const data = await response.json();

  const transformedMovie = data.results.map(movieObject=> {
      return {
        id:movieObject.episode_id,
        title:movieObject.title,
        openingText:movieObject.opening_crawl,
        releaseDate:movieObject.release_date
      }
    });
    setMovies(transformedMovie);

 }catch(error){
setError(error.message);
 }
 setIsLoading(false);
}, []);

useEffect(()=> {
  fetchMovieHandler();
},[fetchMovieHandler]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading &&movie.length !==0 && <MoviesList movies={movie} />}
        {!isLoading &&movie.length ===0 && !error && <p>No movies found</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading......</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
