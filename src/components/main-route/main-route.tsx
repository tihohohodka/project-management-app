import React from 'react';
import './main-route.css';
import BoardItem from './board-item';
import { Header } from '../site-parts/header';
import BoardContainer from './board-container';
import { Footer } from '../site-parts/footer';
// import { BoardContainerChange } from '../../globalStore/globalStore';

function MainRoute() {
  // React.useEffect(() => {
  //   BoardContainerChange();
  // }, [])
  return (
    <div className='main-page'>
      <Header />
      <BoardContainer />
      <Footer />
    </div>
  )
}

export default MainRoute;
