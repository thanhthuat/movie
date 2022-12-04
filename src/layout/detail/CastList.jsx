import React, { useState, useEffect } from 'react';

//import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import { useRouter } from 'next/router';
import alert from '../../components/Loading/arlert';

const CastList = props => {
    const router = useRouter() ;
    const {category} = router;

    const [casts, setCasts] = useState([]);

    useEffect(() => {
        const getCredits = async () => {
            try {
                const res = await tmdbApi.credits('movie', props.id);
            setCasts(res.cast.slice(0, 5));
            } catch (error) {
                alert('error',"An error occurred see in network")
            }
            
        }
        getCredits();
    }, [category, props.id]);
    return (
        <div className="casts">
            {
                casts.map((item, i) => (
                    <div key={i} className="casts__item">
                        <div className="casts__item__img" style={{backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`}}></div>
                        <p className="casts__item__name">{item.name}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default CastList;
