import { useKey } from "react-use";
import ShowQuestion from "./ShowQuestion";

export default function App() {
  useKey("x", () => console.log("x"));

  return (
    <>
      <ShowQuestion />
    </>
  );
}
