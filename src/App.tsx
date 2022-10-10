import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useInterval } from "react-use";
import { Board } from "./components/board/Board";
import { BoardItem } from "./components/board/BoardItem";
import { Dashboard, Menu } from "./components/global";

function App() {
  const [count, setCount] = React.useState(0);
  useInterval(() => {
    console.log("Hello world!", count);
    setCount((count) => count + 1);
  }, 20 * 1000);

  const buttons = ["One", "Two", "Three"];

  return (
    <DndProvider backend={HTML5Backend}>
      <Dashboard>
        <Menu>
          <p>Counter: {count}</p>

          <h4>Try drag'n'drop</h4>

          {buttons.map((button, i) => (
            <BoardItem
              key={i}
              item={{ y: 66 * i + 100, x: 10, text: button, index: NaN }}
              offset={{ x: 0, y: 0 }}
            />
          ))}
        </Menu>
        <Board></Board>
      </Dashboard>
    </DndProvider>
  );
}

export default App;
