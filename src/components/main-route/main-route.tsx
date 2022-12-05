import React from 'react';
import './main-route.css';
import BoardItem from './board-item';
import { Header } from '../site-parts/header';
import BoardContainer from './board-container';
import { Footer } from '../site-parts/footer';
import ModalCreateBoard from './modalCreateBoard';
import { useAppSelector } from '../../globalStore/globalStore';
import ModalUpdateBoard from './modalUpdateBoard';
import ModalDeleteBoard from './modalDeleteBoard';
// import { BoardContainerChange } from '../../globalStore/globalStore';

function MainRoute() {
  const { modalview } = useAppSelector((state) => state.BoardsContainer);
  function changeModalView(){
    if(modalview == 'create'){
       return <ModalCreateBoard />;
    }
    else if(modalview == 'update'){
      return <ModalUpdateBoard />;
    }
    else if(modalview == 'delete'){
      return <ModalDeleteBoard />;
    }
    else{
      return null;
    }
  }
  return (
    <div className='main-page'>
      {changeModalView()}
      <Header />
      <h2>Boards</h2>
      <BoardContainer />
      <Footer />
    </div>
  )
}

export default MainRoute;
