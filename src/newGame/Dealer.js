// Hilfsfunktion zum Berechnen des Kartenwerts
const calculateHandValue = (hand) => {
    let totalValue = 0;
    let acesCount = 0;

    // Durchlaufe alle Karten in der Hand
    hand.forEach((card) => {
        if (card && card.value !== "HIDDEN") { // Stelle sicher, dass die Karte nicht "HIDDEN" ist
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

    // Falls zu viele Asse als 11 gezählt wurden und der Wert über 21 ist, zähle Asse als 1
    while (totalValue > 21 && acesCount > 0) {
        totalValue -= 10;
        acesCount -= 1;
    }

    return totalValue;
};

// Funktion zur Überprüfung von Blackjack (Ass + 10/Picture)
const isBlackjack = (hand) => {
    if (hand.length === 2) {
        const values = hand.map(card => card.value);
        return (values.includes("ACE") && (values.includes("10") || values.includes("JACK") || values.includes("QUEEN") || values.includes("KING")));
    }
    return false;
};

// Die Funktion, die den Dealer Karten ziehen lässt
export const dealDealerCards = async (deck, dealerHand, setDealerHand, cardBackImage) => {
    console.log("Dealer Hand vor der Änderung:", dealerHand);
    
    // Berechne den Wert der Dealer-Hand, wobei die verdeckte Karte ignoriert wird
    let dealerValue = calculateHandValue(dealerHand);
    console.log("Dealer Wert vor dem Ziehen:", dealerValue);

    // Überprüfe, ob die zweite Karte des Dealers die "HIDDEN"-Karte ist
    if (dealerHand[1].value === "HIDDEN") {
        // Die zweite Karte wird jetzt aufgedeckt und ersetzt
        const newCardResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
        const newCardData = await newCardResponse.json();
        const newCard = newCardData.cards[0]; // Hole die gezogene Karte
        
        // Ersetze die verdeckte Karte durch die gezogene Karte
        dealerHand[1] = newCard;
    }

    // Überprüfe, ob der Dealer ein Blackjack hat
    if (isBlackjack(dealerHand)) {
        console.log("Dealer hat ein Blackjack!");
        setDealerHand([...dealerHand]);
        return; // Dealer zieht keine weiteren Karten, wenn er ein Blackjack hat
    }

    // Ziehe so lange Karten, bis der Wert des Dealers mindestens 17 ist
    while (dealerValue < 17) {
        try {
            // Ziehe eine neue Karte
            const newCardResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
            const newCardData = await newCardResponse.json();
            const newCard = newCardData.cards[0]; // Hole die gezogene Karte
            
            // Füge die neue Karte zur Dealer-Hand hinzu
            dealerHand.push(newCard);

            // Berechne den neuen Wert der Dealer-Hand
            dealerValue = calculateHandValue(dealerHand);
            console.log("Neuer Dealer Wert:", dealerValue);

            // Aktualisiere den Dealer-Hand State
            setDealerHand([...dealerHand]);

        } catch (error) {
            console.error("Fehler beim Ziehen der Karte:", error);
            break; // Bei einem Fehler breche ab
        }
    }

    console.log("Dealer Hand nach dem Ziehen:", dealerHand);
};
