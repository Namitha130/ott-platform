import { useRef } from "react";
const AddMovie = () => {
   
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

let handleAddNewMovie = (e) =>{
    // create new movie object

    e.preventDefault();

    let newMovie = {
        moviename: moviename.current.value,
        hero: hero.current.value,
        heroine: heroine.current.value,
        director: director.current.value,
        genre: genre.current.value,
        poster: poster.current.value,
        trailer: trailer.current.value,
        release: release.current.value,
        rating: rating.current.value,
        synopsis : synopsis.current.value,
        languages : [""]
    }

    let options = document.getElementsByName("lang");
    for (let i = 0; i < options.length; i++) 
    {
        if(options[i].checked == true)
        {
            newMovie.languages.push(options[i].value);
        }
        
    }


    console.log(newMovie);
    fetch("http://localhost:4000/movies" ,
    {
        method: "POST",
        headers : {"Content-Type" : "application/json"},
        body: JSON.stringify(newMovie)
    })
    .then(()=>{
        alert("new movie added");
        window.location.reload();
    })
}

return ( 
    <div className="add-movie">
        
        <h1>Add new movie</h1>

        <form onSubmit={handleAddNewMovie}>  
            <div id="text-input">
                <input type="text" placeholder="Movie name" ref={moviename} />
                <input type="text" placeholder="Hero name" ref={hero}/>
                <input type="text" placeholder="Heroine name" ref={heroine} />
                <input type="text" placeholder="Director" ref={director} />
                <input type="text" placeholder="Genre" ref={genre} />
            
            </div>

            <fieldset>
                <legend>Select languages   </legend>

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
                
                    
                <input type="submit" value="ADD" />
            </form>
  
            
    </div>
     );
}
 
export default AddMovie;