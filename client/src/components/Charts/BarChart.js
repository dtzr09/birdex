import React from 'react'
import {Bar} from 'react-chartjs-2'

function BarChart(datasets) {
  
  const dataset = datasets.data
  return (
    <div>
      <Bar
        data={{
          labels: dataset.map(data=> data.created_at),
          datasets: [{
            label: 'Weight',
            data: dataset.map(data => data.weight),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 1,
            borderColor: 'rgb(255, 99, 132)',
          }]
        }}
        height = {200}
        options = {{
          maintainAspectRatio: true,
          scales: {
            xAxes: [{
              ticks: {
                maxRotation: 90,
                minRotation: 80
              },
                gridLines: {
                offsetGridLines: true 
              }
            },
            {
              position: "top",
              ticks: {
                maxRotation: 90,
                minRotation: 80
              },
              gridLines: {
                offsetGridLines: false 
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }}
      />
    
    </div>
  )
}

export default BarChart
