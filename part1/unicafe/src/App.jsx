import { useState } from "react";
import Header from "./Header";
import Button from "./Button";
import Statistics from "./Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let all = good + neutral + bad;
  let avg = all > 0 ? (good - bad) / all : 0;
  let positive = all > 0 ? (good / all) * 100 : 0;

  //all = good + neutral + bad
  // avg = good - bad / all
  //positive % = good / all * 100

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleBadClick = () => {
    // console.log("setting bad count");
    setBad(bad + 1);
  };

  const handleNeutralClick = () => {
    // console.log("setting neutral count");
    setNeutral(neutral + 1);
  };

  return (
    <>
      <Header />
      <Button onClick={handleGoodClick} text={"good"} />
      <Button onClick={handleNeutralClick} text={"neutral"} />
      <Button onClick={handleBadClick} text={"bad"} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        avg={avg}
        positive={positive}
      />
    </>
  );
};

export default App;
