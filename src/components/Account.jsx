import downBackgroundImage from "../static/downBackgroundImage.svg";
import accountImage from "../static/Account.svg";
import background from "../static/background.png";
import line from "../static/lineHistory.svg";
import logoImage from "../static/logo.svg";
import lineOrder from "../static/lineOrder.svg";
import arrowDown from "../static/arrowDown.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Account({ user }) {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleOrder = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const orders = [
    {
      nameOfOrder: "Футболка",
      dateOfCreate: "08.09.2024",
      address: "г. Ростов-на-Дону, Ворошиловский проспект 34",
      size: "M",
      count: 1,
      cost: 16800,
    },
    {
      nameOfOrder: "Толстовка",
      dateOfCreate: "12.09.2024",
      address: "г. Ростов-на-Дону, Ворошиловский проспект 34",
      size: "M",
      count: 1,
      cost: 16800,
    },
    {
      nameOfOrder: "Кроссовки",
      dateOfCreate: "20.09.2024",
      address: "г. Ростов-на-Дону, Ворошиловский проспект 34",
      size: "M",
      count: 1,
      cost: 16800,
    },
    {
      nameOfOrder: "Футболка",
      dateOfCreate: "04.09.2024",
      address: "г. Ростов-на-Дону, Ворошиловский проспект 34",
      size: "M",
      count: 1,
      cost: 16800,
    },
  ];

  return (
    <div className="account">
      <img
        src={downBackgroundImage}
        alt="backgroundImage"
        className="background-image"
      />
      <img src={background} alt="background" className="background" />

      <div className="account__container">
        <div className="header-block">
          <Link to="/" className="close">
            ← Назад
          </Link>
        </div>

        <div className="info-about-user">
          <img src={accountImage} alt="photo_user" className="photo_user" />
          <div className="username">
            <p>@{user.username}</p>
          </div>
        </div>

        <div className="history-orders">
          <h2>ИСТОРИЯ ЗАКАЗОВ</h2>
          <img src={line} alt="line" className="line" />
        </div>

        <div className="orders">
          {orders.map((elem, index) => {
            const isOpen = openIndexes.includes(index);
            return (
              <div className="order" key={index}>
                <div
                  className="order-header"
                  onClick={() => toggleOrder(index)}
                >
                  <img
                    src={arrowDown}
                    alt="arrow-down"
                    className={`arrow ${isOpen ? "rotated" : ""}`}
                  />
                  <p>{index + 1}.</p>
                  <p>{elem.nameOfOrder}</p>
                  <img
                    src={lineOrder}
                    alt="line-order"
                    className="line-order"
                  />
                  <p>{elem.cost}</p>
                </div>
                {isOpen && (
                  <div className="upper-block">
                    <p>
                      Дата создания - <b>{elem.dateOfCreate}</b>
                    </p>
                    <p>Адрес - {elem.address}</p>
                    <p>
                      Размер - <b>{elem.size}</b>
                    </p>
                    <p>
                      Количество - <b>{elem.count} шт</b>
                    </p>
                    <b>Итог - 16800 ₽</b>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <img src={logoImage} alt="logo" className="logo" />
    </div>
  );
}
