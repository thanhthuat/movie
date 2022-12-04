import React from 'react';

import PageHeader from '../components/page-header/PageHeader';
import { category as cate } from '../api/tmdbApi';
import MovieGrid from '../components/movie-grid/MovieGrid';
import { useRouter } from 'next/router';
import Header from '../components/header/Header';

const Catalog = () => {
    const router = useRouter();
    const { pathname } = router;
  let check =  pathname.search('movie') 
    return (
        <>
         <Header/>
            {/* <PageHeader>
                {pathname.replace("/",'') === cate.movie ? 'Movies' : 'TV Series'}
            </PageHeader> */}
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={check !==-1 ?'movie':'tv'}/>
                </div>
            </div>
        </>
    );
}

export default Catalog;
