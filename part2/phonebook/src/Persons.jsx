import Person from "./Person";

export default function Persons({ persons, searchPerson }) {
  const filteredPerson = persons.filter((person) =>
    person.name.toLocaleLowerCase().includes(searchPerson.toLowerCase()),
  );

  return (
    <>
      {filteredPerson.map((person) => {
        // console.log(person);
        return (
          <Person key={person.name} name={person.name} number={person.number} />
        );
      })}
    </>
  );
}
