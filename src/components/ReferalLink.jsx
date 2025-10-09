import downBackgroundImage from "../static/downBackgroundImage.svg";
import accountImage from "../static/Account.svg";
import background from '../static/background.png'
import logoImage from "../static/logo.svg";
import copy from '../static/copy logo.svg'
import referalLogo from '../static/referal logo.svg'
import { Link } from "react-router-dom";

export default function ReferalLink({user}) {

    const data = [
        {
            photo_url: user.photo_url,
            username: user.username,
            points: 1500
        },
        {
            photo_url: user.photo_url,
            username: user.username,
            points: 1500
        },
        {
            photo_url: user.photo_url,
            username: user.username,
            points: 1500
        },
        {
            photo_url: user.photo_url,
            username: user.username,
            points: 1500
        }
    ]

    return (<div className="referal">
          <img src={downBackgroundImage} alt="backgroundImage" className="background-image" />
          <img src={background} alt="background" className="background" />
    
          <div className="referal__container">
            <div className="header-block">
              <header>
                <img src={accountImage} alt="account" />
                <p>200</p>
              </header>
              <Link to='/' className="close">← Назад</Link>

            </div>
            <div className="referal-link">
                <h1>РЕФЕРАЛКА</h1>
                <p>Приглашай друзей и получай 1% бонусами от стоимости их заказов</p>
                <div className="links">
                    <button>ПРИГЛАСИТЬ</button>
                    <button><img src={copy} alt="copy"/></button>
                </div>
            </div>

            <div className="count-referal-links">
                <div className="top-referals">
                    <h2>Ваши рефералы</h2>
                    <div className='right-top-referals'>
                        <p>{data.length}</p>
                        <img src={referalLogo} alt="referal logo"/>
                    </div>
                </div>
                <div className="feferals-moments">
                    {data.map((elem, index) => {
                        return (<div key={index}>
                            <p>{index + 1}</p>
                            <img src={elem.photo_url} alt={`image-${index}`}/>
                            <p>{elem.username}</p>
                            <p>+{elem.points}</p>
                        </div>)
                    })}
                </div>
            </div>
            <img src={logoImage} alt="logo" className="logo" />
            </div>
    </div>
    )
}