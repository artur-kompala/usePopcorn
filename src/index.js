import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
//import App from './App';
import StarRating from './StarRating';

function Test(){
  const [movieRating,setMovieRating] = useState(0); 
  return(
    <>
  <StarRating maxRating={5} className='test' messages={["Terrible","Bad","Okay","Good","Amazing"] } defaultRating={3} onSetRating={setMovieRating}></StarRating>
  <h1>DUPA {movieRating}</h1>
  </>
  )

  
  
  
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   {/*<App />*/} 
   <Test></Test>
  </React.StrictMode>
);

