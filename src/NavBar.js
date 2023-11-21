import { useEffect, useRef,useState } from "react";

export default function NavBar({movies,query,setQuery}){
    
    return(
        <nav className="nav-bar">
        <Logo></Logo>
        <Search query={query} setQuery={setQuery}></Search>
        <NumResults movies={movies}></NumResults>
      </nav>
    )
}
function Search({query,setQuery}){
    const inputEl = useRef(null)
    useEffect(()=>{
      inputEl.current.focus()
    },[])
    
    useEffect(()=>{
      function callback(e){
        if (e.key === "Enter") {
          inputEl.current.focus()
          setQuery("")
        }
      }
      document.addEventListener("keyup", callback)
      return ()=>document.removeEventListener('keyup',callback); 
    },[setQuery])

    return(
        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={inputEl}
        />
    )
}
function Logo(){
    return(
        <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
    )
}
function NumResults({movies}){
    return(
        <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>
    )
}