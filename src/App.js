import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Game from "./newGame/Game.js";

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/newGame">New Game</Link>
            </nav>

            <Routes>
                <Route path="/" element={<h1>Welcome to the Homepage</h1>} />
                <Route path="/newGame" element={<Game />} />
            </Routes>
        </Router>
    );
}

export default App;
