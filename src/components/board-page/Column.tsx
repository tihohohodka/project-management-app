import React, { useEffect, useState } from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import { styled } from "../stitches.config";
import "../signIn-signUp/signIn-signUp.css";
import { setTimeout } from "timers/promises";

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
  padding: "0px 0",
  display: "flex",
  flexDirection: "column",
  marginTop: 0,
  h2: {
    margin: 0,
    padding: "0 20px",
  },
});

const StyledList = styled("div", {
  backgroundColor: "#ddd",
  borderRadius: 8,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  marginTop: 8,
  width: "250px",
  height: "280px",
});

export const Column: React.FC<ColumnProps> = ({ col: { list, id, title } }) => {
  const [modal, setModal] = useState(false);
  const [titleColumn, setTitleColumn] = useState(title);
  const [titleChange, setTitleChange] = useState(false);
  function deleteColumnHandler() {
    setModal(true);
  }
  function notSure() {
    setModal(false);
  }
  let boardId: string = "6389245c387211d70eef2af5";
  async function deleteColumn(id: string) {
    document.getElementById(id)!.remove();
    document.getElementById(id + "btn")!.remove();
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
          <div className="column-title">
            {titleChange ? (
              <div className="edit-title">
                <input type="text" className="title-input" id="asd"></input>
                <div
                  className="exit-btn"
                  onClick={() => {
                    const input = document.querySelector(
                      "#" + "asd"
                    ) as HTMLInputElement;
                    setTitleColumn(input.value);
                    setTitleChange(false);
                  }}
                >
                  ✓
                </div>
                <div
                  className="exit-btn"
                  onClick={async () => {
                    console.log("exit");
                    setTitleChange(false);

                    try {
                      const bodyRequest = { title: titleColumn, order: 0 };
                      await fetch(
                        `https://kanban-server-production.up.railway.app/boards/${boardId}/columns/${id}`,
                        {
                          method: "PUT",
                          headers: {
                            Authorization:
                              "Bearer " + localStorage.getItem("token"),
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(bodyRequest),
                        }
                      );
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                >
                  ×
                </div>
              </div>
            ) : (
              <h2
                onClick={() => {
                  setTitleChange(true);
                }}
              >
                {titleColumn}
              </h2>
            )}
          </div>
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
