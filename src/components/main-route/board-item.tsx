import React from 'react';
import './board-item.css';

interface boardItem {
  title: string;
  description: string;
  id: string;
}

function BoardItem(props: boardItem){
  return (
    <div className='board-item' id={props.id}>
      <h3 className="title-board">{props.title}</h3>
      <p className="description-board"><span className="desc-sign-board">Description:<br></br>{props.description}</span></p>
    </div>
  );
}

export default BoardItem;
