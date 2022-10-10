import { KonvaEventObject } from "konva/lib/Node";
import React from "react";
import { useDrop } from "react-dnd";
import { Layer, Stage, Text, Group, Rect, Arrow } from "react-konva";
import { useInterval, useList, useWindowSize } from "react-use";
import { ConnectItem, DraggableTypes, DragItem, Item } from "./types";

export const Board: React.FC = () => {
  const [list, listActions] = useList<Item>();
  const [connectList, connectListActions] = useList<ConnectItem>();
  const { width, height } = useWindowSize();
  const menuRef = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<DragItem>(
    () => ({
      accept: DraggableTypes.CARD,
      drop: (dragItem, monitor) => {
        const xy = monitor.getSourceClientOffset();
        const x = (xy?.x || 0) - 180;
        const y = xy?.y || 0;
        listActions.push({
          x,
          y,
          ...dragItem,
        });
      },
    }),
    [list.length]
  );

  useInterval(() => {
    listActions.push({
      x: 100,
      y: 100,
      text: "Auto",
      index: 0,
    });
  }, 20 * 1000);

  const [node, setNode] = React.useState<any>(null);
  const [nodeContext, setNodeContext] = React.useState<any>(null);

  window.addEventListener("click", () => {
    if (!menuRef.current) {
      setNodeContext(null);
      return;
    }

    menuRef.current.style.display = "none";
  });

  const removeNodeContext = () => {
    if (!nodeContext) {
      return;
    }

    connectListActions.filter(
      (connect) => connect.from !== node[0] && connect.to !== node[0]
    );

    listActions.removeAt(node[0]);
    setNodeContext(null);
    setNode(null);
  };

  const dragBlockEnd = (i: number) => (e: KonvaEventObject<DragEvent>) => {
    listActions.updateAt(i, {
      ...list[i],
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const blockClick = (i: number) => (e: KonvaEventObject<DragEvent>) => {
    if (node && node?.[0] !== i) {
      connectListActions.push({
        from: node?.[0],
        to: i,
      });

      setNode(null);
    } else {
      setNode(node?.[0] !== i ? [i, e.target] : null);
    }
  };

  const contextBlock =
    (i: number, item: Item) => (e: KonvaEventObject<PointerEvent>) => {
      e.evt.preventDefault();

      if (!menuRef.current) {
        return;
      }

      setNodeContext([i, e.target]);
      menuRef.current.style.display = "block";
      menuRef.current.style.top = 56 - 1 + item.y + "px";
      menuRef.current.style.left = 180 - 1 + item.x + "px";
    };

  return (
    <div ref={drop}>
      <div
        ref={menuRef}
        style={{
          display: "none",
        }}
        css={{
          position: "fixed",
          zIndex: 20,
          border: "1px solid black",
          backgroundColor: "white",
          width: "10rem",
          padding: "0.5rem",
          "&:hover": {
            backgroundColor: "lightcoral",
          },
        }}
        onClick={removeNodeContext}
      >
        Delete
      </div>

      <Stage width={width - 180} height={height}>
        <Layer>
          {list.map((item, i) => (
            <Group
              key={i}
              draggable
              x={item.x}
              y={item.y}
              onDragEnd={dragBlockEnd(i)}
              onClick={blockClick(i)}
              onContextMenu={contextBlock(i, item)}
            >
              <Rect
                width={160 - 2}
                height={56 - 2}
                fill={node?.[0] !== i ? "green" : "red"}
                strokeEnabled
                stroke="black"
                strokeWidth={2}
              />
              <Text
                text={item.text}
                fill="black"
                fontFamily="sans-serif"
                fontSize={16}
                lineHeight={1}
                x={18}
                y={23}
              />
            </Group>
          ))}

          {connectList.map((connect, i) => {
            const points: number[] = [
              list[connect.from].x + 80,
              list[connect.from].y + 28,
              list[connect.to].x + 80,
              list[connect.to].y + 28,
            ];

            return (
              <Arrow key={i} points={points} fill="black" stroke="black" />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};
