import React from 'react';
import {
  Box,
  Flex,
  Button,
  Progress,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const PageBanner = ({ progress, onResetClick }) => {
  return (
    <Box bg="teal.500" color="white" p={4} boxShadow="md" w="100%">
      <Flex justifyContent="space-between" alignItems="center">
        <Button colorScheme="blue" left={10}>
          <Link to={"/"}>Main Menu</Link>
        </Button>
        <VStack flex="1" alignItems="center">
          <Text>Percent of Movie List Watched</Text>
          <Progress
            value={progress}
            colorScheme="blue"
            size='md'
            w="50%" // Adjust the width as needed
          />
        </VStack>
        <Button onClick={onResetClick} colorScheme="red" right="10">
          Reset
        </Button>
      </Flex>
    </Box>
  );
};

export default PageBanner;
