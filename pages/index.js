import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import { wrapper } from '../store';

import Home from '../src/layout/Home';

const Index = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(startClock())
  // }, [dispatch])

  return <Home />;
};

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//   store.dispatch(tickClock(false))

//   if (!store.getState().placeholderData) {
//     store.dispatch(loadData())
//     store.dispatch(END)
//   }

//   await store.sagaTask.toPromise()
// })

export default Index;
