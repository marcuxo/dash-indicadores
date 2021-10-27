import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import {url} from '../../url/url.link'

function Mainchart({titulo,token}) {
  const [categoria, setCategoria] = useState(['Cargando'])
  const [serie, setSerie] = useState([{name:"",data:[0]}])
  const dataGraf = async () => {
    
    let response = await fetch(url+'/getconsumopzs',{
      method: 'POST',
      headers: {
        'authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    // return fetchOne
    const data = await response.json()
    await lodData(data.data.body.arrgeneral,data.data.body.categorias)
  }
  const lodData = async (data, data2) => {
    setSerie(data)
    setCategoria(data2)
  }
  //console.log(dataGraf)
  useEffect(() => {
    dataGraf()
  },[])

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
          options={state.options || null}
          series={state.series || null}
          type="bar"
        />
    </div>
  )
}

export default Mainchart
