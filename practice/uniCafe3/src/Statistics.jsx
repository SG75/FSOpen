import StatLine from "./StatLine";

const Statistics = (props) => {
  return (
    <>
      <table>
        <tbody>
          <StatLine stat="good" value={props.good} />
          <StatLine stat="neutral" value={props.neutral} />
          <StatLine stat="bad" value={props.bad} />
          <StatLine stat="all" value={props.all} />
          <StatLine stat="average" value={props.average.toFixed(1)} />
          <StatLine stat="positive" value={props.positive.toFixed(1) + " %"} />
        </tbody>
      </table>
    </>
  );
};

export default Statistics;
