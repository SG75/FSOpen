export default function Filter({ searchPerson, setSearchPerson }) {
  return (
    <>
      <div>
        fiter show with:{" "}
        <input
          value={searchPerson}
          onChange={(e) => setSearchPerson(e.target.value)}
        />
      </div>
    </>
  );
}
