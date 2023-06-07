import { useParams } from "react-router-dom";
import { useState , useEffect } from "react";
import Movieslist from "./Movieslist";

const Searchpage = () => {

    
    let {searchword} = useParams();
    let [movies , setMovies] = useState(null);
    let [error , seterror] = useState(null);
    let [pending , setPending] = useState(true);

    useEffect( ()=>{
        setMovies(null);
        setPending(true)
        setTimeout( ()=> { 
            fetch(" http://localhost:4000/movies")
            .then((res) =>{return res.json()})
            .then((data)=>{ 
                let d = data.filter((m)=>{
                    return (m.moviename.toLowerCase().startsWith(searchword.toLowerCase())) ||
                           (m.genre.toLowerCase()===searchword.toLowerCase()) || 
                           (m.languages.includes(searchword))
                })
                setMovies(d);
                setPending(false);
                  
                    }) 
            .catch((err)=> {
                 seterror(err);
                 setPending(false)})
                  },1000)
    },[searchword])
    return ( 
    <div className="search-cont">
        {pending == true && <div className="loading" ></div>}
        {movies  && <Movieslist movies={movies} title="Search result"/>}
        
    </div> 
    );
}
 
export default Searchpage;