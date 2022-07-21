import React from "react";
import './Header.scss'

export default function Header({currencies}) {

  return (
    <header className="header">
      <h2 className="header__title">Exchange rates</h2>
      <div className="header__actual-currencies">
        {currencies.map(currency => {
          return (
            <div className="header__actual-currency" key={Math.random()}>
              <span className="header__actual-currency-name">{currency.ccy}</span>
              <span className="header__actual-currency-value">{currency.sale}</span>
            </div>
          )
        })}
      </div>
    </header>
  )
}