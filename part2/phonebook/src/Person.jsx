export default function Person({ name, number, onClick }) {
  return (
    <>
      <p>
        {name} {number} <button onClick={onClick}>Delete</button>
      </p>
    </>
  );
}
