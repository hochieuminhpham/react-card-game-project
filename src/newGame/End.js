import React, { useEffect, useState } from 'react';
import './End.css';
import { useNavigate } from "react-router-dom";

const End = ({
                 playerHand,
                 dealerHand,
                 setGameStarted,
                 setDeck,
                 setPlayerHand,
                 setDealerHand,
                 setPlayerTurn,
                 setDealerTurn,
                 setGameEnded,
                 currentBet,
                 setBalance
             }) => {
    const navigate = useNavigate();
    const [resultText, setResultText] = useState("");

    const calculateHandValue = (hand) => {
        let totalValue = 0;
        let acesCount = 0;
        hand.forEach((card) => {
            if (card && card.value !== "HIDDEN") {
                if (card.value === "ACE") {
                    acesCount += 1;
                    totalValue += 11;
                } else if (["KING", "QUEEN", "JACK"].includes(card.value)) {
                    totalValue += 10;
                } else {
                    totalValue += parseInt(card.value, 10);
                }
            }
        });
        while (totalValue > 21 && acesCount > 0) {
            totalValue -= 10;
            acesCount -= 1;
        }
        return totalValue;
    };

    const playerHandValue = calculateHandValue(playerHand);
    const dealerHandValue = calculateHandValue(dealerHand);

    useEffect(() => {
        let result = "";
        if (playerHandValue > 21) {
            result = "Bust";
        } else if (dealerHandValue > 21) {
            setBalance(prev => prev + currentBet * 2);
            result = "Gewonnen! Der Dealer hat Bust";
        } else if (playerHandValue > dealerHandValue) {
            setBalance(prev => prev + currentBet * 2);
            result = "Gewonnen!";
        } else if (playerHandValue < dealerHandValue) {
            result = "Verloren!";
        } else {
            setBalance(prev => prev + currentBet);
            result = "Push!";
        }
        setResultText(result);
    }, []); // Only runs once when component mounts

    const restartGame = () => {
        setGameStarted(false);
        setPlayerHand([]);
        setDealerHand([]);
        setDeck(null);
        setPlayerTurn(true);
        setDealerTurn(false);
        setGameEnded(false);
        navigate("/setBet");
    };

    const quit = () => {
        navigate("/");
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{resultText}</h2>
                <button onClick={restartGame}>Neustart</button>
                <button onClick={quit}>Zurück zu Homepage</button>
            </div>
        </div>
    );
};

export default End;
