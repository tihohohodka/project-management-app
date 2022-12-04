import React from 'react';
import './main-route.css';
import BoardItem from './board-item';
import { Header } from '../site-parts/header';
import BoardContainer from './board-container';
import { Footer } from '../site-parts/footer';
import ModalCreateBoard from './modalCreateBoard';
import { useAppSelector } from '../../globalStore/globalStore';
// import { BoardContainerChange } from '../../globalStore/globalStore';

function MainRoute() {
  const { modalview } = useAppSelector((state) => state.BoardsContainer);
  function changeModalView(){
    if(modalview == 'create'){
       return <ModalCreateBoard />;
    }
    else{
      return null;
    }
  }
  return (
    <div className='main-page'>
      {changeModalView()}
      <Header />
      <BoardContainer />
      <Footer />
    </div>
  )
}

export default MainRoute;
