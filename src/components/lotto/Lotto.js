import React, { useState } from "react";
import LottoStyles from "../../assets/style/Lotto.module.css";

const Lotto = () => {
  const path = process.env.PUBLIC_URL;
  const [lottoNumbers, setLottoNumbers] = useState([]);
  const [isWinner, setIsWinner] = useState(false);

  const LottoNumbers = () => {
    const newNumbers = [];
    while (newNumbers.length < 6) {
      const randomNumber = Math.floor(Math.random() * 45) + 1;
      if (!newNumbers.includes(randomNumber)) {
        newNumbers.push(randomNumber);
      }
    }
    setLottoNumbers(newNumbers.sort((a, b) => a - b));

    // Always set to false to ensure it's a losing outcome
    setIsWinner(false);
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div>
      <h1 className={LottoStyles.lucky}>행운의 번호 추첨기</h1>
      <div style={{ position: "relative" }} className={LottoStyles.imgWrapper}>
        <img
          className={LottoStyles.coin}
          src={`${path}/images/동전뽑기기계.svg`}
          alt="machine"
        />
        <img
          className={LottoStyles.handle}
          onClick={LottoNumbers}
          src={`${path}/images/동전뽑기손잡이.svg`}
          alt="handle"
        />
      </div>
      {lottoNumbers.length > 0 && (
        <div className={LottoStyles.todayNumbersContainer}>
          <h2>오늘의 번호</h2>
          <ul className={LottoStyles.numul}>
            {lottoNumbers.map((number, index) => (
              <li
                key={index}
                style={{ backgroundColor: getRandomColor() }}
                className={LottoStyles.num}>
                {number}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Lotto;
