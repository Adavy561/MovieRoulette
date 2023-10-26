import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Center,
  Button,
  Heading,
  Stack,
  HStack,
  Text,
  Image,
	Skeleton
} from '@chakra-ui/react';
import './MovieCard.css'
import { Link } from 'react-router-dom'
import ToWatch from './ToWatch';

const EndSlide = ({resetSlides}) => {
	const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    setTimeout(() => {
      setIsLoaded(false)
    }, 300)
  }, []);

  return (
    <div>
      <Skeleton isLoaded={!isLoaded}>
            <div className='background'>
							<Center>
								<Card className='card' width={'425px'} shadow={'dark-lg'}>
									<h1 className='card title'>Thats all we've got for now!</h1>
									<CardBody className='card-content'>
										<Stack spacing={32}>
                      <Button colorScheme={'teal'} onClick={resetSlides}>Pick new movies</Button>
                      <Button colorScheme={'blue'} onClick={ToWatch}><Link to='/Watchlist'>View Watchlist</Link></Button>
                      <div>
                        <Text>Application Developed by: Aidan Davy</Text>
                      </div>
                    </Stack>
									</CardBody>
								</Card>
							</Center>
            </div>
        </Skeleton>
    </div>
  )
}

export default EndSlide
