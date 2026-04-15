const Hello = ({ name, age }) => {
  // const name = props.name;
  // const age = props.age;

  // const { name, age } = props;

  const bornYear = () => new Date().getFullYear() - age;

  return (
    <>
      <div>
        <p>
          Hello {name}, you are {age} years old
        </p>
        <p> so you were probably born in {bornYear()}</p>
      </div>
    </>
  );
};

export default Hello;
