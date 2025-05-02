export const hit = (deck, setDeck, setPlayerHand) => {
    fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
        .then((response) => response.json())
        .then((data) => {
            const card = data.cards[0];
            setPlayerHand((prev) => [...prev, card]);
            setDeck(data);
        });
};
export const stand = (setGameStarted, setPlayerTurn) => {
    setPlayerTurn(false);
    setGameStarted(true);
};
export const double = (deck, setDeck, setPlayerHand, setGameStarted, setPlayerTurn) =>{
    fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
        .then((response) => response.json())
        .then((data) => {
            const card = data.cards[0];
            setPlayerHand((prev) => [...prev, card]);
            setDeck(data);
        });
        setPlayerTurn(false);
        setGameStarted(true);  
}