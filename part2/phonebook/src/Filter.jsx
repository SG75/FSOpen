export default function Filter({ searchPerson, setSearchPerson }) {
  return (
    <>
      <div>
        filter show with:{" "}
        <input
          value={searchPerson}
          onChange={(e) => setSearchPerson(e.target.value)}
        />
      </div>
    </>
  );
}
