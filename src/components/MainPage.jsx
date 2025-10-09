import downBackgroundImage from "../static/downBackgroundImage.svg";
import accountImage from "../static/Account.svg";
import background from '../static/background.png'
import logoImage from "../static/logo.svg";
import update from '../static/update.svg'
import line from '../static/lineHistory.svg'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MainPage() {

    const [points, setPoints] = useState(200)

    const [rotating, setRotating] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        setPoints(200)
        if (typeof window !== "undefined" && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready();

        if (tg.initDataUnsafe?.user) {
            setUser(tg.initDataUnsafe.user);
        } else {
            console.warn("Telegram user data not available");
        }
        } else {
            console.warn("Telegram WebApp not found");
        }
    }, []) 
    const data = [
        {
            date: "08.10",
            what: "Бонус за покупку",
            add_points: 200
        },

        {
            date: "08.10",
            what: "Бонус за покупку",
            add_points: 200
        },

        {
            date: "08.10",
            what: "Бонус за покупку",
            add_points: 200
        },

        {
            date: "08.10",
            what: "Бонус за покупку",
            add_points: 200
        },
        {
            date: "08.10",
            what: "Бонус за покупку",
            add_points: 200
        },

        {
            date: "08.10",
            what: "Бонус за покупку",
            add_points: 200
        },

        {
            date: "08.10",
            what: "Бонус за покупку",
            add_points: 200
        },

        {
            date: "08.10",
            what: "Бонус за покупку",
            add_points: 200
        },
        {
            date: "08.10",
            what: "Бонус за покупку",
            add_points: 200
        },

        {
            date: "08.10",
            what: "Бонус за покупку",
            add_points: 200
        },

        {
            date: "08.10",
            what: "Бонус за покупку",
            add_points: 200
        },

        {
            date: "08.10",
            what: "Бонус за покупку",
            add_points: 200
        },
    ]

  const handleClick = () => {
    setRotating(true);
    setTimeout(() => setRotating(false), 500);

    console.log(user)
  };

  return (
    <div className="main-page">
      <img src={downBackgroundImage} alt="backgroundImage" className="background-image" />
      <img src={background} alt="background" className="background" />

      <div className="main-page__container">
        <header>
          <img src={accountImage} alt="account" />
        </header>

        <div className="points-block">
            <div className="infoBlock-points">
                <p>баллы можно списать при заказе</p>
            </div>
            <div className="show-pointsBlock">
                {user && user.first_name ? <p>{user.first_name}</p> : <p>Nothing</p>}
                <h1>БАЛЛЫ</h1>
                <div className="points-data">
                    <p>{points}</p>
                </div>
                <div className="block-with-cashback">
                    <div className="cashback">
                        <span>кэшбек от покупки</span>
                        <p>3%</p>
                    </div>
                    <img src={update} alt="update" className={`update ${rotating ? "rotate" : ""}`} onClick={handleClick}/>
                </div>
            </div>
            <div className="buttons">
                <Link to='/order'>
                    <button>
                            ОФОРМИТЬ ЗАКАЗ
                    </button>
                </Link>
                <button>
                    СВЯЗАТЬСЯ С МЕНЕДЖЕРОМ
                </button>
                <button>
                    РЕФЕРАЛКА
                </button>
            </div>
            <div className="history">
                <h2>ИСТОРИЯ ПОПОЛНЕНИЙ</h2>
                <img src={line} alt="line" className="line"/>
                <div className="history-list">
                {data.map((elem, index) => {
                    return <div key={index}>
                        <div>
                            <span>{elem.date}</span>
                            <p>{elem.what}</p>
                        </div>
                            <p className="add-points">+{elem.add_points}</p>
                        </div>
                })}
                </div>
            </div>
        </div>
        <img src={logoImage} alt="logo" className="logo" />
      </div>
    </div>
  );
}
