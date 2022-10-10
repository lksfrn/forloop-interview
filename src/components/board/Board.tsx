import React from "react";
import { useDrop } from "react-dnd";
import { useList, useMap } from "react-use";
import { BoardItem } from "./BoardItem";
import { DraggableTypes, DragItem, Item } from "./types";

export const Board: React.FC = () => {
  const [list, listActions] = useList<Item>();
  const [] = useMap()
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [coordsOffset, setCoordsOffset] = React.useState({ x: 0, y: 0 });
//   const [isMouseDown, setIsMouseDown] = React.useState(false);

//   const onMouseDown: React.MouseEventHandler<HTMLDivElement> = ({
//     clientX,
//     clientY,
//   }) => {
//     setCoords({
//       x: clientX,
//       y: clientY,
//     });
//     setIsMouseDown(true);
//   };

//   const onMouseUp: React.MouseEventHandler<HTMLDivElement> = ({
//     clientX,
//     clientY,
//   }) => {
//     setCoordsOffset({
//       x: coordsOffset.x + coords.x - clientX,
//       y: coordsOffset.y + coords.y - clientY,
//     });
//     setIsMouseDown(false);
//   };

//   const onMouseMove: React.MouseEventHandler<HTMLDivElement> = ({
//     clientX,
//     clientY,
//   }) => {
//     if (isMouseDown) {
//         setCoordsOffset({
//           x: coords.x - clientX,
//           y: coords.y - clientY,
//         });
//     }
//   };

  const [, drop] = useDrop<DragItem>(
    () => ({
      accept: DraggableTypes.CARD,
      drop: (dragItem, monitor) => {
        const xy = monitor.getSourceClientOffset();

        if (!Number.isNaN(dragItem.index)) {
          listActions.updateAt(dragItem.index, {
            x: xy?.x || 0,
            y: xy?.y || 0,
            ...dragItem,
          });
        } else {
          listActions.push({
            x: xy?.x || 0,
            y: xy?.y || 0,
            ...dragItem,
            index: list.length,
          });
        }
      },
    }),
    [list.length]
  );

  return (
    <>
      <section
        ref={drop}
        css={{}}
        // onMouseDown={onMouseDown}
        // onMouseUp={onMouseUp}
        // onMouseMove={onMouseMove}
        // onDoubleClick={() => setCoordsOffset({ x: 0, y: 0 })}
      >
        <pre>{JSON.stringify(list, null, 2)}</pre>
        {list.map((item, i) => (
          <BoardItem item={item} key={i} offset={coordsOffset} />
        ))}
      </section>
    </>
  );
};
