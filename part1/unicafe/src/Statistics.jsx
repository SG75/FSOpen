import StatisticLine from "./StatisticLine";

const Statistics = (props) => {
  console.log(props);
  return (
    <>
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={props.good} />
            <StatisticLine text="neutral" value={props.neutral} />
            <StatisticLine text="bad" value={props.bad} />
            <StatisticLine text="all" value={props.all} />
            <StatisticLine text="average" value={props.avg.toFixed(1)} />
            <StatisticLine
              text="positive"
              value={props.positive.toFixed(1) + " %"}
            />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Statistics;
