import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import DisplayMovies from './DisplayMovies';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { register } from 'swiper/element/bundle';
import ToWatch from './ToWatch';
import ReadMovie from './ReadMovie';
register();

function App() {
  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' Component={DisplayMovies}/>
            <Route path='/Watchlist' Component={ToWatch}/>
            <Route path='/Readmovie' Component={ReadMovie}></Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider> 
    </>
    
  );
}

export default App;
