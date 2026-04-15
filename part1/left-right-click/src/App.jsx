import { useState } from "react";
import History from "./History";
import Button from "./Button";

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  const [allClicks, setAll] = useState([]);

  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    const updatedLeft = left + 1;

    console.log("left before", left);
    setLeft(updatedLeft);
    setTotal(updatedLeft + right);
    console.log("left after", left);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    const updatedRight = right + 1;
    setRight(updatedRight);
    setTotal(left + updatedRight);
  };

  return (
    <>
      <div>
        {left}
        <Button onClick={handleLeftClick} text="left"></Button>
        <Button onClick={handleRightClick} text="right"></Button>
        {right}
        <History allClicks={allClicks} />
        <p>total {total}</p>
      </div>
    </>
  );
};

export default App;
