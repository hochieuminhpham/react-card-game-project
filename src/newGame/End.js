import React from 'react';
import './End.css';

const End = ({ playerHand, dealerHand, setGameStarted, setDeck, setPlayerHand, setDealerHand, setPlayerTurn, setDealerTurn, setGameEnded }) => {
    // Berechnet den Wert der Hand
    const calculateHandValue = (hand) => {
        let totalValue = 0;
        let acesCount = 0;

        hand.forEach((card) => {
            if (card && card.value !== "HIDDEN") {
                if (card.value === "ACE") {
                    acesCount += 1;
                    totalValue += 11; // Zähle Ass als 11
                } else if (["KING", "QUEEN", "JACK"].includes(card.value)) {
                    totalValue += 10; // Bildkarten haben Wert 10
                } else {
                    totalValue += parseInt(card.value, 10); // Zahlenkarten haben ihren entsprechenden Wert
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

    // Bestimmen des Ergebnisses
    const determineResult = () => {
        if (playerHandValue > 21) {
            return "Verloren! Du hast über 21.";
        } else if (dealerHandValue > 21) {
            return "Gewonnen! Der Dealer hat über 21.";
        } else if (playerHandValue > dealerHandValue) {
            return "Gewonnen!";
        } else if (playerHandValue < dealerHandValue) {
            return "Verloren!";
        } else {
            return "Push! Unentschieden.";
        }
    };

    const gameResult = determineResult();

    // Neustart-Funktion, die alle States zurücksetzt
    const restartGame = () => {
        // Reset the game state
        setGameStarted(false); // Das Spiel zurücksetzen
        setPlayerHand([]); // Leere Spielerhand
        setDealerHand([]); // Leere Dealerhand
        setDeck(null); // Setzt das Deck auf null, um es neu zu laden
        setPlayerTurn(true); // Spieler startet das Spiel
        setDealerTurn(false); // Dealer hat noch nicht gezogen
        setGameEnded(false); // Spiel nicht mehr beendet
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Ergebnis: {gameResult}</h2>
                <button onClick={restartGame}>Neustart</button>
            </div>
        </div>
    );
};

export default End;
