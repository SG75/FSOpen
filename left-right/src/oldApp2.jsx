import { useState } from "react";
const App = () => {
  // const [left, setLeft] = useState(0);
  // const [right, setRight] = useState(0);
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0,
  });

  const handleLeftClick = () => {
    // const newClicks = {
    //   ...clicks,
    //   left: clicks.left + 1,
    //   // right: clicks.right,
    // };
    setClicks({ ...clicks, left: clicks.left + 1 });
  };

  const handleRightClick = () => {
    // const newClicks = {
    //   ...clicks,
    //   // left: clicks.left,
    //   right: clicks.right + 1,
    // };
    setClicks({ ...clicks, right: clicks.right + 1 });
  };

  return (
    <div>
      {/* <button onClick={() => setLeft(left + 1)}>Left</button>
        <button onClick={() => setRight(right + 1)}>Right</button> */}
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
    </div>
  );
};

export default App;
