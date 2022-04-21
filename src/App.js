import React from 'react';
import { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddToBucket from './components/AddToBucket';
import RemoveFromBucket from './components/RemoveFromBucket';

function App() {
  const [movies, setMovies] = useState([]);
  const [bucketlist, setbucketlist] = useState([]);
  const [searchValue, setSearchValue] = useState('Thor');

  const getMovieRequest = async () => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=6b251f4a`;
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson);
    if (responseJson.Search)
      setMovies(responseJson.Search)
  }

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const newbucketlist = JSON.parse(localStorage.getItem('react-movie-app-bucket'))
    if (newbucketlist) {
      console.log(newbucketlist);
      setbucketlist(newbucketlist);
    }

  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-bucket', JSON.stringify(items))
  }
  const addMovieToBucket = (movie) => {
    const newbucketlist = [...bucketlist, movie];
    setbucketlist(newbucketlist);
    saveToLocalStorage(newbucketlist);
  }


  const removeMoviefromBucket = (movie) => {
    const newbucketlist = bucketlist.filter(
      (bucketlist) => bucketlist.imdbID != movie.imdbID
    );
    setbucketlist(newbucketlist);
    saveToLocalStorage(newbucketlist);
  }


  return (
    <div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <div className='container-fluid movie-app'>

        <div className='row'>
          <MovieList
            movies={movies}
            handleBucketClick={addMovieToBucket}
            bucketComponent={AddToBucket} />
        </div>

      </div>

      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Your Bucket List" />
      </div>
      <div className='container-fluid movie-app'>

        <div className='row'>
          <MovieList
            movies={bucketlist}
            handleBucketClick={removeMoviefromBucket}
            bucketComponent={RemoveFromBucket} />
        </div>

      </div>
      </div>
      );
}

      export default App;
