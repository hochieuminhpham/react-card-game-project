export const dealCards = async (deck, setDeck, setPlayerHand, setDealerHand, cardBackImage) => {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=4`);
    const data = await response.json();

    const cards = data.cards.map(card => ({
        code: card.code,
        image: card.image,
        value: card.value,
        suit: card.suit
    }));
    setPlayerHand([cards[0], cards[2]]);
    setDealerHand([
        cards[1],
        { image: cardBackImage, value: "HIDDEN", suit: "HIDDEN", code: "XX" }
    ]);
    setDeck(prev => ({ ...prev, remaining: data.remaining }));
};

