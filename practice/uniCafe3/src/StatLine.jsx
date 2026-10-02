const StatLine = ({ stat, value }) => {
  return (
    <tr>
      <td>{stat}</td>
      <td>{value}</td>
    </tr>
  );
};

export default StatLine;
