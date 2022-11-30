import React from 'react';
import './main-route.css';
import BoardItem from './board-item';
import { Header } from '../site-parts/header';

function MainRoute() {
  return (
    <div className='main-page'>
      <Header />
      <BoardItem title='Work' description='its working' id='jkjk'/>
    </div>
  )
}

export default MainRoute;
