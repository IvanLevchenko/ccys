import React from 'react'
import { useState } from 'react'
import './Select.scss'

export default function Select({currencies, defaultValue, onSelectCurrency}) {

  let [selected, setSelected] = useState(defaultValue || 'UAH')

  const handleChange = (value) => {
    onSelectCurrency(value)
    setSelected(value)
  }

  return (
    <select 
      className="convertor__select" 
      onChange={(e) => handleChange(e.target.value)}
      value={selected}
    >
      <option>UAH</option>
      {currencies.map(currency => {
        return (
          <option 
            key={Math.random()}
          >{currency.ccy}</option>
        )
      })}
    </select>
  )
}