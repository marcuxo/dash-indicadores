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
        // background:'linear-gradient(180deg, rgba(0,252,21,0.7595413165266106) 0%, rgba(238,252,0,0.7595413165266106) 36%, rgba(247,0,0,1) 74%, rgba(252,0,0,1) 100%)',
        height: 350,
        type: 'bar',
      },
      // annotations: {
      //   yaxis: [{
      //     y: 250000,
      //     y2: 400000,
      //     borderColor: '#000',
      //     fillColor: '#49ff00',
      //     opacity: 0.2,
      //     label: {
      //       borderColor: '#32ad00',
      //       style: {
      //         fontSize: '10px',
      //         color: '#FFF',
      //         background: '#32AD00',
      //       },
      //       text: 'Rango Aceptable',
      //     }
      //   }]
      // },
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
          text: 'Consumos kw/h',
          style:{
            color: '#000'
          }
        },
      }, {
        opposite: true,
        title: {
          text: 'Consumo General kw/h'
        }
      }],
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if(typeof y !== "undefined") {
              return  y + " kwh";
            }
            return y;
          }
        }
      }
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
