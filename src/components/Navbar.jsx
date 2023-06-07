import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

    let [searchword, setSearchword] = useState("");
    let [movieNames,setMovies] = useState([]);
    let [menu,setMenu] = useState(false);


    useEffect( ()=>{
        fetch("http://localhost:4000/movies")
        .then((res) =>{ return res.json()})
        .then((data)=>{

            // storing only movie name
            // let names = data.map((m)=>{return m.moviename});
            // let filteredNames = names.filter( (name)=>{return name.toLowerCase().includes(searchword.toLowerCase())})
            // setMovies(filteredNames);

             // storing  moviename along with id
            let names = data.map((m)=>{return {moviename: m.moviename ,id : m.id}});
            let filteredNames = names.filter( (movie)=>{return movie.moviename.toLowerCase().includes(searchword.toLowerCase())})
            setMovies(filteredNames);
        })
    },[searchword])
    return (  
        <nav>
            <div id="logo"> 
            <Link to="/"> <h1> poolstar <i class='bx bxs-star-half bx-rotate-180 bx-burst' ></i></h1></Link>
            </div>

            <div id="search-bar">
                <input type="search" placeholder="Search for movies" value={searchword}
                onChange={ (e)=>{ setSearchword(e.target.value);}}/>

               <Link to={`/search/${searchword}`}> 
                    <button> Search </button> 
               </Link> 
            
            </div>

            <div id="add-movie">
                <Link to="/addmovie">Add Movies</Link>
            </div>

            <div id="fav-movie">
                <Link to="/favmovie">Favorite Movies</Link>
            </div>

            {/* <div id="profile">
            <i class='bx bx-user-circle' ></i>
            </div> */}

            <div id="hamberger">
                <span onClick={()=>{setMenu(!menu)}}>
                  { menu== false ?
                        <i class='bx bx-menu'></i> :
                        <i class='bx bx-menu-alt-right'></i>
                  }  
                </span>
              {menu &&
                <div id="menu">
                     <div id="menu-add-movie">
                     <Link to="/addmovie">Add Movies</Link>
                     </div>
 
                     <div id="menu-fav-movie">
                     <Link to="/favmovie">Favorite Movies</Link>
                     </div>
                 </div>
              } 

            </div>

            {   searchword != "" &&
                <div className="suggestion">
                    <ul>
                        {
                            movieNames.map((movie)=>{ 
                                return (    <Link to={`moviedetails/${movie.id}`}>  
                                                <li onClick={()=>{setSearchword("")}}>{movie.moviename}</li>
                                            </Link>)})
                        }
                    </ul>

                </div>
            } 
        </nav> 
            
        
    );
}





 
export default Navbar;