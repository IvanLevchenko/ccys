import { useEffect, useState } from 'react';
import './App.scss';

//API
import {getActualCurrencies, getArchiveCurrencies} from './api/api';

//Components
import Header from './components/Header/Header';
import CurrencyConvertor from './components/CurrencyConvertor/CurrencyConvertor'
import Loader from './elements/Loader/Loader'
import Chart from './components/Chart/Chart';

function App() {
  let [currencies, setCurrencies] = useState([])
  let [chartData, setChartData] = useState([])
  let [isPending, setPending] = useState(true)

  useEffect(() => {
    getActualCurrencies().then(response => {
      setCurrencies(response.data)
    })
    getArchiveCurrencies().then(response => {
      setChartData(response.data)
      setPending(false)
    })
  }, [])

  return (
    <div className="App">
      <Header currencies={currencies} />
      <CurrencyConvertor currencies={currencies} />
      {isPending 
      ? <Loader /> 
      : <Chart chartData={chartData} />
      }
    </div>
  );
}

export default App;
