import React, { useState } from 'react';
import { Box, Text, Image, VStack, Button } from '@chakra-ui/react';

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
  
    const toggleShowMore = () => {
      setShowMore(!showMore);
    };
  
    return (
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} boxShadow="md">
        <Image src={image_link} alt={title} h="200px" w="100%" objectFit="cover" />
        <VStack spacing={2} align="start" mt={4}>
          <Text fontWeight="semibold">{title}</Text>
          {caption && !showMore && (
            <Text fontSize="sm" color="gray.600">
              {caption.length > 100 ? caption.slice(0, 100) + '...' : caption}
            </Text>
          )}
          {date && <Text fontSize="sm" color="gray.600">{date}</Text>}
          {showMore && <Text fontSize="sm" color="gray.600">{caption}</Text>}
          {showMore && description && <Text fontSize="sm" color="gray.600">{description}</Text>}
          {imdbkey && showMore && <Text fontSize="sm" color="gray.600">IMDb Key: {imdbkey}</Text>}
          {position && showMore && <Text fontSize="sm" color="gray.600">Position: {position}</Text>}
          {rating && showMore && <Text fontSize="sm" color="gray.600">Rating: {rating}</Text>}
          {titleType && showMore && <Text fontSize="sm" color="gray.600">Title Type: {titleType}</Text>}
          {vote_count && showMore && <Text fontSize="sm" color="gray.600">Vote Count: {vote_count}</Text>}
          {watched && showMore && (
            <Text fontSize="sm" color="gray.600">
              Watched: {watched ? 'Yes' : 'No'}
            </Text>
          )}
          {caption && caption.length > 100 && (
            <Button onClick={toggleShowMore} size="sm" variant="link" color="blue">
              {showMore ? 'Read Less' : 'Read More'}
            </Button>
          )}
        </VStack>
      </Box>
    );
  };
  
export default ReadMoreCard;