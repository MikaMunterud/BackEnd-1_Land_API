import "./App.scss";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoggedInPage from "./pages/LoggedInPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Countries 🌍</h1>
        <button>
          <Link to="/">Home</Link>
        </button>
        <button>
          <Link to="/login">Login</Link>
        </button>
      </div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoggedInPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
