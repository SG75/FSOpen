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
    console.log("left before", left);
    const updatedLeft = left + 1;
    setLeft(updatedLeft);
    console.log("left after", left);
    setTotal(updatedLeft + right);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    const UpdatedRight = right + 1;
    setRight(UpdatedRight);
    setTotal(left + UpdatedRight);
  };

  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} text="Left" />
      <Button onClick={handleRightClick} text="Right" />
      {/* <button onClick={handleLeftClick}>Left</button> */}
      {/* <button onClick={handleRightClick}>Right</button> */}
      {right}
      {/* <p>{allClicks.join(" ")}</p> */}
      {/* <p>Total {total}</p> */}
      <History allClicks={allClicks} />
    </div>
  );
};

export default App;
