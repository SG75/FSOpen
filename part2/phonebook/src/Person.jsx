export default function Person({ name, number, onClick }) {
  return (
    <>
      <p>
        {name} {number}{" "}
        <button className="btn" onClick={onClick}>
          Delete
        </button>
      </p>
    </>
  );
}
