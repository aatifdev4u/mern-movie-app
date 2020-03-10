import React from 'react';
import { Card, Avatar, Col, Typography, Row } from 'antd';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../../Config'

function GridCard(props){
    const { 
        actor,
        key,
        image,
        chracterName,
        movieId,
        movieName
    } = props;

    const POSTER_SIZE = "w154";


    if(props.actor){
        return(
            <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative'}}>
                <img
                    style={{ width: '100%', height: '320px'}}
                    alt={chracterName}
                    src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`}
                />
            </div>
        </Col>
        )
    }else {
        return(
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative'}}>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{ width: '100%', height: '320px'}} alt src={image}/>
                    </a>
                </div>
            </Col>
        )
    }
    
}

export default GridCard;