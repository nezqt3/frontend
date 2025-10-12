import downBackgroundImage from "../static/downBackgroundImage.svg";
import accountImage from "../static/Account.svg";
import background from "../static/background.png";
import logoImage from "../static/logo.svg";
import copy from "../static/copy logo.svg";
import referalLogo from "../static/referal logo.svg";
import { Link } from "react-router-dom";
import complete from "../static/icons8-галочка.svg";
import { useState, useEffect, useCallback } from "react";

export default function ReferalLink({
  user,
  sumPoints,
  ref,
  referrals,
  setRefferals,
}) {
  const [copied, setCopied] = useState(false);
  const [newReferrals, setNewReferrals] = useState([]);

  const sendReferralLink = async (url) => {
    try {
      const tgShareLink = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${ref}`;

      if (window.Telegram?.WebApp?.openTelegramLink) {
        window.Telegram.WebApp.openTelegramLink(tgShareLink);
      } else if (window.Telegram?.WebApp?.openLink) {
        window.Telegram.WebApp.openLink(tgShareLink);
      } else {
        await navigator.clipboard.writeText(ref);
        alert("Ссылка скопирована в буфер обмена");
      }
    } catch (err) {
      console.error("Ошибка при пересылке ссылки:", err);
    }
  };

  const createReferal = useCallback(async () => {
    if (!user?.id) return;

    const url = `https://t.me/ghosted404_bot?start=${user.id}`;

    try {
      const response = await fetch(
        "https://rupl.pythonanywhere.com/referral_link",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user.id,
            referral_link: url,
          }),
        },
      );

      const data = await response.json();
      if (data.status === "success") {
        console.log("Реферальная ссылка обновлена на сервере:", data.data);
        setRefferals(url);
        return url;
      } else {
        console.error("Ошибка обновления ссылки:", data.message);
      }
    } catch (error) {
      console.error("Ошибка при PUT-запросе:", error);
    }
  }, [user?.id, setRefferals]);

  useEffect(() => {
    createReferal();
    setNewReferrals(
      referrals.filter(
        (elem) =>
          elem.for_this.includes("Пригласил") ||
          elem.for_this.includes("Регистрация"),
      ),
    );
  }, [createReferal, setNewReferrals, referrals]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ref);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Ошибка копирования: ", err);
    }
  };

  return (
    <div className="referal">
      <img
        src={downBackgroundImage}
        alt="backgroundImage"
        className="background-image"
      />
      <img src={background} alt="background" className="background" />

      <div className="referal__container">
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
        <div className="referal-link">
          <h1>РЕФЕРАЛКА</h1>
          <p>Приглашай друзей и получай 1% бонусами от стоимости их заказов</p>
          <div className="links">
            <button
              onClick={async () => {
                sendReferralLink();
              }}
            >
              ПРИГЛАСИТЬ
            </button>

            <button
              onClick={handleCopy}
              className={`copy-btn ${copied ? "copied" : ""}`}
            >
              <img
                src={copied ? complete : copy}
                alt={copied ? "complete" : "copy"}
                className={`icon ${copied ? "icon-bounce" : ""}`}
              />
            </button>
          </div>
        </div>

        <div className="count-referal-links">
          <div className="top-referals">
            <h2>Ваши рефералы</h2>
            <div className="right-top-referals">
              <p>{newReferrals.length}</p>
              <img src={referalLogo} alt="referal logo" />
            </div>
          </div>
          <div className="referals-moments">
            {newReferrals.map((elem, index) => {
              return (
                <div key={index} className="referal-block">
                  <div>
                    <p className="number">{index + 1}.</p>
                    <img
                      src={elem.photo_url}
                      alt={`image-${index}`}
                      className="photo-user"
                    />
                    <p>{elem.username}</p>
                  </div>
                  <p>+{elem.count}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <img src={logoImage} alt="logo" className="logo" />
    </div>
  );
}
