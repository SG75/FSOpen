import StatLine from "./StatLine";

const Statistics = (props) => {
  if (props.all === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      <StatLine stat="good" value={props.good} />
      <StatLine stat="neutral" value={props.neutral} />
      <StatLine stat="bad" value={props.bad} />
      <StatLine stat="all" value={props.all} />
      <StatLine stat="average" value={props.average.toFixed(1)} />
      <StatLine stat="positive" value={props.positive.toFixed(1) + " %"} />
    </>
  );
};

export default Statistics;
