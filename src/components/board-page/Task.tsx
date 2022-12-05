import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "../stitches.config";

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
  ":hover": {
    backgroundColor: "#fff",
    transition: "background-color .1s ease-in",
  },
});

const Task: React.FC<TaskProps> = (a: TaskProps) => {
  return (
    <Draggable draggableId={a._id} index={a.index}>
      {(provided) => (
        <StyledItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {a.text}
        </StyledItem>
      )}
    </Draggable>
  );
};

export default Task;
