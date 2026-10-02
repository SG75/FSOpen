export default function StatLine({ stat, value }) {
  return (
    <>
      <tr>
        <td>{stat}</td>
        <td>{value}</td>
      </tr>
    </>
  );
}
