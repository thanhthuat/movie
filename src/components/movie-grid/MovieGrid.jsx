import React, { useState, useEffect, useCallback } from 'react';
// import { useHistory, useParams } from 'react-router';



import MovieCard from '../movie-card/MovieCard';
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/Input'

import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import { useRouter } from 'next/router';
import LoadingFullScreen from '../Loading/LoadingFullScreen';

const MovieGrid = props => {
    const router = useRouter();
    const [items, setItems] = useState([]);
    const [loading,setLoading] =useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const { keyword } = router?.query;

    useEffect(() => {
        const getList = async () => {
            try {
                let response = null;
                setLoading(true);
                if (keyword === undefined) {
                    const params = {};
                    switch(props.category) {
                        case category.movie:
                            response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
                            break;
                        default:
                            response = await tmdbApi.getTvList(tvType.popular, {params});
                    }
                } else {
                    const params = {
                        query: keyword ||''
                    }
                    response = await tmdbApi.search('movie', {params});
                }
                setLoading(false);
                setItems(response.results);
                setTotalPage(response.total_pages);
            }
            catch (error) {
                alert('error',"An error occurred see in network")
            }
        }
        getList();
    }, [props.category, keyword]);

    const loadMore = async () => {
        try {
            let response = null;
        setLoading(true);
        if (keyword === undefined) {
            const params = {
                page: page + 1
            };
            switch(props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular, {params});
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword
            }
            response = await tmdbApi.search(props.category, {params});
        }
        setLoading(false);
        setItems([...items, ...response.results]);
        setPage(page + 1);
        } catch (error) {
            alert('error',"An error occurred see in network")
        }
        
    }

    return (
        <>
            <div className="section mb-3  mt-5">
                <MovieSearch category={props.category} keyword={keyword}/>
            </div>
            {loading ? <LoadingFullScreen/> : <>
            <div className="movie-grid">
                {
                    items.map((item, i) => <MovieCard category={props.category} item={item} key={i}/>)
                }
                {keyword && items.length ===0 && <h1> Not found</h1> }
            </div>
            {
                page < totalPage ? (
                    <div className="movie-grid__loadmore">
                        <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
                    </div>
                ) : null
            }
            </>}
            
        </>
    );
}

const MovieSearch = props => {

    const history =useRouter() ;

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                history.push(`/${props.category}/search/${props.category}?keyword=${keyword}`);
            }
        },
        [keyword, props.category, history]
    );

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        }
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch]);

    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={goToSearch}>Search</Button>
        </div>
    )
}

export default MovieGrid;
