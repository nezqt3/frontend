import Form from "./components/Form";
import MainPage from "./components/MainPage";
import "./styles/index.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/order" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
