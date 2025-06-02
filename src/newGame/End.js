import React from 'react';
import './End.css';
import {useNavigate} from "react-router-dom";


const End = ({ playerHand, dealerHand, setGameStarted, setDeck, setPlayerHand, setDealerHand, setPlayerTurn, setDealerTurn, setGameEnded }) => {
    const navigate = useNavigate();
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

    const determineResult = () => {
        if (playerHandValue > 21) {
            return "Bust";
        } else if (dealerHandValue > 21) {
            return "Gewonnen! Der Dealer hat Bust";
        } else if (playerHandValue > dealerHandValue) {
            return "Gewonnen!";
        } else if (playerHandValue < dealerHandValue) {
            return "Verloren!";
        } else {
            return "Push!";
        }
    };

    const gameResult = determineResult();

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
        navigate("/")
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{gameResult}</h2>
                <button onClick={restartGame}>Neustart</button>
                <button onClick={quit}>Zurück zu Homepage</button>
            </div>
        </div>
    );
};

export default End;
