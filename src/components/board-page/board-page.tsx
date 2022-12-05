import React, { useEffect, ReactNode, useState, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../globalStore/globalStore";
import { Routes, Route, Link } from "react-router-dom";
import "./board-page.css";
import type { FC } from "react";
import { Column, TaskProps } from "./Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { styled } from "../stitches.config";
const StyledColumns = styled("div", {
  display: "flex",
  margin: "10vh auto",
  marginleft: "15px",
  height: "60vh",
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
  let boardId: string = "6389245c387211d70eef2af5";
  const [columnModal, setColumnModal] = useState(false);
  const [refresh, setRefresh] = useState(999);
  let serverColumns: getColumnType[] = [];

  let initialColumns: Record<string, columnType> = {};

  const [columns, setColumns] = useState(initialColumns);
  useEffect(() => {
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
        console.log(serverColumns);
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

              console.log(tasks);
              initialColumns[serverColumns[i]._id] = {
                id: serverColumns[i]._id,
                list: tasks,
                title: serverColumns[i].title,
              };

              console.log(initialColumns);
            } catch (err) {
              console.log(err);
            }
          }
        }
        setRefresh(refresh + 1);
      } catch (err) {
        console.log(err);
      }
    }, 0);
  }, [columnModal]);

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
              console.log("res:");
              console.log(res[i]);
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
      setColumnModal(false);
    } catch (err) {
      console.log(err);
    }
  }
  async function createTask(
    title: string,
    column: string,
    description: string,
    userId: string
  ) {
    const bodyRequest = {
      title: title,
      order: 0,
      description: description,
      userId: userId,
      users: ["1", "2"],
    };
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
      console.log(data);
      console.log(bodyRequest);
    } catch (err) {
      console.log(err);
    }
  }

  const onDragEnd = ({ source, destination }: DropResult) => {
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
      const newCol = {
        id: start.id,
        list: newList,
        title: start.title,
      };

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList,
        title: start.title,
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

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
      return null;
    }
  };

  return (
    <>
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
        <StyledColumns>
          {Object.values(columns).map((col) => (
            <Column col={col} key={col.id} />
          ))}
        </StyledColumns>
      </DragDropContext>

      <button
        onClick={async () => {
          setRefresh(refresh + 1);
          await createTask(
            "title56",
            "638d7bf1387211d70eef79bd",
            "description",
            "User"
          );
        }}
      >
        create task
      </button>
    </>
  );
}
