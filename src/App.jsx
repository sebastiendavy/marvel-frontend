import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState } from "react";

import Characters from "./pages/Characters/Characters";
import Comics from "./pages/Comics/Comics";
import Favorites from "./pages/Favorites/Favorites";
import Home from "./pages/Home/Home";
import CharacterDetail from "./pages/CharacterDetail/CharacterDetail";
import Cookies from "js-cookie";
import ComicDetail from "./pages/ComicDetail/ComicDetail";

import Header from "./react-components/Header/Header";

function App() {
  const [token, setToken] = useState(Cookies.get("marvel-token") || null);
  return (
    <div className="bg-white max-w-6xl mx-auto min-h-screen border-x-2 border-gray-100">
      {" "}
      <Router>
        <Header token={token} setToken={setToken} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/comics" element={<Comics />} />
          <Route
            path="/favorites"
            element={token ? <Favorites /> : <Navigate to="/" />}
          />
          <Route path="/character/:characterId" element={<CharacterDetail />} />
          <Route path="/comic/:comicId" element={<ComicDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
