import React from "react";
import './Chart.scss'

import {Line} from 'react-chartjs-2'
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

export default function Chart({chartData}) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

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
    <div className="chart">
      <Line data={data} options={options} />
    </div>
  )
}