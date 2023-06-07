import {Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Movieslist from "./Movieslist";
import Relevant from "./Relevant";
import { useNavigate } from "react-router-dom";


const MovieDetails = () => {
    // route parameters
    let {id}= useParams();
    let Navigate = useNavigate();
    let [movie,setmovie]= useState(null);
    let [error , seterror] =useState(null);
    let [pending,setpending] = useState(true)

    let [displayEditbox , setdisplayEditbox] = useState(false);


    useEffect( () => {
    setmovie(null);
    setpending(true);
    setTimeout( ()=> { 
        fetch(" http://localhost:4000/movies/" +id)
        .then((res) =>{return res.json()})
        .then((data)=>{ 
                    console.log(data);
                    setmovie(data);
                    setpending(false)
                }) 
        .catch((err)=> {console.log(err); seterror("404 server!!! check your internet connection");setpending(false)})
                },1000)
        } ,[id])

let deleteMovie = () => {
    // alert("delte moviealert")
   fetch("http://localhost:4000/movies/" +id ,{method : "DELETE"})
   .then(()=> { Navigate ("/")})
 }
 

    return ( 
    <div>

        {error!= null && <h1>{error}</h1>}

        { pending === true && <h1 className="loading"></h1>}
        
        <section className="movie-component">

            <h1>Movie Details Component</h1>

            { movie && <div>
                <img src={movie.poster} alt="" width="600px" height="700px"/>
                <h1>Movie : {movie.moviename}</h1>
                <h3>Hero : {movie.hero}</h3>
                <h3>Heroine :  {movie.heroine}</h3>
                <h2>Director : {movie.director}</h2>
                {/* <h1> {movie.languages.toString()}</h1> */}
                <p> Languages : {movie.languages.join(" , ")}</p>
                <p>Genre : {movie.genre}</p>
                <h5>Ratings : {movie.rating}</h5>
                <p>Synopsis : {movie.synopsis}</p>
                <h5>Release : {movie.release}</h5>
                <iframe width="560" height="315" src={movie.trailer} title="YouTube video player" 
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                        gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                
                <button onClick={deleteMovie} id="delete-btn">Delete</button>

              <Link to={`/edit/${movie.id}`}> <button id="update-btn"> Update</button>   </Link> 
                    </div>    
            }
        </section>
        
        <section className="relevent-movie">
            
           {movie &&  <Relevant genre={movie.genre}/>}
           
        </section>
           
        
    </div>
   
     );
}
 
export default MovieDetails;