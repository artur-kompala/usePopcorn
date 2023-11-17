import { useState } from "react";
export default function Main({movies,tempWatchedData,isLoading,error}){
    const [watched, setWatched] = useState(tempWatchedData);
    const [selectedId,setSelectedId] = useState("")
    
    return(
        <main className="main">
            <Box>
              {isLoading && <Loader></Loader>}
              {!isLoading && !error && <MovieList movies={movies} setSelectedId={setSelectedId}></MovieList>}
              {error && <ErrorMessage message={error}></ErrorMessage>}
            </Box>
            <Box>
              {selectedId ? <MovieDetails selectedId={selectedId} setSelectedId={setSelectedId}></MovieDetails> : 
              <>
              <Summary watched={watched}></Summary>
              <WatchedMovieList watched={watched}></WatchedMovieList>
              </>
              }
            </Box>
        </main>
    )
}

function MovieList({movies,setSelectedId}){
    return(
        <ul className="list list-movies">
              {movies?.map((movie) => (
                <Movie movie={movie} setSelectedId={setSelectedId}></Movie>
                ))}
        </ul>
    )

}
function Movie({movie,setSelectedId}){
    function handleSelect(id){
        setSelectedId(id);
    }
    return(
        <li key={movie.imdbID} onClick={()=>handleSelect(movie.imdbID)}>
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
                    <span>{avgImdbRating}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                  </p>
                </div>
              </div>
    )
}

function WatchedMovieList({watched}){
  return(
    <ul className="list">
                {watched.map((movie) => (
                  <li key={movie.imdbID}>
                    <img src={movie.Poster} alt={`${movie.Title} poster`} />
                    <h3>{movie.Title}</h3>
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
    <div class="loader"></div>
  )
}
function ErrorMessage({message}){
  return (
  <p className='error'>😖😖😖 {message}</p>
  )
}
function MovieDetails({selectedId ,setSelectedId}){
  function handleClose(){
    setSelectedId(null)
  }
  return(
    <>
    <button className="btn-back" onClick={handleClose}>✕</button>
    <div className="details">{selectedId}</div>
    </>
    
  )
}