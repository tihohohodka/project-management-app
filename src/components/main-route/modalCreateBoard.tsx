import React from 'react';
import { createBoardAsync, useAppDispatch, useAppSelector } from '../../globalStore/globalStore';
import { modalCrUpdBrdTitleChange, modalCrUpdBrdDescChange, modalviewChange } from '../../globalStore/boardsState';
import closePicture from '../../pictures/close-win.png';
import './modalCreateUpdateBoard.css'


function ModalCreateBoard(){
  const { modalCrUpdBrdTitleVal, modalCrUpdBrdDescVal } = useAppSelector(state => state.BoardsContainer);
  const dispatch = useAppDispatch();
  const [isWrongTitle, isWrongTitleChange] = React.useState(<div></div>);
  const [isWrongDesc, isWrongDescChange] = React.useState(<div></div>);

  let noBreakCreatingBoard = true;
  function clickButtonCreateBrd(evt: Event){
    evt.preventDefault();
    if(modalCrUpdBrdTitleVal.length > 8 || modalCrUpdBrdTitleVal.length == 0 ) {
      isWrongTitleChange(<div><span className='reject'>Please enter no more than 8 characters</span></div>)
      noBreakCreatingBoard = false;
    } else {
      isWrongTitleChange(<div></div>)
    }
    if(modalCrUpdBrdDescVal.length > 25 || modalCrUpdBrdDescVal.length == 0) {
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
    <>
      <div className='dark-screen' onClick={() => dispatch(modalviewChange(''))}></div>
      <div className="modal-cr-upd-board">
        <img alt="close picture" src={closePicture} onClick={() => dispatch(modalviewChange(''))}></img>
        <h3>Creating Board</h3>
        <form>
          <label htmlFor='title-form'>Enter title(!no more than 8 characters)</label>
          <input
              id='title-from'
              placeholder='Title'
              value={modalCrUpdBrdTitleVal}
              onChange={(e) => dispatch(modalCrUpdBrdTitleChange(e.target.value))}
          ></input>
          {isWrongTitle}
          <label htmlFor='description-form'>Enter description(!no more than 25 characters)</label>
          <textarea
            id='description-from'
            placeholder='Description'
            value={modalCrUpdBrdDescVal}
            onChange={(e) => dispatch(modalCrUpdBrdDescChange(e.target.value))}
            cols={20}
            rows={2}
          ></textarea>
          {isWrongDesc}
        </form>
        <button className="create-cr-upd-button" onClick={clickButtonCreateBrd as unknown as React.MouseEventHandler<HTMLButtonElement>}>Create board</button>
      </div>
    </>
  )
}

export default ModalCreateBoard;
