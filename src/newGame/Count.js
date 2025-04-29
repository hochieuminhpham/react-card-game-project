export const calculateHandValue = (hand) => {
    let totalValue = 0;
    let acesCount = 0;

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
