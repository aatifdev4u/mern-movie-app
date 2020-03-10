import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';

function Favorite(props){
    const user = useSelector(state => state.user)
    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);
    const { userFrom, movieId, movieInfo } =props;
    const { title, backdrop_path, runtime } = movieInfo;
    
    const variable = {
        userFrom,
        movieId,
        movieTitle: title,
        moviePost: backdrop_path,
        movieRunTime: runtime
    }

   useEffect(()=>{
    //    Api to get the total count user who has mark favorite this movie
        Axios.post('/api/favorite/favoriteNumber', variable)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(response.data.subscriberNumber)
                }else{
                    alert('Failed to get favorite Number')
                }
            })

    // Api to verify whether the current user has marked this movie as favorite or not
    Axios.post('/api/favorite/favorited', variable)
            .then(response => {
                if(response.data.success){
                    setFavorited(response.data.subscribed)
                }else{
                    alert('Failed to get favorite Information')
                }
            })


    }, [])

    const onCLickFavorite = ()=>{
        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }

        if(Favorited){
            // when we are already subscribed then remove
            Axios.post('/api/favorite/removeFromFavorite', variable)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber - 1)
                    setFavorited(!Favorited)
                }else{
                    alert('Failed to get favorite Information')
                }
            })
        }else{
            // when we not subscribed yet
            Axios.post('/api/favorite/addToFavorite', variable)
            .then(response => {
                if(response.data.success){
                    setFavorited(!Favorited)
                    setFavoriteNumber(FavoriteNumber + 1)
                }else{
                    alert('Failed to add favorite ')
                }
            })
        }
    }

    return(
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button onClick={onCLickFavorite}>{!Favorited ? "Add to favourite" : "Not Favorite"} {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite;