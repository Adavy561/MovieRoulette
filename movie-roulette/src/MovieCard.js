import {
  Card,
  CardBody,
  Center,
  Button,
  Image,
  HStack,
  Skeleton,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import './MovieCard.css';
import React, { useState, useEffect } from 'react';

function MovieCard({ movieInfo }) {
  const [isLoaded, setIsLoaded] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(false);
    }, 300);
  }, []);

  const [successMessage, setSuccessMessage] = useState(false);
  const [responseData, setResponseData] = useState('');

  const sendData = () => {
    fetch('http://127.0.0.1:5000/ToWatch/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imdbkey: movieInfo['id'],
        title: movieInfo['originalTitleText'] ? movieInfo['originalTitleText']['text'] : null,
        description: movieInfo['plot'] && movieInfo['plot']['plotText'] ? movieInfo['plot']['plotText']['plainText'] : null,
        date: movieInfo['releaseDate'] ? `${movieInfo['releaseDate']['month']}/${movieInfo['releaseDate']['day']}/${movieInfo['releaseDate']['year']}` : null,
        caption: movieInfo['primaryImage'] ? movieInfo['primaryImage']['caption']['plainText'] : null,
        titleType: movieInfo['titleType'] ? movieInfo['titleType']['text'] : null,
        position: movieInfo['position'] ? movieInfo['position'] : null,
        image: movieInfo['primaryImage'] ? movieInfo['primaryImage']['url'] : null,
        rating: movieInfo['ratingsSummary'] ? movieInfo['ratingsSummary']['aggregateRating'] : null,
        votes: movieInfo['ratingsSummary'] ? movieInfo['ratingsSummary']['voteCount'] : null,
      })
    }).then(response => 
      response.json()
    ).then(responseData => {
      console.log('Server response:', responseData);
      setSuccessMessage(true)
      const responseString = responseData ? responseData.message : '';
      setResponseData(responseString)
    }).catch(error => {
      console.error('Error:', error);
      setSuccessMessage(true)
      const responseString = error ? error.message : '';
      setResponseData(responseString)
    });
  }

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  return (
    <>
      <Skeleton isLoaded={!isLoaded}>
        <div className='background'>
          <Center>
            <Card className='card' shadow={'dark-lg'} w="600px">
              <h1 className='card title'>{movieInfo['originalTitleText']['text']}</h1>
              <CardBody className='card-content'>
                <Center>
                  {imageError ? (
                    <div>No Image</div>
                  ) : (
                    <Image
                      className='image'
                      src={movieInfo['primaryImage']['url']}
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                    />
                  )}
                </Center>
              </CardBody>
              <Center>
                {successMessage ? (
                  <HStack className='fade-in-alert'>
                    <Alert status='success'>
                      <AlertIcon/>
                      Server response: {responseData}
                    </Alert>
                  </HStack>
                ) : (
                  <HStack spacing={12}>
                    {/* <Button className='button' colorScheme='teal' size='sm'>
                      Read More
                    </Button> */}
                    <Button className='button' colorScheme='blue' size='sm' onClick={sendData}>
                      Add to To-Watch
                    </Button>
                  </HStack>
                )}
              </Center>
            </Card>
          </Center>
        </div>
      </Skeleton>
    </>
  );
}

export default MovieCard;