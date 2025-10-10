import downBackgroundImage from "../static/downBackgroundImage.svg";
import accountImage from "../static/Account.svg";
import background from "../static/background.png";
import line from "../static/lineHistory.svg";
import logoImage from "../static/logo.svg";
import lineOrder from "../static/lineOrder.svg";
import arrowDown from "../static/arrowDown.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Account({ user }) {
  const [openIndexes, setOpenIndexes] = useState([]);
  const [orders, setOrders] = useState([]);

  const toggleOrder = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) {
        return;
      }

      const url = `https://fringelike-milan-misformed.ngrok-free.dev/get_purchases?id=${user.id}`;
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Ошибка HTTP ${response.status}`);
        }

        const json = await response.json();

        const parsed = Array.isArray(json) ? json : Object.values(json);

        setOrders(parsed);
      } catch {
        console.log("error");
      }
    };

    fetchOrders();
  }, [user]);

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
          <p>🧾 user.id: {user.id}</p>
          <p>📊 Всего заказов: {orders.length}</p>
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
                  <p>{elem.name}</p>
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
                      Дата создания - <b>{elem.date}</b>
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
