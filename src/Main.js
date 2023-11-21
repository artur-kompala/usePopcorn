import { useEffect, useState } from "react";
import StarRating from "./StarRating";
export default function Main({movies,isLoading,error,KEY}){
    const [watched, setWatched] = useState(()=>{
      const storedValue = localStorage.getItem('watched')
      return JSON.parse(storedValue)
    });
    const [selectedId,setSelectedId] = useState("")

    function handleAddWatchedMovie(movie){
      if(movie !== undefined){
        setWatched(watched=>[...watched,movie])
      }
      //localStorage.setItem('watched',JSON.stringify([...watched,movie]))
    }
    function handleOnDeleteMovie(id){
      setWatched(watched => watched.filter(movie => movie.imdbID !== id))
    }

    useEffect(()=>{
      localStorage.setItem('watched',JSON.stringify(watched))
    },[watched])
    
    return(
        <main className="main">
            <Box>
              {isLoading && <Loader></Loader>}
              {!isLoading && !error && <MovieList  movies={movies} setSelectedId={setSelectedId} selectedId={selectedId}></MovieList>}
              {error && <ErrorMessage message={error}></ErrorMessage>}
            </Box>
            <Box>
              {selectedId ? <MovieDetails setWatched={setWatched} handleAddWatchedMovie={handleAddWatchedMovie} selectedId={selectedId} setSelectedId={setSelectedId} KEY={KEY} watched={watched}></MovieDetails> : 
              <>
              <Summary watched={watched}></Summary>
              <WatchedMovieList watched={watched} onDelete={handleOnDeleteMovie}></WatchedMovieList>
              </>
              }
            </Box>
        </main>
    )
}

function MovieList({movies,setSelectedId,selectedId}){
    return(
        <ul className="list list-movies">
              {movies?.map((movie) => (
                <Movie movie={movie} setSelectedId={setSelectedId} selectedId={selectedId} KEY={movie.imdbID}></Movie>
                ))}
        </ul>
    )

}
function Movie({movie,setSelectedId,selectedId,KEY}){
    function handleSelect(id){
        if(id === selectedId){
          setSelectedId(null)
          return
        }
        setSelectedId(id);
    }
    return(
        <li key={KEY} onClick={()=>handleSelect(movie.imdbID)}>
                  <img src={movie.Poster} alt={`${movie.Title} poster`} />
                  <h3>{movie.Title}</h3>
                  <div>
                    <p>
                      <span>🗓</span>
                      <span>{movie.Year}</span>
                    </p>
                  </div>
                </li>
    )
}
function Summary({watched}){
    
    const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));
    return(
        <div className="summary">
                <h2>Movies you watched</h2>
                <div>
                  <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                  </p>
                  <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating.toFixed(2)}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{avgUserRating.toFixed(2)}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{avgRuntime.toFixed(0)} min</span>
                  </p>
                </div>
              </div>
    )
}

function WatchedMovieList({watched,onDelete}){
  
  return(
    <ul className="list">
                {watched.map((movie) => (
                  <li key={movie.imdbID}>
                    <img src={movie.poster} alt={`${movie.title} poster`} />
                    <h3>{movie.title}</h3>
                    <div>
                      <p>
                        <span>⭐️</span>
                        <span>{movie.imdbRating}</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                      </p>
                      <p>
                        <span>⏳</span>
                        <span>{movie.runtime} min</span>
                      </p>
                      <button className="btn-delete" onClick={()=>onDelete(movie.imdbID)}>X</button>
                    </div>
                  </li>
                ))}
              </ul>
  )
}
function Box({children}){
  const [isOpen, setIsOpen] = useState(true);
  
  return(
      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? "–" : "+"}
        </button>
        {isOpen && children}
      </div>
  )
}
function Loader(){
  return(
    <div className="loader"></div>
  )
}
function ErrorMessage({message}){
  return (
  <p className='error'>😖😖😖 {message}</p>
  )
}
function MovieDetails({selectedId ,setSelectedId,KEY,handleAddWatchedMovie,watched,setWatched}){
  const [movie,setMovie] = useState({})
  const [isLoading,setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState("");
  const {Title: title, Year : year,Poster: poster, Runtime: runtime, imdbRating,Plot :plot ,Relased: relased, Actors: actors,Director: director, Genre: genre} = movie;
  
  const isWatched = watched.map(movie=>movie.imdbID).includes(selectedId)
  
  function handleAdd(){
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      userRating,
      runtime: Number(runtime.split(' ').at(0))

    }
    handleAddWatchedMovie(newMovie);
    handleClose()
  }

  function handleClose(){
    setSelectedId(null)
    console.log("CLOSE");
  }


  useEffect(()=>{
      function callback(e){
        if (e.key === "Escape") {
          handleClose();
        }
      }
      document.addEventListener("keyup", callback)
      return ()=>document.removeEventListener('keyup',callback); 
  },[])
  useEffect(()=>{
    
    async function getMovieDetails(){
      try {
        setIsLoading(true)
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
        if(!res.ok) throw new Error("Smoething went wrong with fetching movies")
        const data = await res.json()
        setMovie(data)
        if(data.Response === 'False')throw new Error('Movie not found')
      } catch (err) {
        
      } finally{
        setIsLoading(false)
      }
    }
    getMovieDetails();
  },[KEY, selectedId])

  useEffect(()=>{
    if(!title) return;
    document.title=`Movie ${title}`
    return ()=>document.title = 'usePopcorn'
  },[title]);
  
  return(
    <div className="details">
    {isLoading && <Loader></Loader>}
    {!isLoading && 
      <>
      <header>
      <button className="btn-back" onClick={handleClose}>✕</button>
      <img src={poster} alt={`Poster of ${movie} movie`}></img>
      <div className="details-overview">
        <h2>{title}</h2>
        <p>{relased} &bull; {runtime}</p>
        <p>{genre}</p>
        <p>
          <span>{imdbRating}  rating</span>
        </p>
      </div>
    </header>
    <section>
      <div className="rating">
        {!isWatched ? <StarRating maxRating={10} size={25} onSetRating={setUserRating}></StarRating> : "You rated this film"}
     
      </div>
      
      {userRating > 0 && <button className="btn-add" onClick={handleAdd}>Add to list</button>}
      <p><em>{plot}</em></p>
      <p>Starring {actors}</p>
      <p>Directed by {director}</p>
    </section>
      </>
    }
    </div>
    
    
  )
}