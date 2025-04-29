// newGame/Deal.js
export const dealCards = async (deck, setDeck, setPlayerHand, setDealerHand, cardBackImage) => {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=4`);
    const data = await response.json();

    const cards = data.cards.map(card => ({
        code: card.code,
        image: card.image,
        value: card.value,
        suit: card.suit
    }));

    // Spieler bekommt Karte 0 und 2, Dealer Karte 1 und verdeckt (als Platzhalter)
    setPlayerHand([cards[0], cards[2]]);
    setDealerHand([
        cards[1],
        { image: cardBackImage, value: "HIDDEN", suit: "HIDDEN", code: "XX" } // verdeckte Karte
    ]);
    setDeck(prev => ({ ...prev, remaining: data.remaining }));
};

