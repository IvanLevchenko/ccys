import { useEffect, useState } from 'react';
import './App.scss';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

//API
import {getActualCurrencies, getArchiveCurrencies} from './api/api';

//Components
import Header from './components/Header/Header';
import CurrencyConvertor from './components/CurrencyConvertor/CurrencyConvertor'
import {Line} from 'react-chartjs-2'
import Loader from './elements/Loader/Loader'

function App() {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

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

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Rates changing',
      },
    },
  };
  
  const labels = []
  chartData.forEach(data => labels.push(data.date))
  
  let chartUSDValues = []
  let chartEURValues = []

  chartData.forEach(data => {
    data.exchangeRate.forEach(ccys => {
      if(ccys.currency == 'USD') chartUSDValues.push(ccys.saleRate)
      if(ccys.currency == 'EUR') chartEURValues.push(ccys.saleRate)
    })
  })
  const data = {
    labels,
    datasets: [
      {
        data: chartUSDValues,
        label: 'USD',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        data: chartEURValues,
        label: 'EUR',
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <div className="App">
      <Header currencies={currencies} />
      <CurrencyConvertor currencies={currencies} />
      {isPending 
      ? <Loader /> 
      : <div className="chart">
          <Line data={data} options={options} />
        </div>
      }
    </div>
  );
}

export default App;
