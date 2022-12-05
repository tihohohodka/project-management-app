import React from 'react';
import changeBoardsInfAsync from '../../globalStore/asyncChangeBoards';
import { useAppDispatch, useAppSelector } from '../../globalStore/globalStore';
import './board-container.css';
import BoardItem from './board-item';

function BoardContainer(){
  const { boardsInf, loadingboards } = useAppSelector((state) => state.BoardsContainer);
  const dispatch = useAppDispatch();
  const emptyBoardsArr = [
    {
      title:"",
      desc:"",
      id:"",
    },
  ];

  React.useEffect(() => {
    if(JSON.stringify(boardsInf) == JSON.stringify(emptyBoardsArr)){
      dispatch(changeBoardsInfAsync())
    }
  }, []);

  return (
    <main className={ loadingboards ? "boards-container-loading": "boards-container" }>
      { loadingboards ? (
        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      ) : (
        boardsInf.map((boardsInf, index) => {
          return (
            <BoardItem
              key={boardsInf.id}
              id={boardsInf.id}
              description={boardsInf.desc}
              title={boardsInf.title}
            />
          );
        })
      )
      }
    </main>
  );
}

export default BoardContainer;
