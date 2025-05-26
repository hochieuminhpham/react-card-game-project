import { useEffect, useState } from "react";
import { dealCards } from "./Deal.js";
import { hit } from "./Action.js";
import { stand } from "./Action.js";
import { double } from "./Action.js";
import { dealDealerCards } from "./Dealer.js";
import { calculateHandValue } from "./Count.js";
import End from './End.js';
import './Game.css';

function Game() {
    const cardBackImage = "https://deckofcardsapi.com/static/img/back.png";
    const [deck, setDeck] = useState(null);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);
    const [playerTurn, setPlayerTurn] = useState(true);
    const [dealerTurn, setDealerTurn] = useState(false);

    useEffect(() => {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=5')
            .then((res) => res.json())
            .then((data) => {
                setDeck(data);
            });
    }, [deck]);

    const startGame = () => {
        if (deck) {
            dealCards(deck, setDeck, setPlayerHand, setDealerHand, cardBackImage);
            setGameStarted(true);
            setPlayerTurn(true);
            setGameEnded(false);
        }
    };

    const handleDealerTurn = () => {
        if (!dealerTurn && !playerTurn) {
            setDealerTurn(true);
            dealDealerCards(deck, dealerHand, setDealerHand, cardBackImage, setGameEnded);
        }
    };

    useEffect(() => {
        if (!playerTurn) {
            handleDealerTurn();
        }
    }, [playerTurn]);

    const playerHandValue = calculateHandValue(playerHand);
    const dealerHandValue = calculateHandValue(dealerHand);

    return (
        <div className="body-container">
            <div className="game-container">
                <div className="dealer-container">
                    <div className="card-container">
                        {dealerHand.map((card, index) => (
                            <div className="hand-card-container" key={index}>
                                <div className="card-wrapper">
                                    <img className="card-image" src={card.image} alt={`${card.value} of ${card.suit}`} />
                                    {card.suit !== "HIDDEN" && (
                                        <div className="card-info">
                                            <h3>{card.suit}</h3>
                                            <h3>
                                                {["KING", "QUEEN", "JACK"].includes(card.value)
                                                    ? 10
                                                    : card.value === "ACE"
                                                        ? "ACE: 11"
                                                        : card.value}
                                            </h3>

                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    {gameStarted && (
                        <div className="hand-value">Dealer Hand: {dealerHandValue}</div>
                    )}
                </div>
                <div className="player-container">
                    <div className="card-container">
                        {playerHand.map((card, index) => (
                            <div className="hand-card-container" key={index}>
                                <div className="card-wrapper">
                                    <img className="card-image" src={card.image} alt={`${card.value} of ${card.suit}`} />
                                    {card.suit !== "HIDDEN" && (
                                        <div className="card-info">
                                            <h3>{card.suit}</h3>
                                            <h3>
                                                {["KING", "QUEEN", "JACK"].includes(card.value)
                                                    ? 10
                                                    : card.value === "ACE"
                                                        ? "ACE: 11"
                                                        : card.value}
                                            </h3>

                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    {gameStarted && (
                        <div className="hand-value">Spieler Hand: {playerHandValue}</div>
                    )}
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
                    </>
                )}
            </div>
            {gameEnded && (
                <End 
                    playerHand={playerHand} 
                    dealerHand={dealerHand} 
                    setGameStarted={setGameStarted}
                    setDeck={setDeck}
                    setPlayerHand={setPlayerHand}
                    setDealerHand={setDealerHand}
                    setPlayerTurn={setPlayerTurn}
                    setDealerTurn={setDealerTurn}
                    setGameEnded={setGameEnded} 
                />
            )}
        </div>
    );
}

export default Game;
