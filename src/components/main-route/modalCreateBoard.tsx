import React from "react";
import {
  createBoardAsync,
  useAppDispatch,
  useAppSelector,
} from "../../globalStore/globalStore";
import {
  modalCrUpdBrdTitleChange,
  modalCrUpdBrdDescChange,
  modalviewChange,
} from "../../globalStore/boardsState";
import closePicture from "../../pictures/close-win.png";
import "./modalCreateUpdateBoard.css";

function ModalCreateBoard() {
  const { modalCrUpdBrdTitleVal, modalCrUpdBrdDescVal } = useAppSelector(
    (state) => state.BoardsContainer
  );
  const dispatch = useAppDispatch();
  const [isWrongTitle, isWrongTitleChange] = React.useState(<div></div>);
  const [isWrongDesc, isWrongDescChange] = React.useState(<div></div>);
  const reduxLang = useAppSelector((state) => state.lang);
  let noBreakCreatingBoard = true;
  function clickButtonCreateBrd(evt: Event) {
    evt.preventDefault();
    if (modalCrUpdBrdTitleVal.length > 8 || modalCrUpdBrdTitleVal.length == 0) {
      isWrongTitleChange(
        <div>
          {reduxLang.lang === "English" && (
            <span className="reject">
              Please enter no more than 8 characters
            </span>
          )}
          {reduxLang.lang === "Russian" && (
            <span className="reject">Введите не больше 8 символов</span>
          )}
        </div>
      );
      noBreakCreatingBoard = false;
    } else {
      isWrongTitleChange(<div></div>);
    }
    if (modalCrUpdBrdDescVal.length > 25 || modalCrUpdBrdDescVal.length == 0) {
      isWrongDescChange(
        <div>
          {reduxLang.lang === "English" && (
            <span className="reject">
              Please enter no more than 8 characters
            </span>
          )}
          {reduxLang.lang === "Russian" && (
            <span className="reject">Введите не больше 8 символов</span>
          )}
        </div>
      );
      noBreakCreatingBoard = false;
    } else {
      isWrongDescChange(<div></div>);
    }
    if (noBreakCreatingBoard) {
      createBoardAsync();
    }
  }
  return (
    <>
      <div
        className="dark-screen"
        onClick={() => dispatch(modalviewChange(""))}
      ></div>
      <div className="modal-cr-upd-board">
        <img
          alt="close picture"
          src={closePicture}
          onClick={() => dispatch(modalviewChange(""))}
        ></img>
        {reduxLang.lang === "English" && <h3>Creating Board</h3>}
        {reduxLang.lang === "Russian" && <h3>Создание доски</h3>}
        <form>
          {reduxLang.lang === "English" && (
            <label htmlFor="title-form">
              Enter title(!no more than 8 characters)
            </label>
          )}
          {reduxLang.lang === "Russian" && (
            <label htmlFor="title-form">
              Введите название (!не более 8 символов)
            </label>
          )}
          <input
            id="title-from"
            placeholder="Title"
            value={modalCrUpdBrdTitleVal}
            onChange={(e) => dispatch(modalCrUpdBrdTitleChange(e.target.value))}
          ></input>
          {isWrongTitle}
          {reduxLang.lang === "English" && (
            <label htmlFor="description-form">
              Enter description(!no more than 25 characters)
            </label>
          )}
          {reduxLang.lang === "Russian" && (
            <label htmlFor="description-form">
              Введите описание(!не более 25 символов)
            </label>
          )}
          <textarea
            id="description-from"
            placeholder="Description"
            value={modalCrUpdBrdDescVal}
            onChange={(e) => dispatch(modalCrUpdBrdDescChange(e.target.value))}
            cols={20}
            rows={2}
          ></textarea>
          {isWrongDesc}
        </form>
        {reduxLang.lang === "English" && (
          <button
            className="create-cr-upd-button"
            onClick={
              clickButtonCreateBrd as unknown as React.MouseEventHandler<HTMLButtonElement>
            }
          >
            Create board
          </button>
        )}
        {reduxLang.lang === "Russian" && (
          <button
            className="create-cr-upd-button"
            onClick={
              clickButtonCreateBrd as unknown as React.MouseEventHandler<HTMLButtonElement>
            }
          >
            Создать доску
          </button>
        )}
      </div>
    </>
  );
}

export default ModalCreateBoard;
