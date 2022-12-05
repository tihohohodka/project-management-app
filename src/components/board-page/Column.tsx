import React, { useEffect, useState } from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import { styled } from "../stitches.config";
import "../signIn-signUp/signIn-signUp.css";

export interface TaskProps {
  boardId: string;
  columnId: string;
  text: string;
  order: 0;
  title: string;
  userId: string;
  users: [];
  _id: string;
}
interface ColumnProps {
  col: {
    id: string;
    list: TaskProps[];
    title: string;
  };
}

const StyledColumn = styled("div", {
  padding: "24px 0",
  display: "flex",
  flexDirection: "column",
  marginTop: 8,
  h2: {
    margin: 0,
    padding: "0 16px",
  },
});

const StyledList = styled("div", {
  backgroundColor: "#ddd",
  borderRadius: 8,
  padding: 16,
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  marginTop: 8,
  width: "250px",
});

export const Column: React.FC<ColumnProps> = ({ col: { list, id, title } }) => {
  const [modal, setModal] = useState(false);
  function deleteColumnHandler() {
    setModal(true);
  }
  function notSure() {
    setModal(false);
  }
  let boardId: string = "6389245c387211d70eef2af5";
  async function deleteColumn(id: string) {
    document.getElementById(id)!.remove();
    try {
      await fetch(
        `https://kanban-server-production.up.railway.app/boards/${boardId}/columns/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    console.log(list);
  });

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <StyledColumn id={id}>
          <h2>{title}</h2>
          <StyledList {...provided.droppableProps} ref={provided.innerRef}>
            {list[0] &&
              list.map((task, index) => (
                <Task
                  key={task._id}
                  text={task.text}
                  index={index}
                  _id={task._id}
                  boardId={task.boardId}
                  columnId={task.columnId}
                  order={task.order}
                  title={task.title}
                  userId={task.userId}
                  users={task.users}
                />
              ))}
            {provided.placeholder}
            {modal && (
              <div className="modal-window">
                <p>Вы уверены, что хотите удалить колонку?</p>
                <div className="modal-button-holder">
                  <button
                    onClick={() => {
                      deleteColumn(id);
                    }}
                  >
                    Да
                  </button>
                  <button onClick={notSure}>Нет</button>
                </div>
              </div>
            )}
          </StyledList>

          <button onClick={deleteColumnHandler}>Delete Column</button>
        </StyledColumn>
      )}
    </Droppable>
  );
};
