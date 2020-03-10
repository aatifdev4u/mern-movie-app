import React, { useEffect, useState } from 'react';
import MainImage from '../LandingPage/sections/MainMovieImage';
import { IMAGE_BASE_URL, API_KEY, API_URL} from '../../Config';
import { Button, Descriptions, Row, Col } from 'antd';
import GridCard from "../LandingPage/sections/GridCard";
import MovieInfo from './MovieInfo';
import Favorite from './Favorite';


function MovieDetailPage(props){
    const movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    const [Casts, setCast] = useState([]);
    const [LoadingForMovie, setLoadingForMovie] = useState(true);
    const [LoadingForCast, setLoadingForCast] = useState(true);
    const userId = localStorage.getItem('userId');
    console.log('userId: ' + userId);


    useEffect(()=>{
        // endpoint to get movie details Info
        let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        fetch(endpointForMovieInfo)
            .then(result => result.json())
            .then(result => {
                console.log(result);
                setMovie(result);
                setLoadingForMovie(false);

                // endpoint to get all casts for respective movie
                let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
                fetch(endpointForCasts)
                    .then(result => result.json())
                    .then(result => {
                        console.log(result);
                        setCast(result.cast)
                        setLoadingForCast(false)
                    })
            })
            .catch(err => console.log('Error: ', err))

    }, [])

    const toggleActorView = ()=>{
        setActorToggle(!ActorToggle)
    }

    return (
        <div style={{ width: '100%', margin: '0' }}>
            <MainImage 
            image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
            title={Movie.original_title}
            text={Movie.overview}
            />

            {/* Body */}
            <div style={{ width: '85%' , margin: '0'}}>
                {/* <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button>Favoutite</Button>
                </div> */}

                <Favorite
                    userFrom={localStorage.getItem('userId')}
                    movieInfo = {Movie}
                    movieId={movieId}
                />

                <MovieInfo Movie={Movie} />

                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <Button onClick={toggleActorView}>Toggle Actor view</Button>
                </div>

                {
                    ActorToggle && 
                        <Row gutter={[16, 16]}>
                        {
                            !LoadingForCast ? Casts.map((cast, index)=>(
                                cast.profile_path &&
                                <GridCard
                                actor 
                                image={cast.profile_path}
                                chracterName={cast.characterName}
                                />
                            )) : <div>loading...</div>
                        }
                    </Row>
                }

               

            </div>
        </div>
    )
}

export default MovieDetailPage;