import './App.css';
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Main from "./Main";
import { useMovies } from './useMovies';



export default function App() {

  const [query, setQuery] = useState("");
  
  const {movies,isLoading,KEY,error} = useMovies(query)

  return (
    <>
      <NavBar movies={movies} query={query} setQuery={setQuery}></NavBar>
      <Main movies={movies} isLoading={isLoading} error={error} KEY={KEY}></Main>
    </>
  );
}

