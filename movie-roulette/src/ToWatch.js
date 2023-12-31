import React, { useState, useEffect } from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import ReadMoreCard from './ReadMoreCard';
import ToWatchBanner from './ToWatchBanner';

function App() {
  const [movieInfo, setMovieInfo] = useState([]);
  const [counter, setCounter] = useState(0);

  const onResetClick = () => {
    fetch('http://127.0.0.1:5000/ToWatch/Reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      setMovieInfo([]);
    });
  };

  const getWatchedPercent = (movieInfo) => {
    if (movieInfo.length !== 0) {
      const watchedMovies = movieInfo.filter((movie) => movie.watched);
      const watchedPercent = (watchedMovies.length / movieInfo.length) * 100;
      return watchedPercent;
    } else {
      return 0
    }
    
  };

  useEffect(() => {
    fetch('http://127.0.0.1:5000/ToWatch/Read', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setMovieInfo(data))
      .catch((error) => console.log(error));
  }, []);

  const watchedPercent = getWatchedPercent(movieInfo);

  const [reloadState, setReloadState] = useState(false);
  
  const handleRefresh = () => {
    setReloadState((prevValue) => !prevValue);
  }

  useEffect(() => {
    fetch('http://127.0.0.1:5000/ToWatch/Read', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setMovieInfo(data))
      .catch((error) => console.log(error));
    setReloadState(false)
  },[reloadState])

  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column" alignItems="center">
      <ToWatchBanner onResetClick={onResetClick} progress={watchedPercent} />
      <Grid templateColumns="repeat(3, 1fr)" gap={4} p={4} justifyContent="center">
        {movieInfo.map((movie, index) => (
          <GridItem key={index} textAlign="center" w="300px" m="0" p="0">
            <ReadMoreCard
              caption={movie.caption}
              date={movie.date}
              description={movie.description}
              image_link={movie.image_link}
              imdbkey={movie.imdbkey}
              position={movie.position}
              rating={movie.rating}
              title={movie.title}
              titleType={movie.titleType}
              vote_count={movie.vote_count}
              watched={movie.watched}
              handleRefresh={handleRefresh}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="md"
              backgroundColor="white"
              w="100%"
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

export default App;
