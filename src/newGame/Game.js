import { useEffect, useState } from "react";
import { dealCards } from "./Deal.js";
import { hit } from "./Action.js";
import { stand } from "./Action.js";
import { double } from "./Action.js";
import { dealDealerCards } from "./Dealer.js";
import './Game.css';

function Game() {
    const cardBackImage = "https://deckofcardsapi.com/static/img/back.png";
    const [deck, setDeck] = useState(null);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [playerTurn, setPlayerTurn] = useState(true);
    const [dealerTurn, setDealerTurn] = useState(false); // Neuer State für den Dealer-Zug

    useEffect(() => {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=5')
            .then((res) => res.json())
            .then((data) => {
                setDeck(data);
            });
    }, []);

    const startGame = () => {
        if (deck) {
            dealCards(deck, setDeck, setPlayerHand, setDealerHand, cardBackImage);
            setGameStarted(true);
            setPlayerTurn(true);  // Spieler startet
        }
    };

    // Funktion, die den Dealer handeln lässt
    const handleDealerTurn = () => {
        if (!dealerTurn && !playerTurn) {  // Nur ausführen, wenn der Dealer noch nicht dran ist
            setDealerTurn(true);  // Markiere den Dealer als "dran"
            dealDealerCards(deck, dealerHand, setDealerHand, cardBackImage);  // Deal the cards
        }
    };

    // Sobald der Spieler auf "Stand" klickt, wird der Dealer aktiviert
    useEffect(() => {
        if (!playerTurn) {
            handleDealerTurn();  // Dealer zieht seine Karten
        }
    }, [playerTurn]);  // Effekt wird ausgeführt, wenn playerTurn auf false gesetzt wird

    return (
        <div className="body-container">
            <div className="game-container">
                <div className="dealer-container">
                    <div className="card-container">
                        {dealerHand.map((card, index) => (
                            <img key={index} src={card.image} alt={`${card.value} of ${card.suit}`} />
                        ))}
                    </div>
                </div>
                <div className="player-container">
                    <div className="card-container">
                        {playerHand.map((card, index) => (
                            <img key={index} src={card.image} alt={`${card.value} of ${card.suit}`} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="game-actions">
                {!gameStarted ? (
                    <button onClick={startGame}>Start Game</button>
                ) : (
                    <>
                        <button onClick={() => stand(setGameStarted, setPlayerTurn)} disabled={!playerTurn}>Stand</button>
                        <button onClick={() => hit(deck, setDeck, setPlayerHand)} disabled={!playerTurn}>Hit</button>
                        <button onClick={() => double(deck, setDeck, setPlayerHand, setGameStarted, setPlayerTurn)} disabled={!playerTurn}>Double</button>
                        {/* <button onClick={() => console.log("Split")}>Split</button> */}
                    </>
                )}
            </div>
        </div>
    );
}

export default Game;
