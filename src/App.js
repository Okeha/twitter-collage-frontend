import { Route, Routes } from "react-router-dom";
import "./App.css";
import NotFoundPage from "./pages/page-not-found";
import Home from "./pages/home/home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
