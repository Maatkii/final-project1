import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

// style import
import "./Assets/bootstrap/css/bootstrap.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Assets/CSS/FormStyle.css";
import "./Assets/CSS/SideBar.css";
import "./Assets/CSS/TaskLayout.css";
import "./Assets/CSS/CommonStyle.css";
import "./Assets/CSS/ButtonListStyle.css";
import "./Assets/CSS/Pagination.css";
import "./Assets/CSS/TitleBar.css";
import "./Assets/CSS/MessageChat.css";
import "./Assets/CSS/SingleHeader.css";
import "./Assets/CSS/HeaderSticky.css";
import "./Assets/CSS/HeaderNotification.css";
import "./Assets/CSS/UserMenu.css";
import "./App.css";
import "./index.css";
import "./Assets/fontawesome-free/all.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
