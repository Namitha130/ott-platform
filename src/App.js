
import './App.css';
import AddMovie from './components/AddMovie';
import Favorites from './components/Favorites';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import Navbar from './components/Navbar';
 import {BrowserRouter,Routes ,Route} from 'react-router-dom';
import Searchpage from './components/Searchpage';
import Editmovie from './components/Editmovie';

function App() {
  return ( 
    
     <BrowserRouter>
       <div className="App">
          <Navbar/>
            <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/addmovie" element={<AddMovie/>}/>   
                  <Route path="/favmovie" element={<Favorites/>}/>  
                  <Route path="/moviedetails/:id" element={<MovieDetails/>}/>
                  <Route path="/search/:searchword" element={<Searchpage/>}/>
                  <Route path="/edit/:id" element={<Editmovie/>}/>

            </Routes>
            </div>
     </BrowserRouter>
    
     
  );
}

export default App;
