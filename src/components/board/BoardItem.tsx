import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { DraggableTypes, DragItem, Item } from "./types";

const Connect: React.FC = () => {
  const [{ opacity }, dragRef] = useDrag<
    DragItem,
    unknown,
    { opacity: number }
  >(
    () => ({
      type: DraggableTypes.CONNECT,
      //   item: { text: item.text, index: item.index },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );

  const [, drop] = useDrop<DragItem>(
    () => ({
      accept: DraggableTypes.CONNECT,
      drop: (_, monitor) => {
        console.log("dropped");
      },
    }),
    []
  );

  return (
    <div ref={dragRef}>
      <span ref={drop}>&times;</span>
    </div>
  );
};

export const BoardItem: React.FC<{
  item: Item;
  offset: { x: number; y: number };
}> = ({ item, offset }) => {
  const [{ opacity }, dragRef] = useDrag<
    DragItem,
    unknown,
    { opacity: number }
  >(
    () => ({
      type: DraggableTypes.CARD,
      item: { text: item.text, index: item.index },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );

  return (
    <div
      ref={dragRef}
      css={{
        backgroundColor: "white",
        border: "2px solid black",
        top: item.y - offset.y,
        left: item.x - offset.x,
        position: "fixed",
        width: "10rem",
        height: "56px",
        lineHeight: 1,
        zIndex: 5,
        cursor: "grab",
        opacity,
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",

        '& > div > div': {
          position: "absolute",
          width: 24,
          cursor: "pointer",

          "&:hover": {
            backgroundColor: "green",
          },

          "&:nth-of-type(1)": {
            left: 0,
            top: 0,
          },
          "&:nth-of-type(2)": {
            left: 0,
            bottom: 0,
          },
          "&:nth-of-type(3)": {
            right: 0,
            top: 0,
          },
          "&:nth-of-type(4)": {
            right: 0,
            bottom: 0,
          },
        },
      }}
    >
      <div css={{ padding: "20px 1rem", position: "relative" }}>
        {/* <Connect />
        <Connect />
        <Connect />
        <Connect /> */}
        {item.text ?? "Unknown"}
      </div>
    </div>
  );
};
