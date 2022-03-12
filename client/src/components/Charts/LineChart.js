import React from 'react'
import {Line} from 'react-chartjs-2'

function LineChart(datasets) {
  const dataset = datasets.data
  return (
    <div>
      <Line
        data={{
          labels: dataset.map(data=> data.created_at),
          datasets: [{
            label: 'Weight',
            data: dataset.map(data => data.weight),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 1,
            borderColor: 'rgb(255, 99, 132)'
          }]
        }}
        height = {200}
        options = {{
          resposive: true,
          maintainAspectRatio: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }     
        }}
      />
    </div>
  )
}

export default LineChart
