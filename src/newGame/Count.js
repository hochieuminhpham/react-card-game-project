export const calculateHandValue = (hand) => {
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
