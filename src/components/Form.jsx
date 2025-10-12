import { useState } from "react";
import downBackgroundImage from "../static/downBackgroundImage.svg";
import accountImage from "../static/Account.svg";
import background from "../static/background.png";
import logoImage from "../static/logo.svg";
import { Link } from "react-router-dom";

export default function Form({ sumPoints, user }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [url, setUrl] = useState("");
  const [size, setSize] = useState("");
  const [count, setCount] = useState("");
  const [promocode, setPromocode] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState("");
  const [hideNotification, setHideNotification] = useState(false);

  const TELEGRAM_BOT_TOKEN = "8463311328:AAEIeCXI6-aYPrLiZX3GrnoOrYHawmSQoyA";
  const CHAT_ID = "6216832500";

  const showNotification = (text) => {
    setNotification(text);
    setHideNotification(false);

    setTimeout(() => setHideNotification(true), 4000); // через 4 сек начнется исчезновение
    setTimeout(() => setNotification(""), 5000); // через 5 сек полностью убираем
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    // Проверка обязательных полей
    if (
      !name.trim() ||
      !address.trim() ||
      !url.trim() ||
      !size.trim() ||
      !count.trim()
    ) {
      showNotification("❌ Пожалуйста, заполните все обязательные поля.");
      return;
    }

    setIsSubmitting(true);

    const message = `
Айди пользователя: ${user.id}
Юзернейм: ${user.username}
Новый заказ:
Наименование: ${name}
Адрес: ${address}
Ссылка: ${url}
Размер: ${size}
Количество: ${count}
Промокод: ${promocode || "—"}
    `;

    try {
      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
        },
      );

      // Очистка формы
      setName("");
      setAddress("");
      setUrl("");
      setSize("");
      setCount("");
      setPromocode("");

      showNotification("✅ Заказ отправлен! Наш менеджер свяжется с вами.");
    } catch (error) {
      console.error("Ошибка при отправке в Telegram:", error);
      showNotification("❌ Ошибка при отправке заказа. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form">
      <img
        src={downBackgroundImage}
        alt="backgroundImage"
        className="background-image"
      />
      <img src={background} alt="background" className="background" />

      <div className="form__container">
        <div className="header-block">
          <header>
            <Link to="account">
              <img src={accountImage} alt="account" />
            </Link>
            <p>{sumPoints}</p>
          </header>
          <Link to="/" className="close">
            ← Назад
          </Link>
        </div>

        <h1>ОФОРМЛЕНИЕ ЗАКАЗА</h1>

        <div className="form-inputs">
          <p>ВВЕДИТЕ ДАННЫЕ О ТОВАРЕ</p>
          <input
            type="text"
            placeholder="Наименование*"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Адрес*"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ссылка*"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Размер*"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <input
            type="text"
            placeholder="Количество*"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
          <input
            type="text"
            placeholder="Промокод"
            value={promocode}
            onChange={(e) => setPromocode(e.target.value)}
          />
          <button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Отправка..." : "ЗАКАЗАТЬ"}
          </button>
        </div>

        {notification && (
          <p className={`notification ${hideNotification ? "hide" : ""}`}>
            {notification}
          </p>
        )}

        <p className="manager">
          Наш менеджер свяжется с вами в ближайшее время
        </p>
      </div>

      <img src={logoImage} alt="logo" className="logo" />
    </div>
  );
}
