import { useState, useEffect } from "react";
import downBackgroundImage from "../static/downBackgroundImage.svg";
import accountImage from "../static/Account.svg";
import background from '../static/background.png'
import logoImage from "../static/logo.svg";
import { Link } from "react-router-dom";

export default function Form() {

    // const [name, setName] = useState('')
    // const [address, setAddress] = useState('')
    // const [url, setUrl] = useState('')
    // const [size, setSize] = useState('')
    // const [count, setCount] = useState('')
    // const [promocode, setPromocode] = useState('')

    return (
    <div className="form">
          <img src={downBackgroundImage} alt="backgroundImage" className="background-image" />
          <img src={background} alt="background" className="background" />
    
          <div className="form__container">
            <div className="header-block">
              <header>
                <Link to='account'>
                  <img src={accountImage} alt="account" />
                </Link>
                <p>1200</p>
              </header>
              <Link to='/' className="close">← Назад</Link>
            </div>

            <h1>ОФОРМЛЕНИЕ ЗАКАЗА</h1>

            <div className="form-inputs">
                <p>ВВЕДИТЕ ДАННЫЕ О ТОВАРЕ</p>
                <input type="text" placeholder="Наименование" onFocus={e => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })}/>
                <input type="text" placeholder="Адрес" onFocus={e => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })}/>
                <input type="text" placeholder="Ссылка" onFocus={e => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })}/>
                <input type="text" placeholder="Размер" onFocus={e => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })}/>
                <input type="text" placeholder="Количество" onFocus={e => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })}/>
                <input type="text" placeholder="Промокод" onFocus={e => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })}/>
                <button>ЗАКАЗАТЬ</button>
            </div>
            <p className="manager">Наш менеджер свяжется с вами в ближайшее время</p>
          </div>
          <img src={logoImage} alt="logo" className="logo" />
        </div>)

}