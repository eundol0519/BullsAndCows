import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Rules from "./pages/Rules";
import Content from "./components/Content";
import Game from "./pages/Game";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
  },
  { path: "/rules", element: <Rules /> },
  { path: "/game", element: <Game /> },
]);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <Content>
        <RouterProvider router={router} />
      </Content>
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
