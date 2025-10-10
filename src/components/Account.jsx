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
  const [debug, setDebug] = useState([]); // массив сообщений отладки

  const [pingResult, setPingResult] = useState("");

  const testPing = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/ping");
      const data = await res.json();
      setPingResult(`✅ ${data.message}`);
    } catch (e) {
      setPingResult("❌ Нет соединения с Flask API");
    }
  };

  const log = (msg) => {
    setDebug((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] ${msg}`,
    ]);
  };

  const toggleOrder = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) {
        log("⚠️ user.id отсутствует — запрос не выполняется");
        return;
      }

      const url = `http://127.0.0.1:5000/get_purchases?id=${user.id}`;
      log(`📡 Отправляем запрос: ${url}`);

      try {
        const response = await fetch(url);
        log(`🔍 Ответ: статус ${response.status}`);

        if (!response.ok) {
          throw new Error(`Ошибка HTTP ${response.status}`);
        }

        const json = await response.json();
        log(`📦 Получен JSON: ${JSON.stringify(json)}`);

        const parsed = Array.isArray(json) ? json : Object.values(json);
        log(`✅ После парсинга: ${parsed.length} заказов`);

        setOrders(parsed);
      } catch (error) {
        log(`❌ Ошибка: ${error.message}`);
      }
    };

    testPing();
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

        {/* 🧠 Блок отладки */}
        <div
          style={{
            background: "rgba(0,0,0,0.6)",
            color: "lime",
            fontFamily: "monospace",
            padding: "10px",
            marginTop: "20px",
            borderRadius: "10px",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          <b>🔧 Debug Info:</b>
          <ul>{pingResult}</ul>
        </div>
      </div>

      <img src={logoImage} alt="logo" className="logo" />
    </div>
  );
}
