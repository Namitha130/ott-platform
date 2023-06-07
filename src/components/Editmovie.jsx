import { useEffect, useRef } from "react";
import {useNavigate, useParams} from 'react-router-dom'

const Editmovie = () => {

    let {id} = useParams();

    let navigate = useNavigate()
    let moviename = useRef();
    let hero = useRef();
    let heroine = useRef();
    let director = useRef();
    let genre = useRef();
    let poster = useRef();
    let trailer = useRef();
    let release = useRef();
    let rating = useRef();
    let synopsis = useRef();

    useEffect (()=>{
        fetch("http://localhost:4000/movies/"+id)
        .then( (res)=>{return res.json()})
        .then((data) =>{
            moviename.current.value = data.moviename;
            hero.current.value = data.hero;
            heroine.current.value = data.heroine;
            director.current.value = data. director;
            genre.current.value = data.genre;
            poster.current.value = data.poster;
            trailer.current.value = data.trailer;
            release.current.value = data.release;
            rating.current.value = data.rating;
            synopsis.current.value = data.synopsis;
        })
    },[])


    let handleEditMovie = (e)=>{
        e.preventDefault()
        // create new movie object
        let updatedMovie = {
            moviename : moviename.current.value,
            hero : hero.current.value,
            heroine : heroine.current.value,
            director : director.current.value,
            languages:[""],
            genre:  genre.current.value,
            poster: poster.current.value,
            trailer: trailer.current.value,
            release: release.current.value,
            rating: rating.current.value,
            synopsis: synopsis.current.value
        }
        let options = document.getElementsByName("lang");
        for(let i = 0; i < options.length; i++) 
        {
            if(options[i].checked===true)
            {
                updatedMovie.languages.push( options[i].value )
            }  
        }

        // send the movie obj to the database
        fetch("http://localhost:4000/movies/"+id , 
                                                {
                                                    method : "PUT",
                                                    headers : {"Content-Type": "application/json"},
                                                    body : JSON.stringify(updatedMovie)
                                                })
        .then(()=>{
            alert("movie has been updated in database");
            navigate("/moviedetails/"+id);
        })
    }

    return ( 
        <div className="add-movie">
        
        <h1>Edit Movie</h1>

        <form onSubmit={handleEditMovie}>  
            <div id="text-input">
                <input type="text" placeholder="Movie name" ref={moviename} />
                <input type="text" placeholder="Hero name" ref={hero}/>
                <input type="text" placeholder="Heroine name" ref={heroine} />
                <input type="text" placeholder="Director" ref={director} />
                <input type="text" placeholder="Genre" ref={genre} />
            
            </div>

            <fieldset>
                <legend>Select languages </legend>

                <div className="lan">
              <div><input type="checkbox" name="lang" value="kannada" id="kan" /><label for="kan">Kannada</label></div>  
              <div><input type="checkbox" name="lang" value="tamil" id="tml" /><label for="tml">Tamil</label></div>  
              <div><input type="checkbox" name="lang" value="telagu" id="tel" /><label for="tel">Telagu</label></div>  
              <div><input type="checkbox" name="lang" value="malayalam" id="mal"/><label for="mal">malayalam</label></div>  
              <div><input type="checkbox" name="lang" value="hindi" id="hin"/><label for="hin">hindi</label></div>  
              <div><input type="checkbox" name="lang" value="english" id="en"/><label for="en">English</label></div>  
                </div>
                
            </fieldset>

                <div id="other-inp">
                    <input type="url" placeholder="Poster link" ref={poster} />
                    <input type="url" placeholder="Trailer link" ref={trailer} />
                    <input type="number" max="2024" placeholder="Date of Release" ref={release} />
                    <input type="number" step="0.1" min="1" max="10" placeholder="Rating" ref={rating}/>
                    <textarea cols="70" rows="6" ref={synopsis}></textarea>
                </div>
                
                    
                <input type="submit" value="EDIT" />
            </form>
  
            
        </div>
     );
}
 
export default Editmovie;