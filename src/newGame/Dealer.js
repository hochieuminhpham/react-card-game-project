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
export const dealDealerCards = async (deck, dealerHand, setDealerHand, cardBackImage,setGameEnded) => {
    let dealerValue = calculateHandValue(dealerHand);
    if (dealerHand[1].value === "HIDDEN") {
        const newCardResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
        const newCardData = await newCardResponse.json();
        const newCard = newCardData.cards[0];
        dealerHand[1] = newCard;
        dealerValue = calculateHandValue(dealerHand);
        setDealerHand([...dealerHand]);
    }
    while (dealerValue < 17) {
        try {
            const newCardResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
            const newCardData = await newCardResponse.json();
            const newCard = newCardData.cards[0];
            dealerHand.push(newCard);
            dealerValue = calculateHandValue(dealerHand);
            setDealerHand([...dealerHand]);
        } catch (error) {
            break;
        }
    }
    setGameEnded(true);
};
