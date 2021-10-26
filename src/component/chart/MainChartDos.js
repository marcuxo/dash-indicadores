import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import {url} from '../../url/url.link'

function MainchartDos({titulo,token}) {
  const [categoria, setCategoria] = useState(['Buscando'])
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
    series: [{
      name: 'empalme1',
      type: 'bar',
      data: [440, 505, 414, 671, 227]
    }, {
      name: 'consumo',
      type: 'line',
      data: [1023, 11042, 1035, 11027, 1043]
    }, {
      name: 'empalme2',
      type: 'bar',
      data: [203, 202, 205, 207, 203]
    }, {
      name: 'empalme3',
      type: 'bar',
      data: [103, 101, 105, 107, 103]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
      },
      stroke: {
        width: [0, 4]
      },
      dataLabels: {
        enabled: false,
        enabledOnSeries: [1]
      },
      labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001'],

      xaxis: {
        type: 'datetime'
      },
      yaxis: [{
        title: {
          text: 'Empalmes',
        },
      }, {
        opposite: true,
        title: {
          text: 'Consumos'
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
