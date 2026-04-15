const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  );
};

// const Part = ({ name, exercises }) => {
//   return (
//     <p>
//       {name} {exercises}
//     </p>
//   );
// };

export default Content;
