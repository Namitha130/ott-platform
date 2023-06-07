import { useEffect, useState } from "react";
import Movieslist from "./Movieslist";

const Favorites = () => {

    let[fav , setFav] = useState(null);

    useEffect(()=>{
        setFav(JSON.parse(localStorage.getItem("fav")))
    } , [])

    return ( 
    <div>
       {fav &&
        <Movieslist movies={fav} title="Favorite movies"/>}
    </div> );
}
 
export default Favorites;