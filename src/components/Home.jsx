import { useEffect, useState } from "react";
import Movieslist from "./Movieslist";

const Home = () => {

  let [movies,setmovies]= useState(null);
  let [error , seterror] =useState(null);
  let [pending,setpending] = useState(true);

useEffect( () => {

   if(!localStorage.getItem("fav"))
   {
      localStorage.setItem("fav","[]")
    }
        
  setTimeout( ()=> { 
      fetch(" http://localhost:4000/movies")
      .then((res) =>{return res.json()})
      .then((data)=>{ 
                console.log(data);
                setmovies(data);
                setpending(false)
              }) 
      .catch((err)=> {console.log(err); seterror(err);
        setpending(false)})
            },1000)
    } ,[])
  
  return ( 
    <div className="home">

    {error!= null && <h1>404 server!!! check your internet connection</h1>}
     { pending === true && <h1 className="loading"> </h1>}

 
        {movies && 
        <Movieslist movies={movies} title="All movies"/>}

        {movies && 
        <Movieslist movies={movies.filter((m)=>{return m.genre.includes("action")})} title="Action movies"/>}

        {movies && 
        <Movieslist movies={movies.filter((m)=>{return m.rating>=8.5})} title="Top rated movies"/>}

        {movies &&
        <Movieslist movies={movies.filter((m)=>{return m.genre.includes("thriller")})} title="Thriller movies"/>}
    </div>
   );
}
 
export default Home;