import StatisticLine from "./StatisticLine";

const Statistics = (props) => {
  if (props.all === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <StatisticLine text="good" stats={props.good} />
      <StatisticLine text="neutral" stats={props.neutral} />
      <StatisticLine text="bad" stats={props.bad} />
      <StatisticLine text="average" stats={props.avg.toFixed(1)} />
      <StatisticLine text="positive" stats={props.positive.toFixed(1) + " %"} />
    </>
  );
};

export default Statistics;
