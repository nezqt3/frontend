// import { useState } from "react";
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
                <p>200</p>
              </header>
              <Link to='/' className="close">← Назад</Link>
            </div>

            <h1>ОФОРМЛЕНИЕ ЗАКАЗА</h1>

            <div className="form-inputs">
                <p>ВВЕДИТЕ ДАННЫЕ О ТОВАРЕ</p>
                <input type="text" placeholder="Наименование"/>
                <input type="text" placeholder="Адрес"/>
                <input type="text" placeholder="Ссылка"/>
                <input type="text" placeholder="Размер"/>
                <input type="text" placeholder="Количество"/>
                <input type="text" placeholder="Промокод"/>
                <button>ЗАКАЗАТЬ</button>
            </div>
            <p className="manager">Наш менеджер свяжется с вами в ближайшее время</p>
    
            <img src={logoImage} alt="logo" className="logo" />
          </div>
        </div>)

}