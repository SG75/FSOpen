import { useState } from "react";
import Header from "./Header";
import Button from "./Button";
import Statistics from "./Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  let all = good + bad + neutral;
  let avg = all > 0? (good - bad) / all : 0;
  let positive = all > 0 ? (good / all) * 100: 0;

  return (
    <div>
      <Header name="give feedback" />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Header name="statistics" />
      <Statistics
        all={all}
        good={good}
        neutral={neutral}
        bad={bad}
        avg={avg}
        positive={positive}
      />
    </div>
  );
};
export default App;
