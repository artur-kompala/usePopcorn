import { useState } from "react";
export default function Main({movies,tempWatchedData}){
    const [watched, setWatched] = useState(tempWatchedData);
    return(
        <main className="main">
            <Box>
              <MovieList movies={movies}></MovieList>
            </Box>
            <Box>
              <Summary watched={watched}></Summary>
              <WatchedMovieList watched={watched}></WatchedMovieList>
            </Box>
            
        
        </main>
    )
}

function MovieList({movies}){
    return(
        <ul className="list">
              {movies?.map((movie) => (
                <Movie movie={movie}></Movie>
                ))}
        </ul>
    )

}
function Movie({movie}){
    return(
        <li key={movie.imdbID}>
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