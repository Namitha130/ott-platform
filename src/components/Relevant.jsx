import { useEffect, useState } from "react";
import Movieslist from "./Movieslist";


const Relevant = ({genre}) => {

    let [movies, setMovies]= useState(null);

    useEffect( ()=> {
        fetch("http://localhost:4000/movies")
        .then((res) =>{ return res.json()})
        .then((data) => {
            setMovies(data);
        })
    })
    return ( 
        <div>
            <h1>{genre}</h1>
            {/* -----------------if genre having more than one genre ----------------*/}
            {movies && <Movieslist movies={movies.filter((m)=> {
                return genre.split(" ").some((g)=>{
                    return m.genre.includes(g)})})}  
                 title="Relevent movies"/>}
            {/* ----------------if genre having only one genre --------------*/}
            {/* {
                movies && <Movieslist movies={movies.filter((m)=>{ return m.genre.includes(genre)})} title="relevant movie-list" />
            } */}
           
        </div>
     );
}
 
export default Relevant;