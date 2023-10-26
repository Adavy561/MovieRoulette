import { React, Component } from 'react';
import MovieCard from './MovieCard';
import EndSlide from './EndSlide';
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
  Link,
	Skeleton
} from '@chakra-ui/react';
import './MovieCard.css'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { EffectCoverflow, Navigation } from 'swiper/modules';


export default class SimpleSlider extends Component {
	render() {
	const { movieInfo, resetMovieInfo } = this.props;
	  const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	  };

	  return (
			<>
				<Swiper
					effect={'coverflow'}
					grabCursor={true}
					centeredSlides={true}
					slidesPerView={'3'}
					coverflowEffect={{
						rotate: 50,
						stretch: 0,
						depth: 100,
						modifier: 1,
						slideShadows: false,
					}}
					navigation={false}
					modules={[EffectCoverflow, Navigation]}
					className="mySwiper"
				>
					{movieInfo !== null &&
						movieInfo.map((movie, index) => (
						<SwiperSlide key={index}>
								<MovieCard movieInfo={movie} />
						</SwiperSlide>
					))}
					{movieInfo !== null &&
					<SwiperSlide>
						<EndSlide resetSlides={resetMovieInfo}/>
					</SwiperSlide>
					}
				</Swiper>
			</>
	  );
	}
}