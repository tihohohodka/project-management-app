import React from 'react';
import { modalviewChange } from '../../globalStore/boardsState';
import { useAppDispatch, deleteBoardAsync } from '../../globalStore/globalStore';
import closePicture from '../../pictures/close-win.png';
import './modalDeleteBoard.css';

function ModalDeleteBoard() {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className='dark-screen' onClick={() => dispatch(modalviewChange(''))}></div>
      <div className="modal-delete-board">
        <img alt="close picture" src={closePicture} onClick={() => dispatch(modalviewChange(''))}></img>
        <h3>Delete board ?</h3>
        <div className='delete-cancel-board'>
          <button className="delete-cnacel-button" onClick={deleteBoardAsync as unknown as React.MouseEventHandler<HTMLButtonElement>}>Delete</button>
          <button className="delete-cnacel-button" onClick={() => dispatch(modalviewChange(''))}>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default ModalDeleteBoard;
