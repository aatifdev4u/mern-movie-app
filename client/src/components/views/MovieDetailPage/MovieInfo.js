import React from 'react';
import {  Descriptions} from 'antd';

function MovieInfo(props){
    const { Movie} = props;
    return(
        <Descriptions title="Movie Info" bordered>
        <Descriptions.Item label="Title">{Movie.original_title}</Descriptions.Item>
        <Descriptions.Item label="release_date">{Movie.release_date}</Descriptions.Item>
        <Descriptions.Item label="revenue">{Movie.revenue}</Descriptions.Item>
        <Descriptions.Item label="runtime">{Movie.runtime}</Descriptions.Item>
        <Descriptions.Item label="vote_average" span={2}>
        {Movie.vote_average}
        </Descriptions.Item>
        <Descriptions.Item label="vote_count">{Movie.vote_count}</Descriptions.Item>
        <Descriptions.Item label="status">{Movie.status}</Descriptions.Item>
        <Descriptions.Item label="popularity">{Movie.popularity}</Descriptions.Item>
    </Descriptions>

    )
} 

export default MovieInfo;