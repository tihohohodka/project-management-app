import React from "react";
import { modalviewChange } from "../../globalStore/boardsState";
import {
  useAppDispatch,
  deleteBoardAsync,
  useAppSelector,
} from "../../globalStore/globalStore";
import closePicture from "../../pictures/close-win.png";
import "./modalDeleteBoard.css";

function ModalDeleteBoard() {
  const reduxLang = useAppSelector((state) => state.lang);
  const dispatch = useAppDispatch();
  return (
    <>
      <div
        className="dark-screen"
        onClick={() => dispatch(modalviewChange(""))}
      ></div>
      <div className="modal-delete-board">
        <img
          alt="close picture"
          src={closePicture}
          onClick={() => dispatch(modalviewChange(""))}
        ></img>
        {reduxLang.lang === "English" && <h3>Delete board ?</h3>}
        {reduxLang.lang === "Russian" && <h3>Удалить доску ?</h3>}
        <div className="delete-cancel-board">
          {reduxLang.lang === "English" && (
            <button
              className="delete-cnacel-button"
              onClick={
                deleteBoardAsync as unknown as React.MouseEventHandler<HTMLButtonElement>
              }
            >
              Delete
            </button>
          )}
          {reduxLang.lang === "English" && (
            <button
              className="delete-cnacel-button"
              onClick={() => dispatch(modalviewChange(""))}
            >
              Cancel
            </button>
          )}
          {reduxLang.lang === "Russian" && (
            <button
              className="delete-cnacel-button"
              onClick={
                deleteBoardAsync as unknown as React.MouseEventHandler<HTMLButtonElement>
              }
            >
              Удалить
            </button>
          )}
          {reduxLang.lang === "Russian" && (
            <button
              className="delete-cnacel-button"
              onClick={() => dispatch(modalviewChange(""))}
            >
              Отмена
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default ModalDeleteBoard;
