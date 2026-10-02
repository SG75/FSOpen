const Total = ({ parts }) => {
  const total = parts.reduce((acc, current) => {
    return acc + current.exercises;
  }, 0);

  return <h3>total of {total} exercises</h3>;
};
export default Total;

//how reduce is used in an Object Array.

// const items = [
//   { name: 'Laptop', price: 57000 },
//   { name: 'Mouse', price: 750 },
//   { name: 'Keyboard', price: 550 }
// ];

// // Summing up all prices
// const totalPrice = items.reduce((accumulator, currentItem) => {
//   return accumulator + currentItem.price;
// }, 0); // 0 is the crucial initialValue
