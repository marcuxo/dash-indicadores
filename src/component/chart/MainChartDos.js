import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import {url} from '../../url/url.link'

function MainchartDos({titulo,token}) {
  const [categoria, setCategoria] = useState(['Cargando'])
  const [serie, setSerie] = useState([{name:"",data:[0]}])
  const dataGraf = async () => {
    
    let response = await fetch(url+'/getConsumoEmpalm',{
      method: 'POST',
      headers: {
        'authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    // return fetchOne
    const data = await response.json()
    
    await lodData(data.data.body.series,data.data.body.categoria)
  }
  const lodData = async (data, data2) => {
    //console.log(data, data2)
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
        height: 350,
        type: 'bar',
      },
      stroke: {
        curve: 'smooth',
        width: [0, 4]
      },
      dataLabels: {
        enabled: false,
        enabledOnSeries: [1]
      },
      labels: categoria,

      xaxis: {
        type: 'text'
      },
      yaxis: [{
        title: {
          text: 'Consumos',
        },
      }, {
        opposite: true,
        title: {
          text: 'Consumo General'
        }
      }]
    },
  }

  return (
    <div>
      <h5 className="pl-3">{titulo}</h5>
        <Chart
          options={state.options || null}
          series={state.series || null}
          type="line"
        />
    </div>
  )
}

export default MainchartDos
