import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// src/index.js ou src/App.js
import './index.css'; // ou o arquivo de CSS que você criou



function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Outlet  />
    </div>
  );
}

export default App;
