import React from "react";
import { Link } from "react-router-dom";
import { modalviewChange } from "../../globalStore/boardsState";
import { useAppDispatch, useAppSelector } from "../../globalStore/globalStore";
import { idBoardChange } from "../../globalStore/idClickedBoardState";
import "./board-item.css";

interface boardItem {
  title: string;
  description: string;
  id: string;
}

function BoardItem(props: boardItem) {
  const dispatch = useAppDispatch();
  const reduxLang = useAppSelector((state) => state.lang);
  return (
    <div className="bord-item-with-buttons">
      <Link to="/Board" onClick={() => dispatch(idBoardChange(props.id))}>
        <div className="board-item" id={props.id}>
          <h3 className="title-board">{props.title}</h3>
          {reduxLang.lang === "English" && (
            <p className="desc-sign-board">Description:</p>
          )}
          {reduxLang.lang === "Russian" && (
            <p className="desc-sign-board">Описание:</p>
          )}
          <p className="description-board">{props.description}</p>
        </div>
      </Link>

      <div className="delete-update-boards">
        <button
          className="delete-board"
          onClick={() => {
            dispatch(modalviewChange("delete"));
            dispatch(idBoardChange(props.id));
          }}
        >
          Delete
        </button>
        <button
          className="update-board"
          onClick={() => {
            dispatch(modalviewChange("update"));
            dispatch(idBoardChange(props.id));
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default BoardItem;
