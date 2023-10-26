import React, { useState, useEffect } from 'react';
import { Box, Text, Image, VStack, Grid, GridItem, Button } from '@chakra-ui/react';
import ReadMoreCard from './ReadMoreCard';

function App() {
  const [movieInfo, setMovieInfo] = useState([]);

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

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      {movieInfo.map((movie, index) => (
        <GridItem key={index}>
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
          />
        </GridItem>
      ))}
    </Grid>
  );
}
export default App;
