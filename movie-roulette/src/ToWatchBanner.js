import React from 'react';
import {
  Box,
  Flex,
  Button,
  Progress,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const PageBanner = ({ progress, onResetClick }) => {
  return (
    <Box bg="teal.500" color="white" p={4} boxShadow="md">
      <Flex justifyContent="space-between" alignItems="center">
        <Button colorScheme="blue">
          <Link to={"/"}>Main Menu</Link>
        </Button>
        <Progress
          flex="1"
          value={progress}
          colorScheme="teal"
          size="xs"
          w="50%" // Set the width to 50%
        >
          Movies Watched
        </Progress>
        <Button onClick={onResetClick} colorScheme="red">
          Reset
        </Button>
      </Flex>
    </Box>
  );
};

export default PageBanner;
