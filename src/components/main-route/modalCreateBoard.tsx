import React from 'react';
import { createBoardAsync, useAppDispatch, useAppSelector } from '../../globalStore/globalStore';
import { modalCreateBrdTitleChange, modalCreateBrdDescChange, modalviewChange } from '../../globalStore/boardsState';
import closePicture from '../../pictures/close-win.png';
import './modalCreateBoard.css'


function ModalCreateBoard(){
  const { modalCreateBrdTitleVal, modalCreateBrdDescVal } = useAppSelector(state => state.BoardsContainer);
  const dispatch = useAppDispatch();
  const [isWrongTitle, isWrongTitleChange] = React.useState(<div></div>);
  const [isWrongDesc, isWrongDescChange] = React.useState(<div></div>);

  let noBreakCreatingBoard = true;
  function clickButtonCreateBrd(evt: Event){
    evt.preventDefault();
    if(modalCreateBrdTitleVal.length > 8 || modalCreateBrdTitleVal.length == 0 ) {
      isWrongTitleChange(<div><span className='reject'>Please enter no more than 8 characters</span></div>)
      noBreakCreatingBoard = false;
    } else {
      isWrongTitleChange(<div></div>)
    }
    if(modalCreateBrdDescVal.length > 25 || modalCreateBrdDescVal.length == 0) {
      isWrongDescChange(<div><span className='reject'>Please enter no more than 25 characters</span></div>)
      noBreakCreatingBoard = false;
    } else {
      isWrongDescChange(<div></div>)
    }
    if(noBreakCreatingBoard){
      createBoardAsync();
    }
  }
  return (
    <div className='dark-screen'>
      <div className="modal-create-board">
        <img alt="close picture" src={closePicture} onClick={() => dispatch(modalviewChange(''))}></img>
        <h3>Creating Board</h3>
        <form>
          <label htmlFor='title-form'>Enter title(!no more than 8 characters)</label>
          <input
            id='title-from'
            placeholder='Title'
            value={modalCreateBrdTitleVal}
            onChange={(e) => dispatch(modalCreateBrdTitleChange(e.target.value))}
          ></input>
          {isWrongTitle}
          <label htmlFor='description-form'>Enter description(!no more than 25 characters)</label>
          <textarea
            id='description-from'
            placeholder='Description'
            value={modalCreateBrdDescVal}
            onChange={(e) => dispatch(modalCreateBrdDescChange(e.target.value))}
            cols={20}
            rows={2}
            ></textarea>
            {isWrongDesc}
        </form>
        <button className="create-board-button" onClick={clickButtonCreateBrd as unknown as React.MouseEventHandler<HTMLButtonElement>}>Create board</button>
      </div>
    </div>
    
  )
}

export default ModalCreateBoard;
