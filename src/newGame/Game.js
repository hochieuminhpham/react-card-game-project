import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import './Game.css';

function Game() {
    const cardBackImage = "https://deckofcardsapi.com/static/img/back.png";
    const [deck, setDeck] = useState(null);
    const [cardInHand, setCardInHand] = useState([]);

    useEffect(() => {
        // Fetch new shuffled deck on mount
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=5')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                setDeck(data);
            });
    }, []);

    const getCardNumericValue = (value) => {
        if (["KING", "QUEEN", "JACK"].includes(value)) {
            return 10;
        } else if (value === "ACE") {
            return 11; // In vereinfachter Variante = 11
        } else {
            return parseInt(value);
        }
    };

    const calculateTotalHandValue = () => {
        let total = 0;
        let aceCount = 0;

        cardInHand.forEach(card => {
            const cardValue = getCardNumericValue(card.value);
            total += cardValue;
            if (card.value === "ACE") aceCount++;
        });

        // Ass als 1 zählen, wenn 11 zu viel ist
        while (total > 21 && aceCount > 0) {
            total -= 10; // mache aus einem Ass (11) ein Ass (1)
            aceCount--;
        }

        return total;
    };

    const initDraw = () => {
        if (deck) {
            fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then((data) => {
                    const filteredCards = data.cards.map(card => ({
                        code: card.code,
                        image: card.image,
                        value: card.value,
                        suit: card.suit
                    }));
                    setCardInHand(prev => [...prev, ...filteredCards]);
                    setDeck(data);
                });
        }
    };

    const draw = () => {
        console.log('draw a card');
        initDraw();
    };
    return (
        <div className="body-container">
            <div className="game-container">
                <div className="dealer-container">
                    Dealer Karten
                </div>
                <div className="player-container">
                    <div className="card-container">
                    {cardInHand.map((card, index) => (
                        <div key={index}>
                            <img src={card.image} alt={`${card.value} of ${card.suit}`} />
                            {/* <p>{card.value} of {card.suit}</p> */}
                        </div>
                    ))}
                </div>
                </div>
            </div>
            <div className="game-actions">
            <button onClick={draw}>draw a card (hit)</button>
                Stand Hit Double Split</div>
        </div>
    );
}

export default Game;
