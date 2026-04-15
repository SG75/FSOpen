import { useState } from "react";
import Display from "./Display";
import Hello from "./Hello";
import Button from "./Button";

const App = () => {
  const [counter, setCounter] = useState(0);
  console.log("rendering with counter value", counter);

  const increaseByOne = () => {
    console.log("increasing, value before");
    setCounter(counter + 1);
  };

  const decreaseByOne = () => {
    console.log("decreasing, value before", counter);
    setCounter(counter - 1);
  };
  const setToZero = () => {
    console.log("resetting to zero, value before", counter);
    setCounter(0);
  };

  return (
    <>
      <Display counter={counter} />
      <Button onClick={increaseByOne} text="plus"></Button>
      <Button onClick={setToZero} text="zero"></Button>
      <Button onClick={decreaseByOne} text="minus"></Button>
    </>
  );
};

export default App;
