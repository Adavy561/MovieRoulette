import React, { useState } from 'react';
import { Box, Text, Image, VStack, Button, useToast } from '@chakra-ui/react';

const ReadMoreCard = (props) => {
  const {
    caption,
    date,
    description,
    image_link,
    imdbkey,
    position,
    rating,
    title,
    titleType,
    vote_count,
    watched,
  } = props;

  const [showMore, setShowMore] = useState(false);
  const [isWatched, setIsWatched] = useState(watched);

  const toast = useToast();

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };


  const toggleWatched = () => {
    setIsWatched(!isWatched);

    if (!isWatched) {
      fetch(`http://127.0.0.1:5000/ToWatch/${imdbkey}/Update/Watched`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        // .then((data) => console.log(data))
        .catch((error) => console.log(error));
    } else {
      fetch(`http://127.0.0.1:5000/ToWatch/${imdbkey}/Update/Unwatched`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        // .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }; 

    const message = isWatched ? 'Marked as Unwatched' : 'Marked as Watched';

    toast({
      title: message,
      status: isWatched ? 'warning' : 'success',
      position: 'top',
      duration: 3000,
    });
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="md"
      maxWidth="300px"
      backgroundColor="white"
    >
      <Image src={image_link} alt={title} h="200px" w="100%" objectFit="cover" />

      <VStack spacing={2} align="start" mt={4}>
        <Text fontWeight="semibold" fontSize="lg" color="teal.500">
          {title}
        </Text>

        {date && <Text fontSize="sm" color="gray.600">{date}</Text>}

        {showMore && <Text fontSize="sm" color="gray.600">{caption}</Text>}
        {showMore && description && <Text fontSize="sm" color="gray.600">{description}</Text>}
        {imdbkey && showMore && <Text fontSize="sm" color="gray.600">IMDb Key: {imdbkey}</Text>}
        {position && showMore && <Text fontSize="sm" color="gray.600">Position: {position}</Text>}
        {rating && showMore && <Text fontSize="sm" color="gray.600">Rating: {rating}</Text>}
        {titleType && showMore && <Text fontSize="sm" color="gray.600">Title Type: {titleType}</Text>}
        {vote_count && showMore && <Text fontSize="sm" color="gray.600">Vote Count: {vote_count}</Text>}

        {caption && caption.length > 100 && (
          <Button
            onClick={toggleShowMore}
            size="sm"
            colorScheme="teal"
            variant="link"
          >
            {showMore ? 'Read Less' : 'Read More'}
          </Button>
        )}

        <Button
          onClick={toggleWatched}
          size="sm"
          colorScheme={isWatched ? 'yellow' : 'green'}
        >
          {isWatched ? 'Mark as Unwatched' : 'Mark as Watched'}
        </Button>
      </VStack>
    </Box>
  );
};

export default ReadMoreCard;
