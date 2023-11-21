import { useState,useEffect } from "react";

const KEY = '8115ebbd';

export function useMovies(query){

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

      return {movies,isLoading,error,KEY};
}