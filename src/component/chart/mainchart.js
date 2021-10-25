import React from 'react'
import Chart from 'react-apexcharts'

export default function mainchart({titulo}) {

  console.log(titulo)
          
    let state = {
          
      series: [{
        name: "Pozo 3",
        data: [44, 55, 41, 64]
      }, {
        name: "Pozo 4",
        data: [53, 32, 33, 52]
      }, {
        name: "Pozo 5",
        data: [53, 32, 33, 52]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 430
        },
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              position: 'top',
            },
          }
        },
        dataLabels: {
          enabled: false,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#000']
          }
        },
        stroke: {
          show: false,
          width: 0,
          colors: ['#fff']
        },
        tooltip: {
          shared: true,
          intersect: false
        },
        xaxis: {
          categories: ['2021-10-02','2021-10-09','2021-10-16','2021-10-23'],
        },
        yaxis: [{
          title: {
            text: 'Website Blog',
          },
        
        }]
      },
    
  }


  return (
    <div>
      <h5 className="pl-3">{titulo}</h5>
        <Chart
          options={state.options}
          series={state.series}
          type="bar"
        />
    </div>
  )
}
