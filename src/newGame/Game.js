import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import './Game.css';

function Game() {
    const [deck, setDeck] = useState(null);
    const [cardInHand, setCardInHand] = useState([]);

    useEffect(() => {
        // Fetch new shuffled deck on mount
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                setDeck(data);
            });
    }, []);
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
                    setCardInHand(prev => [...prev, ...filteredCards]);// Spread to add new cards to the hand
                    setDeck(data)
                });
        }
    }
    const draw = () => {
        console.log('draw a card')
        initDraw()
    }

    return (
        <div>
            <h1>Welcome to Black Jack</h1>
            {deck ? <p>Remaining cards in deck: {deck.remaining}</p> : <p>Loading deck...</p>}

            <div>
                <button onClick={draw}>draw a card (hit)</button>
            </div>

            <div>
                <p>Cards in hand:</p>
                <div className="card-container">
                    {cardInHand.map((card, index) => (
                        <div key={index}>
                            <img src={card.image} alt={`${card.value} of ${card.suit}`} />
                            <p>{card.value} of {card.suit}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Link to="/">Go Back Home</Link>
        </div>
    );
}

export default Game;
