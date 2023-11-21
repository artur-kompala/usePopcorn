import { useEffect, useRef,useState } from "react";
import { useKey } from "./useKey";

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
    
    useKey("Enter",()=>{
      inputEl.current.focus()
      setQuery("")
    })

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