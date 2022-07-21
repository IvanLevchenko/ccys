import React, {useState, useRef} from "react";
import './CurrencyConvertor.scss'

//Elements
import Select from "../../elements/Select/Select";

export default function CurrencyConvertor({currencies}) {
  let [selectedFromCurrency, setSelectedFromCurrency] = useState('UAH')
  let [selectedToCurrency, setSelectedToCurrency] = useState('USD')
  let [toValue, setToValue] = useState()
  let [fromValue, setFromValue] = useState()
  let leftValueRef = useRef()
  let rightValueRef = useRef()

  function handleValueChange(value, option) {
    let result
    let isLeft = option == 'left'

    const priceOfCurrency = (curr) => {
      return currencies.find(ccy => ccy.ccy == curr).sale
    }

    if(selectedFromCurrency == 'UAH' && selectedToCurrency !== 'UAH' && selectedToCurrency !== 'BTC') {
      let price = priceOfCurrency(selectedToCurrency)
      result = (!isLeft ? value / +price : +price * value)?.toPrecision() 
    } else if(selectedFromCurrency !== 'UAH' && selectedToCurrency == 'UAH' && selectedFromCurrency !== 'BTC') {
      let price = priceOfCurrency(selectedFromCurrency)
      result = (!isLeft ? value / +price : +price * value)?.toPrecision()
    } else if(selectedFromCurrency == selectedToCurrency) {
      result = value
    } else {
      if(selectedToCurrency == 'BTC' && selectedFromCurrency !== 'BTC') {
        if(selectedFromCurrency == 'UAH') {
          let price = priceOfCurrency('USD')
          result = 
            !isLeft 
            ? (((value / +price)?.toPrecision()) / priceOfCurrency('BTC'))?.toPrecision()
            : (priceOfCurrency('BTC') / ((value / +price)?.toPrecision()))?.toPrecision()
        } else if(isLeft && selectedFromCurrency == 'USD' || !isLeft && selectedToCurrency == 'USD') {
          let price = priceOfCurrency(selectedToCurrency)
          result = (!isLeft ? value / +price : +price * value)?.toPrecision()
        } else {
          let price = priceOfCurrency(selectedFromCurrency)
          result = 
            !isLeft 
            ? (((+price * value) / priceOfCurrency('USD'))) / priceOfCurrency('BTC')
            : priceOfCurrency('BTC') * (((+price * value) / priceOfCurrency('USD')))
        }
      } else if(selectedFromCurrency !== 'BTC' && selectedToCurrency !== 'BTC') {
        let price = priceOfCurrency(selectedFromCurrency)
        result = 
          !isLeft 
          ? (value * +price) / +priceOfCurrency(selectedToCurrency) 
          : +priceOfCurrency(selectedToCurrency) / (+price / value)
      } else if(selectedFromCurrency == 'BTC'){
        if(selectedToCurrency == 'USD') {
          let price = priceOfCurrency(selectedFromCurrency)
          result = (!isLeft ? +price * value : value / +price)?.toPrecision()
        } else if(selectedToCurrency == 'UAH') {
          let price = priceOfCurrency('USD')
          result = 
            !isLeft
            ? (priceOfCurrency(selectedFromCurrency) / (value / +price)?.toPrecision()).toPrecision()
            : ((value / +price)?.toPrecision() / priceOfCurrency(selectedFromCurrency)).toPrecision()
        } else {
          let price = priceOfCurrency(selectedFromCurrency)
          result = 
            !isLeft 
            ? (+price * (value * (priceOfCurrency('USD') / priceOfCurrency(selectedToCurrency))))?.toPrecision()
            : ((value * (priceOfCurrency('USD') / priceOfCurrency(selectedToCurrency))) / +price)?.toPrecision()
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
          onChange={(e) => handleValueChange(e.target.value, 'right')}
        />
        <Select 
          currencies={currencies} 
          onSelectCurrency={currency => {
            handleValueChange(leftValueRef.current.value, 'left')
            setSelectedFromCurrency(currency)
          }} 
        />
      </div>
      <div className="convertor-to">
        <input
          type="number" 
          ref={rightValueRef}
          onChange={(e) => handleValueChange(e.target.value, 'left')}
          className="convertor__input" 
          placeholder="Here you'll see a result " 
          />
        <Select 
          currencies={currencies} 
          defaultValue={'USD'}
          onSelectCurrency={currency => {
            handleValueChange(rightValueRef.current.value, 'right')
            setSelectedToCurrency(currency)
          }} 
        />
      </div>
    </div>
  )
}