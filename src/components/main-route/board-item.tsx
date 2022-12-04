import React from 'react';
import { modalviewChange } from '../../globalStore/boardsState';
import { useAppDispatch } from '../../globalStore/globalStore';
import { idBoardChange } from '../../globalStore/idClickedBoardState';
import './board-item.css';

interface boardItem {
  title: string;
  description: string;
  id: string;
}

function BoardItem(props: boardItem){
  const dispatch = useAppDispatch();
  return (
    <div className="bord-item-with-buttons">
      <div className='board-item' id={props.id}>
        <h3 className="title-board">{props.title}</h3>
        <p className="desc-sign-board">Description:</p><p className="description-board">{props.description}</p>
      </div>
      <div className="delete-update-boards">
        <button className='delete-board' onClick={() => {
          dispatch(modalviewChange('delete'));
          dispatch(idBoardChange(props.id));
        } }>Delete</button>
        <button className='update-board' onClick={() => {
          dispatch(modalviewChange('update'));
          dispatch(idBoardChange(props.id));
        } }>Update</button>
      </div>
    </div>
  );
}

export default BoardItem;
