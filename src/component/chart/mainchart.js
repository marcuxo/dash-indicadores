import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import {url} from '../../url/url.link'
import {token} from '../../variables/var'

function Mainchart({titulo}) {
  const [categoria, setCategoria] = useState([])
  const [serie, setSerie] = useState([])

  useEffect(() => {
    fetch(url+'/getconsumopzs',{
      method: 'POST',
      headers: {
        'authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res=>res.json())
    .then(res=>{
      setSerie(res.data.body.arrgeneral)
      setCategoria(res.data.body.categorias)
    })
    }, [])
    
  let state = {
    series: serie,
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
        categories: categoria,
      },
      yaxis: [{
        title: {
          text: 'Consumo cm3',
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

export default Mainchart
