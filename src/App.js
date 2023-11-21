import './App.css';
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Main from "./Main";

const KEY = '8115ebbd';

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false)
  const [error, setError] = useState("")
  
  
  useEffect(()=>{
    const controller = new AbortController();
    async function fetchMovies(){
    try {
      setIsLoading(true);
      setError('')
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)
      if(!res.ok) throw new Error("Smoething went wrong with fetching movies")
      
      const data = await res.json()
      if(data.Response === 'False')throw new Error('Movie not found')
      setMovies(data.Search);
      
      
    } catch (err) {
      
      if(err.name !== "AbortError"){
        setError(err.message)
      }
      
      setError(err.message)
    } finally{
      setIsLoading(false);
    }
  }
  if(query.length < 3){
   setMovies([]);
   setError("");
   return
  }
  fetchMovies();
    return controller.abort();
  },[query])
  

  return (
    <>
      <NavBar movies={movies} query={query} setQuery={setQuery}></NavBar>
      <Main movies={movies} isLoading={isLoading} error={error} KEY={KEY}></Main>
    </>
  );
}

