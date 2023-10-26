import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  Center,
  Button,
  Heading,
  Stack,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import './styles.css'
import SimpleSlider from './slider';

const DisplayMovies = () => {

    const [ movieInfo, setMovieInfo ] = useState(null);

    const [ movieList, setMovieList ] = useState('top_rated_250');

    const findMovie = () => {
      console.log(movieList)
      fetch(`http://127.0.0.1:5000/movies/${movieList}`)
      .then((response) => response.json())
      .then((data) => {
        data.map((movie) => {
          setMovieInfo(data)
        })
      })
    };

    const resetMovieInfo = () => {
      setMovieInfo(null);
    };


	return (
    <div className='body'>
			{movieInfo === null ? (
      <Center h='lg'>
				<VStack height='max'>
					<Card shadow='dark-lg' maxW='sm'>
						<CardBody>
							<Center>
								<Stack direction={['column']}>
									<Heading padding={4}>
                    Movie Discovery App
                  </Heading>
                  <Center>
                  <Stack>
                    <Center>
                      <Button Button className='towatch' colorScheme='blue' width={44}><Link to='/Watchlist'>View Watchlist</Link></Button>
                    </Center>
                    <Center>
                      <Menu>
                        <MenuButton width={40} as={Button}>
                          Select Movie List
                        </MenuButton>
                        <MenuList>
                          <MenuItem onClick={() => setMovieList('top_boxoffice_200')}>Top Box Office 200</MenuItem>
                          <MenuItem onClick={() => setMovieList('top_rated_series_250')}>Top Rated Series 250</MenuItem>
                          {/* <MenuItem onClick={() => setMovieList('top_rated_250')}>Top Rated 250</MenuItem> */}
                          {/* <MenuItem onClick={() => setMovieList('top_boxoffice_last_weekend_10')}>Top Box Office Last Weekend 10</MenuItem> */}
                          <MenuItem onClick={() => setMovieList('top_rated_english_250')}>Top Rated English 250</MenuItem>
                          <MenuItem onClick={() => setMovieList('most_pop_movies')}>Most Popular Movies</MenuItem>
                          <MenuItem onClick={() => setMovieList('most_pop_series')}>Most Popular Series</MenuItem>
                          <MenuItem onClick={() => setMovieList('top_rated_lowest_100')}>Top Rated Lowest 100</MenuItem>
                        </MenuList>
                      </Menu>
                    </Center>
                  </Stack>
                  </Center>
									<Button size="lg" color="black" onClick={findMovie}>
                    Find a Movie!
                  </Button>
								</Stack>
							</Center>
						</CardBody>
					</Card>
				</VStack>
			</Center>) : 
      (<SimpleSlider movieInfo={movieInfo} resetMovieInfo={resetMovieInfo}></SimpleSlider>)
      }
      
    </div>
  )
}

export default DisplayMovies
