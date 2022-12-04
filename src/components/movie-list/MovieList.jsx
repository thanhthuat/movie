import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';



import { SwiperSlide, Swiper } from 'swiper/react';
import Link from 'next/link'

import Button from '../button/Button';

import tmdbApi, { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import MovieCard from '../movie-card/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieList, getSimilarList, getTvList } from '../../redux/actions';
import alert from '../Loading/arlert';

const MovieList = props => {
    const dispatch = useDispatch();
    const {loading }= useSelector((state)=>state.getMovieList)

    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            try {
                let response = null;
                const params = {};
                let payload ={type:props.type, params:{}}
                if (props.type !== 'similar') {
                  
                    switch(props.category) {
                        case category.movie:
                            dispatch(getMovieList(payload,(status,res)=>{   
                                if(status){
                                  setItems(res);
                                }
                              
                               }));
                            break;
                        default:
                            dispatch(getTvList(payload,(status,res)=>{
                               
                                if(status){
                                  setItems(res);
                                }
                            }));
                    }
                } else {
                    dispatch(getSimilarList({type:props.category,params: props.id},(status,res)=>{ 
                        
                        if(status){
                          setItems(res);
                        }
                      }));
                }
                
            } catch (error) {
                setItems([]);
                alert('error',"An error occurred see in network")
            }
           
          
           
        }
        
      
       
       getList();
    }, []);

    return (
        <div className="movie-list">
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {
                    items.map((item, i) => (
                        <SwiperSlide key={i}>
                            <MovieCard item={item} category={props.category}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default MovieList;
