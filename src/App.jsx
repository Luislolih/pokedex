import Card from "./views/Card/Card";
import Home from "./views/Home/Home";
import { Route, Routes } from "react-router-dom";
import Landing from "./views/Landing/Landing";
function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/pokemon/:name" element={<Card />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </>
  );
}

export default App;
