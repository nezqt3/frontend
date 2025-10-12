import downBackgroundImage from "../static/downBackgroundImage.svg";
import accountImage from "../static/Account.svg";
import background from "../static/background.png";
import logoImage from "../static/logo.svg";
import update from "../static/update.svg";
import line from "../static/lineHistory.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MainPage({ fetchData, sumPoints, referrals }) {
  const [rotating, setRotating] = useState(false);

  const handleClick = async () => {
    setRotating(true);
    await fetchData();

    setRotating(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "11.11.2024";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // месяцы с 0
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="main-page">
      <img
        src={downBackgroundImage}
        alt="backgroundImage"
        className="background-image"
      />
      <img src={background} alt="background" className="background" />

      <div className="main-page__container">
        <div className="header-block">
          <header>
            <Link to="account">
              <img src={accountImage} alt="account" />
            </Link>
          </header>
        </div>

        <div className="points-block">
          <div className="infoBlock-points">
            <p>баллы можно списать при заказе</p>
          </div>
          <div className="show-pointsBlock">
            <h1>БАЛЛЫ</h1>
            <div className="points-data">
              <p>{sumPoints}</p>
            </div>
            <div className="block-with-cashback">
              <div className="cashback">
                <span>кэшбек от покупки</span>
                <p>3%</p>
              </div>
              <img
                src={update}
                alt="update"
                className={`update ${rotating ? "rotate" : ""}`}
                onClick={handleClick}
              />
            </div>
          </div>
          <div className="buttons">
            <Link to="/order">
              <button>ОФОРМИТЬ ЗАКАЗ</button>
            </Link>
            <a href="https://t.me/ghostedmng">
              <button>СВЯЗАТЬСЯ С МЕНЕДЖЕРОМ</button>
            </a>
            <Link to="/referal">
              <button>РЕФЕРАЛКА</button>
            </Link>
          </div>
          <div className="history">
            <h2>ИСТОРИЯ ПОПОЛНЕНИЙ</h2>
            <img src={line} alt="line" className="line" />
            <div className="history-list">
              {referrals.map((elem, index) => {
                return (
                  <div key={index}>
                    <div>
                      <span>{formatDate(elem.date)}</span>
                      <p>
                        {elem.for_this.includes("Пригласил") ||
                        elem.for_this.includes("Регистрация")
                          ? "Реферальная ссылка"
                          : elem.for_this}
                      </p>
                    </div>
                    <p className="add-points">+{elem.count}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <img src={logoImage} alt="logo" className="logo" />
    </div>
  );
}
