import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

// import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';

import MovieList from '../../components/movie-list/MovieList';
import { useRouter } from 'next/router';
import Header from '../../components/header/Header';
import LoadingFullScreen from '../../components/Loading/LoadingFullScreen';
import alert from '../../components/Loading/arlert';

const Detail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [loading ,setLoading] = useState(false);
    const [item, setItem] = useState(null);

    useEffect(() => {
        const getDetail = async () => {
            try {
                setLoading(true) ;
            const response = await tmdbApi.detail('tv', id, {params:{}});
            setItem(response);
            setLoading(false) ;
            window.scrollTo(0,0);
                
            } catch (error) {
                setLoading(false) ;
                alert('error',"An error occurred")
            }
            
           
        }
        if(!!id )
        getDetail();
    }, [ id]);

    return (
        <>
         <Header/>

            { loading ?<LoadingFullScreen/>:
                item && (
                    <>
                        <div className="banner" style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
                        <div className="mb-3 movie-content container">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img" style={{backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`}}></div>
                            </div>
                            <div className="movie-content__info">
                                <h1 className="title">
                                    {item.title || item.name}
                                </h1>
                                <div className="genres">
                                    {
                                        item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                            <span key={i} className="genres__item">{genre.name}</span>
                                        ))
                                    }
                                </div>
                                <p className="overview">{item.overview}</p>
                                <div className="cast">
                                    <div className="section__header">
                                        <h2>Casts</h2>
                                    </div>
                                    <CastList id={item.id}/>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="section mb-3">
                                <VideoList id={item.id}/>
                            </div>
                            <div className="section mb-3">
                                <div className="section__header mb-2">
                                    <h2>Similar</h2>
                                </div>
                                <MovieList category={'tv' ||null} type="similar" id={item.id}/>
                            </div>
                        </div>
                    </>
                ) 
            }
        </>
    );
}

export default Detail;
