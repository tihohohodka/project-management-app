import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { modalCrUpdBrdDescChange } from "../../globalStore/boardsState";
import { styled } from "../stitches.config";
import { useAppSelector, useAppDispatch } from "../../globalStore/globalStore";
interface TaskProps {
  boardId: string;
  columnId: string;
  text: string;
  order: 0;
  title: string;
  userId: string;
  users: [];
  _id: string;
  index: number;
}

const StyledItem = styled("div", {
  backgroundColor: "#eee",
  borderRadius: 4,
  padding: "4px 8px",
  transition: "background-color .8s ease-out",
  marginTop: 8,
  display: "flex",
  justifyContent: "space-between",
  ":hover": {
    backgroundColor: "#fff",
    transition: "background-color .1s ease-in",
  },
});

const Task: React.FC<TaskProps> = (a: TaskProps) => {
  const [modal, setModal] = useState(false);
  const taskLoading = useAppSelector((state) => state.taskLoading.loading);
  async function deleteTask(id: string) {
    document.getElementById(id)!.remove();
    try {
      await fetch(
        `https://kanban-server-production.up.railway.app/boards/${a.boardId}/columns/${a.columnId}/tasks/${a._id}`,
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
  return (
    <Draggable draggableId={a._id} index={a.index}>
      {(provided) =>
        taskLoading ? (
          <div>loading...</div>
        ) : (
          <StyledItem
            key={a._id + a.index}
            id={a._id}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>{a.title}</div>
            <div
              onClick={() => {
                setModal(true);
              }}
            >
              ×
            </div>
            {modal && (
              <div className="modal-window">
                <p>Вы уверены, что хотите удалить задачу?</p>
                <div className="modal-button-holder">
                  <button
                    onClick={() => {
                      deleteTask(a._id);
                    }}
                  >
                    Да
                  </button>
                  <button
                    onClick={() => {
                      setModal(false);
                    }}
                  >
                    Нет
                  </button>
                </div>
              </div>
            )}
          </StyledItem>
        )
      }
    </Draggable>
  );
};

export default Task;
