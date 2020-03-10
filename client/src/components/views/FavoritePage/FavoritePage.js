import React, { useEffect, useState } from 'react';
import './favoritePage.css';
import { defaultFormat } from 'moment';
import Axios from 'axios';
import { IMAGE_BASE_URL, POSTER_SIZE} from '../../Config';
import { Typography, Button, Popover } from 'antd'
const { Title } = Typography;



function FavoritePage(props){
    const [Favorite, setFavorite] = useState([]);
    const [FavoriteLoading, setFavoriteLoading] = useState(true);
    const userId = localStorage.getItem('userId');

    let payload = { userFrom : userId};

    useEffect(()=>{
        fetchFavoritePage();
    }, [])

    const fetchFavoritePage = ()=>{
        Axios.post('/api/favorite/getFavoriteMovie', payload)
            .then(response => {
                if(response.data.success){
                    console.log(response.data.favorites);
                    setFavorite(response.data.favorites)
                    setFavoriteLoading(false)
                }else{
                    alert('Failed to get subscription video')
                }
            })
    } 

    const removeFavorite = (movieId, userFrom)=>{
        let payload = {
            movieId,
            userFrom
        };

        Axios.post('/api/favorite/removeFromFavorite', payload)
            .then(response => {
                if(response.data.success){
                    fetchFavoritePage()
                }else{
                    alert('Failed to remove from favorite')
                }
            })
    }

    const renderItem = Favorite && Favorite.map((movie, index)=>{
        const content = (
            <div>
                {movie.moviePost ?
                    <img src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.moviePost}`} />
                    : "no image"}
            </div>
        ); 

        return <tr key={index}>
            <Popover content={content} title={`${movie.movieTitle}`}>
                <td>{movie.movieTitle}</td>
            </Popover>
            
            <td>{movie.movieRunTime}</td>
            <td><Button onClick={()=>removeFavorite(movie.movieId, movie.userFrom)}>Remove</Button></td>
        </tr>
    })

    return(
        <div style={{ width: '85%', margin: '3rem auto'}}>
            <Title>Favorite Movies By me</Title>
            <hr/>
            <table>
                <thead>
                    <th>Movie Title</th>
                    <th>Movie RunTime</th>
                    <th>Remove from favorites</th>
                </thead>
                <tbody>
                    {renderItem}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage;
