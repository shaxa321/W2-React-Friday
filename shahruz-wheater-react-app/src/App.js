import logo from "./logo.svg";
import "./App.css";
import CustomForm from "./components/CustomForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<CustomForm />} />
        </Routes>
      </BrowserRouter>
      <div className="App"></div>
    </>
  );
}

export default App;
