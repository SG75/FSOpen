import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// let counter = 1;

createRoot(document.getElementById("root")).render(<App />)

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App counter={counter} />
//   </StrictMode>,
// );

// const refresh = () => {
//   root.render(<App counter={counter} />);
// };

// refresh()
// counter +=1
// refresh()
// counter +=1
// refresh()

// setInterval(() => {
//   refresh()
//   counter += 1
// }, 1000)
