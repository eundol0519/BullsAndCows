import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";
import Rules from "./Rules";
import Game from "./Game";
import Option from "./Option";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/option" element={<Option />} />
        <Route path="/gameStart" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
