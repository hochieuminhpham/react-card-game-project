import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Game from "./newGame/Game.js";

function Home() {
    const navigate = useNavigate();

    const handlePlay = () => {
        navigate("/setBet");
    };

    return (
        <div className="Homepage-container">
            <div className="title">Blackjack</div>
            <div className="navigation">
                <button onClick={handlePlay}>Play</button>
            </div>
        </div>
    );
}

// Hier werden die Einsätze 10, 50, 100, custom angezeigt und das Guthaben oben rechts
function SetBet({ balance, setBalance, setCurrentBet }) {
    const [betInput, setBetInput] = useState(""); // Zustandsvariable für benutzerdefinierten Einsatz
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleBet = (amount) => {
        if (amount > balance || amount <= 0) {
            setError("Ungültiger Betrag.");
            return;
        }
        setCurrentBet(amount);
        setBalance((prev) => prev - amount);
        navigate("/newGame"); // Hier wird dann auf newGame weitergeleitet
    };

    const handleCustomBet = () => {
        const value = parseInt(betInput, 10);
        if (isNaN(value) || value <= 0 || value > balance) {
            setError("Ungültiger Betrag.");
            return;
        }
        setCurrentBet(value);
        setBalance((prev) => prev - value);
        navigate("/newGame"); // Weiterleitung zur neuen Spielseite
    };

    return (
        <div className="Homepage-container">
            <div className="balance">Guthaben: {balance}CHF</div>

            <div className="title">Einsatz wählen</div>
            <div className="buttons">
                <button onClick={() => handleBet(10)}>10</button>
                <button onClick={() => handleBet(50)}>50</button>
                <button onClick={() => handleBet(100)}>100</button>

            {/* Eingabefeld um selber einsatz wählen */}
            <div>
                <input
                type="text"
                placeholder="Eigener Einsatz"
                value={betInput}
                onChange={(e) => setBetInput(e.target.value)}
                max={balance}
                />
            <button onClick={handleCustomBet}>Einsatz bestätigen</button>
                </div>
                </div>

            {error && <div className="error">{error}</div>}
        </div>
    );
}

function App() {
    const [balance, setBalance] = useState(1000); // Startguthaben
    const [currentBet, setCurrentBet] = useState(0); // Aktueller Einsatz

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/setBet"
                    element={
                        <SetBet
                            balance={balance}
                            setBalance={setBalance}
                            setCurrentBet={setCurrentBet}
                        />
                    }
                />
                <Route
                    path="/newGame"
                    element={<Game currentBet={currentBet} balance={balance} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
