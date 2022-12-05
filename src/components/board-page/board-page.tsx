import React, {
  useEffect,
  ReactNode,
  useState,
  useCallback,
  Suspense,
  useRef,
} from "react";
import { useAppSelector, useAppDispatch } from "../../globalStore/globalStore";
import { Routes, Route, Link } from "react-router-dom";
import "./board-page.css";
import type { FC } from "react";
import { Column, TaskProps } from "./Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { taskLoadingChange } from "../../globalStore/taskLoading";
import { styled } from "../stitches.config";
import { listenerCancelled } from "@reduxjs/toolkit/dist/listenerMiddleware/exceptions";
import { Footer } from "../site-parts/footer";
import { Header } from "../site-parts/header";
const StyledColumns = styled("div", {
  display: "flex",
  margin: "0px 15px",
  height: "51vh",
  gap: "8px",
  overflowX: "scroll",
});

type columnType = {
  id: string;
  list: TaskProps[];
  title: string;
};
type getColumnType = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
};
export function BoardPage() {
  const [columnModal, setColumnModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [columnModalChange, setColumnModalChange] = useState(false);
  const [refresh, setRefresh] = useState(999);
  let serverColumns: getColumnType[] = [];
  const [loadingColumns, setLoadingColumns] = useState(false);
  let initialColumns: Record<string, columnType> = {};
  const input1value = useRef<HTMLInputElement>(null);
  const input2value = useRef<HTMLInputElement>(null);
  const [columns, setColumns] = useState(initialColumns);
  const boardsRedux = useAppSelector((state) => state.idClickedBoard);
  const dispatch = useAppDispatch();
  const taskLoading = useAppSelector((state) => state.taskLoading.loading);
  //let boardId: string = boardsRedux.idBoradVal;
  let boardId = "6389245c387211d70eef2af5";
  useEffect(() => {
    setLoadingColumns(true);
    setTimeout(async () => {
      try {
        const res = await fetch(
          `https://kanban-server-production.up.railway.app/boards/${boardId}/columns`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        serverColumns = await res.json();
        if (serverColumns[0]) {
          for (let i = 0; i < serverColumns.length; i++) {
            setRefresh(refresh + i);
            try {
              const res2 = await fetch(
                `https://kanban-server-production.up.railway.app/boards/${boardId}/columns/${serverColumns[i]._id}/tasks`,
                {
                  method: "GET",
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              const tasks: [] = await res2.json();

              initialColumns[serverColumns[i]._id] = {
                id: serverColumns[i]._id,
                list: tasks,
                title: serverColumns[i].title,
              };
            } catch (err) {
              console.log(err);
            }
          }
        }
        setRefresh(refresh + 1);
        setLoadingColumns(false);
      } catch (err) {
        console.log(err);
      }
    }, 0);
  }, [columnModalChange]);

  async function createColumn(title: string) {
    const bodyRequest = {
      title: title,
      order: 0,
    };
    try {
      await fetch(
        `https://kanban-server-production.up.railway.app/boards/${boardId}/columns`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyRequest),
        }
      );
      try {
        const data = await fetch(
          `https://kanban-server-production.up.railway.app/boards/${boardId}/columns`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        );
        const res = await data.json();
        if (res[0]) {
          for (let i = 0; i < res.length; i++) {
            if (res[i].title === title) {
              const newColumn = {
                id: res[i]._id,
                list: [],
                title: res[i].title,
              };
              setColumns((state) => ({ ...state, [res[i]._id]: newColumn }));
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
      setColumnModalChange(!columnModalChange);
      setColumnModal(false);
    } catch (err) {
      console.log(err);
    }
  }
  async function createTask(
    title: string,
    column: string,
    description: string,
    userId: string,
    col: columnType
  ) {
    const bodyRequest = {
      title: title,
      order: 0,
      description: description,
      userId: userId,
      users: [],
    };
    console.log(bodyRequest);
    try {
      const res = await fetch(
        `https://kanban-server-production.up.railway.app/boards/${boardId}/columns/${column}/tasks`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyRequest),
        }
      );
      const data = await res.json();
      const newTask: TaskProps = {
        boardId: boardId,
        columnId: column,
        text: description,
        order: 0,
        title: title,
        userId: userId,
        users: [],
        _id: data._id,
      };

      const newList: TaskProps[] = col.list.concat(newTask);
      const newCol: columnType = {
        id: col.id,
        list: newList,
        title: col.title,
      };
      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
    } catch (err) {
      console.log(err);
    }
  }

  const onDragEnd = async ({ source, destination }: DropResult) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;
    // Set start and end variables
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object

      for (let i = 0; i < start.list.length; i++) {
        console.log(start.list);
        dispatch(taskLoadingChange(true));
        try {
          await fetch(
            `https://kanban-server-production.up.railway.app/boards/${boardId}/columns/${start.id}/tasks/${start.list[i]._id}`,
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

      for (let j = 0; j < newList.length; j++) {
        const bodyRequest = {
          title: newList[j].title,
          order: 0,
          description: newList[j].text,
          userId: "user",
          users: ["1", "2"],
        };
        try {
          const data = await fetch(
            `https://kanban-server-production.up.railway.app/boards/${boardId}/columns/${start.id}/tasks`,
            {
              method: "POST",
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
              },
              body: JSON.stringify(bodyRequest),
            }
          );
          const res = await data.json();
          newList[j]._id = res._id;
        } catch (err) {
          console.log(err);
        }
      }
      const newCol = {
        id: start.id,
        list: newList,
        title: start.title,
      };
      // Update the state
      dispatch(taskLoadingChange(false));
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );
      for (let i = 0; i < start.list.length; i++) {
        console.log(start.list);
        dispatch(taskLoadingChange(true));
        try {
          await fetch(
            `https://kanban-server-production.up.railway.app/boards/${boardId}/columns/${start.id}/tasks/${start.list[i]._id}`,
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

      for (let j = 0; j < newStartList.length; j++) {
        const bodyRequest = {
          title: newStartList[j].title,
          order: 0,
          description: newStartList[j].text,
          userId: "user",
          users: ["1", "2"],
        };
        try {
          const data = await fetch(
            `https://kanban-server-production.up.railway.app/boards/${boardId}/columns/${start.id}/tasks`,
            {
              method: "POST",
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
              },
              body: JSON.stringify(bodyRequest),
            }
          );
          const res = await data.json();
          newStartList[j]._id = res._id;
        } catch (err) {
          console.log(err);
        }
      }

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList,
        title: start.title,
      };
      const newEndList: TaskProps[] = [];
      // Make a new end list array
      newEndList.push(...end.list);

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);
      console.log("newEndlength" + newEndList.length);
      console.log(end.list);
      if (end.list[0]) {
        for (let i = 0; i < end.list.length; i++) {
          try {
            await fetch(
              `https://kanban-server-production.up.railway.app/boards/${boardId}/columns/${end.id}/tasks/${end.list[i]._id}`,
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
      }
      for (let j = 0; j < newEndList.length; j++) {
        const bodyRequest = {
          title: newEndList[j].title,
          order: 0,
          description: newEndList[j].text,
          userId: "user",
          users: [],
        };
        console.log("bodyRequest");
        console.log(bodyRequest);
        try {
          const data = await fetch(
            `https://kanban-server-production.up.railway.app/boards/${boardId}/columns/${end.id}/tasks`,
            {
              method: "POST",
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
              },
              body: JSON.stringify(bodyRequest),
            }
          );
          const res = await data.json();
          newEndList[j]._id = res._id;
        } catch (err) {
          console.log(err);
        }
      }
      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList,
        title: end.title,
      };

      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      dispatch(taskLoadingChange(false));
      return null;
    }
  };

  return (
    <>
      <Header></Header>
      <main>
        <button
          onClick={() => {
            setColumnModal(true);
          }}
        >
          Create column
        </button>
        {columnModal && (
          <div className="modal-window-column ">
            <label htmlFor="ColumnName">Title:</label>
            <input type="text" id="columnModalTitleInput"></input>
            <div className="modal-button-holder">
              <button
                onClick={async () => {
                  const input: HTMLInputElement = document.querySelector(
                    "#columnModalTitleInput"
                  ) as HTMLInputElement;

                  if (input) {
                    await createColumn(input.value);
                  }
                }}
              >
                create Column
              </button>
              <button
                onClick={() => {
                  setColumnModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <DragDropContext onDragEnd={onDragEnd}>
          {loadingColumns ? (
            <div className="loading">Loading...</div>
          ) : (
            <StyledColumns>
              {Object.values(columns).map((col, index) => (
                <div className="column-holder" key={col.id}>
                  <Column col={col} key={col.id} />

                  {taskModal && (
                    <div className="modal-window-column ">
                      <label htmlFor="TaskName">Title:</label>
                      <input
                        type="text"
                        id="taskInput"
                        ref={input1value}
                      ></input>
                      <label htmlFor="TaskDesc">Title:</label>
                      <input
                        type="text"
                        id="taskInput2"
                        ref={input2value}
                      ></input>
                      <div className="modal-button-holder">
                        <button
                          onClick={() => {
                            console.log("value " + input1value.current!.value);
                            console.log(col);
                            setTimeout(async () => {
                              console.log("start");

                              await createTask(
                                input1value.current!.value,
                                col.id,
                                input2value.current!.value,
                                "user",
                                col
                              );

                              setTaskModal(false);
                            });
                          }}
                        >
                          Create
                        </button>
                        <button
                          onClick={() => {
                            setTaskModal(false);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                  <button
                    id={col.id + "btn"}
                    onClick={async () => {
                      setTaskModal(true);
                    }}
                  >
                    Create Task
                  </button>
                </div>
              ))}
            </StyledColumns>
          )}
        </DragDropContext>
      </main>
      <Footer></Footer>
    </>
  );
}
