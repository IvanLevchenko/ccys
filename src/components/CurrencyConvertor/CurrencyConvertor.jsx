import React, {useState, useRef} from "react";
import './CurrencyConvertor.scss'

//Elements
import Select from "../../elements/Select/Select";

export default function CurrencyConvertor({currencies}) {
  let [leftSelectedCurrency, setLeftSelectedCurrency] = useState('UAH')
  let [rightSelectedCurrency, setRightSelectedCurrency] = useState('USD')
  let leftValueRef = useRef()
  let rightValueRef = useRef()

  function handleValueChange(value, option, currency, toCurrency) {
    let result
    let isLeft = option == 'left'

    const priceOfCurrency = (curr) => {
      return currencies.find(ccy => ccy.ccy == curr).sale
    }
    
    if(currency == toCurrency) {
      result = value
    } else if(currency == 'UAH') {
      if(toCurrency == 'BTC') {
        let priceUSD = priceOfCurrency('USD')
        let priceBTC = priceOfCurrency('BTC')
        result = (value / priceUSD) / priceBTC
      } else {
        let price = priceOfCurrency(toCurrency)
        result = value / price
      }
    } else {
      if(toCurrency == 'BTC') {
        let priceUSD = priceOfCurrency('USD')
        let priceBTC = priceOfCurrency('BTC')
        if(currency == 'USD') {
          result = value / priceBTC
        } else if(currency == 'UAH') {
          result = (value / priceUSD) / priceBTC
        } else {
          result = ((value / priceOfCurrency(currency)) * priceUSD) / priceBTC
        }
      } else {
        if(currency == 'BTC') {
          let priceBTC = priceOfCurrency('BTC')
          let priceUSD = priceOfCurrency('USD')
          if(toCurrency == 'USD') {
            result = value * priceBTC
          } else if(toCurrency == 'UAH') {
            result = (value * priceUSD) * priceBTC
          } else {
            result = ((value / priceOfCurrency(toCurrency)) * priceUSD) * priceBTC
          }
        } else {
          let price = priceOfCurrency(currency)
          result = toCurrency == 'UAH' ? value * price : (value * price) / priceOfCurrency(toCurrency)
        }
      }
    }
    
    if(!isLeft) {
      rightValueRef.current.value = result
    } else {
      leftValueRef.current.value = result
    }
  }

  return (
    <div className="convertor">
      <div className="convertor-from">
        <input 
          type="number" 
          className="convertor__input" 
          ref={leftValueRef}
          placeholder="Enter value to convert" 
          onChange={(e) => handleValueChange(e.target.value, 'right', leftSelectedCurrency, rightSelectedCurrency)}
        />
        <Select 
          currencies={currencies} 
          onSelectCurrency={currency => {
            setLeftSelectedCurrency(currency)
          }} 
        />
      </div>
      <div className="convertor-to">
        <input
          type="number" 
          ref={rightValueRef}
          onChange={(e) => handleValueChange(e.target.value, 'left', rightSelectedCurrency, leftSelectedCurrency)}
          className="convertor__input" 
          placeholder="Here you'll see a result " 
          />
        <Select 
          currencies={currencies} 
          defaultValue={'USD'}
          onSelectCurrency={currency => {
            setRightSelectedCurrency(currency)
          }} 
        />
      </div>
    </div>
  )
}