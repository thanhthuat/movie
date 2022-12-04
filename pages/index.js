import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import { wrapper } from '../store';

import Home from '../src/layout/Home';

const Index = () => {
  const dispatch = useDispatch();


  return <Home />;
};

export default Index;
