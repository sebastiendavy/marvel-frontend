import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Characters from "./pages/Characters/Characters";
import Comics from "./pages/Comics/Comics";
import Favorites from "./pages/Favorites/Favorites";
import Header from "./react-components/Header/Header";
import Home from "./pages/Home/Home";
import CharacterDetail from "./pages/CharacterDetail/CharacterDetail";

function App() {
  return (
    <div className="bg-white min-w-7xl max-w-6xl mx-auto min-h-screen border-x-2 border-gray-100">
      {" "}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/character/:characterId" element={<CharacterDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
