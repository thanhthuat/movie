import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';

// import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import alert from '../../components/Loading/arlert';

const VideoList = props => {
    const router = useRouter();
    const {category} = router;

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            try {
                const res = await tmdbApi.getVideos('movie', props.id);
            setVideos(res.results.slice(0, 1));
            } catch (error) {
                alert('error',"An error occurred see in network")
            }
            
        }
        getVideos();
    }, [category, props.id]);

    return (
        <>
            {
                videos.map((item, i) => (
                    <Video key={i} item={item}/>
                ))
            }
        </>
    );
}

const Video = props => {

    const item = props.item;

    const iframeRef = useRef(null);

    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
        iframeRef.current.setAttribute('height', height);
    }, []);

    return (
        <div className="video">
            <div className="video__title">
                <h2>{item.name}</h2>
            </div>
            <iframe
                src={`https://www.youtube.com/embed/${item.key}`}
                ref={iframeRef}
                width="100%"
                title="video"
            ></iframe>
        </div>
    )
}

export default VideoList;
