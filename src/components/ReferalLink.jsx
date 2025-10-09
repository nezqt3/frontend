import downBackgroundImage from "../static/downBackgroundImage.svg";
import accountImage from "../static/Account.svg";
import background from "../static/background.png";
import logoImage from "../static/logo.svg";
import copy from "../static/copy logo.svg";
import referalLogo from "../static/referal logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ReferalLink({ user }) {
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);

  const data = [
    {
      photo_url: user.photo_url,
      username: user.username,
      points: 1500,
    },
    {
      photo_url: user.photo_url,
      username: user.username,
      points: 500,
    },
    {
      photo_url: user.photo_url,
      username: user.username,
      points: 300,
    },
    {
      photo_url: user.photo_url,
      username: user.username,
      points: 250,
    },
  ];

  const createReferal = () => {
    const url = `https://t.me/referalApi_bot?start=${user.id}`;
    setLink(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
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
            <p>200</p>
          </header>
          <Link to="/" className="close">
            ← Назад
          </Link>
        </div>
        <div className="referal-link">
          <h1>РЕФЕРАЛКА</h1>
          <p>Приглашай друзей и получай 1% бонусами от стоимости их заказов</p>
          <div className="links">
            {link === "" ? (
              <button onClick={createReferal}>ПРИГЛАСИТЬ</button>
            ) : (
              <div>{link}</div>
            )}
            <button>
              {copied ? (
                <img src={copy} alt="copy" />
              ) : (
                <img src="" alt="complete" />
              )}
            </button>
          </div>
        </div>

        <div className="count-referal-links">
          <div className="top-referals">
            <h2>Ваши рефералы</h2>
            <div className="right-top-referals">
              <p>{data.length}</p>
              <img src={referalLogo} alt="referal logo" />
            </div>
          </div>
          <div className="referals-moments">
            {data.map((elem, index) => {
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
                  <p>+{elem.points}</p>
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
