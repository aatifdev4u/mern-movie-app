import React, {useEffect, useState, useRef} from 'react'
import { FaCode } from "react-icons/fa";
import {API_KEY, API_URL, IMAGE_BASE_URL, POSTER_SIZE } from '../../Config';
import { Typography, Row, Button } from 'antd';
import MainImage from './sections/MainMovieImage';
import GridCard from './sections/GridCard';
const { Title } = Typography;

function LandingPage() {
    const buttonRef = useRef(null); 
    const [Movies, setMovies] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [CurrentPage, setCurrentPage] = useState(0);


    useEffect(()=>{
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint);

    }, [])

    const fetchMovies = (endpoint)=>{
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setMovies([...Movies, ...response.results]);
                setCurrentPage(response.page);
            })
    }

    const loadMoreItems = ()=>{
        console.log('Load more items has been called');
        let endpoint = '';
        endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);
    }

    return (
        <div style={{ width: '100%', margin: '0' }}>
            {
              Movies[0] && 
              <MainImage 
              image={`${IMAGE_BASE_URL}w1280${Movies[0].backdrop_path}`}
              title={Movies[0].original_title}
              text={Movies[0].overview}
              />
            }

            <div style={{ width: '85%', margin: '1rem auto' }}>

            <Title level={2} > Movies by latest </Title>
            <hr />
            <Row gutter={[16, 16]}>
                {Movies && Movies.map((movie, index) => (
                    <React.Fragment key={index}>
                        <GridCard
                            image={movie.poster_path ?
                                `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                : null}
                            movieId={movie.id}
                            movieName={movie.original_title}
                        />
                    </React.Fragment>
                ))}
            </Row>

            {Loading &&
                <div>Loading...</div>}

            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button ref={buttonRef} className="loadMore" onClick={loadMoreItems}>Load More</button>
            </div>
            </div>
        </div>
    )
}

export default LandingPage
