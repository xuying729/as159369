import React, { useState } from 'react';

export default function BaccaratCalculator() {
  const [cards, setCards] = useState('');
  const [results, setResults] = useState([]);

  const baccaratSum = (cards) => {
    const sum = cards.reduce((acc, card) => acc + (card >= 10 ? 0 : card), 0);
    return sum % 10;
  };

  const playerShouldDraw = (score) => score <= 5;

  const bankerShouldDraw = (score, playerThirdCard, playerDrew) => {
    if (!playerDrew) return score <= 5;
    if (score <= 2) return true;
    if (score === 3) return playerThirdCard !== 8;
    if (score === 4) return playerThirdCard >= 2 && playerThirdCard <= 7;
    if (score === 5) return playerThirdCard >= 4 && playerThirdCard <= 7;
    if (score === 6) return playerThirdCard === 6 || playerThirdCard === 7;
    return false;
  };

  const analyze = () => {
    const allCards = cards
      .split(' ')
      .map((num) => (num.trim().toLowerCase() === 'x' ? 10 : parseInt(num.trim(), 10)))
      .filter((n) => !isNaN(n));

    const tempResults = [];
    let i = 0;

    while (i + 3 < allCards.length) {
      const playerCards = [allCards[i], allCards[i + 2]];
      const bankerCards = [allCards[i + 1], allCards[i + 3]];
      i += 4;

      let playerScore = baccaratSum(playerCards);
      let bankerScore = baccaratSum(bankerCards);
      let playerThirdCard = -1;
      let playerDrew = false;

      if (playerScore < 8 && bankerScore < 8) {
        if (playerShouldDraw(playerScore) && i < allCards.length) {
          playerThirdCard = allCards[i++];
          playerCards.push(playerThirdCard);
          playerScore = baccaratSum(playerCards);
          playerDrew = true;
        }

        if (bankerShouldDraw(bankerScore, playerThirdCard, playerDrew) && i < allCards.length) {
          bankerCards.push(allCards[i++]);
          bankerScore = baccaratSum(bankerCards);
        }
      }

      if (playerScore > bankerScore) tempResults.push(`閒家勝 (閒:${playerScore} vs 莊:${bankerScore})`);
      else if (playerScore < bankerScore) tempResults.push(`莊家勝 (莊:${bankerScore} vs 閒:${playerScore})`);
      else tempResults.push(`和局 (閒:${playerScore} vs 莊:${bankerScore})`);
    }

    setResults(tempResults);
  };

  const clearInput = () => {
    setCards('');
    setResults([]);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">穎穎穎 0880 百家樂勝負計算器</h1>
      <input
        type="text"
        className="border border-gray-300 rounded p-2 w-full"
        placeholder="輸入牌點（空格分隔，如：1 8 7 3 x 2 5）"
        value={cards}
        onChange={(e) => setCards(e.target.value)}
      />
      <div className="flex gap-2 mt-2">
        <button
          onClick={analyze}
          className="bg-blue-500 text-white rounded p-2 w-full"
        >
          計算勝負
        </button>
        <button
          onClick={clearInput}
          className="bg-gray-400 text-white rounded p-2"
        >
          清除
        </button>
      </div>
      <ul className="mt-4">
        {results.map((result, idx) => (
          <li key={idx} className="p-2 border-b border-gray-200">
            {result}
          </li>
        ))}
      </ul>
    </div>
  );
}
