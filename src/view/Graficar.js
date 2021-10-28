import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import Chart from 'react-apexcharts'
import { url } from '../url/url.link'
const animatedComponents = makeAnimated()

export default function Graficar({token}) {
  const [categoria, setCategoria] = useState(['Indicadores'])
  const [serie, setSerie] = useState([{name:"",data:[0]}])
  const [anno, setAnno] = useState('2021')
  const [mes, setMes] = useState('01')
  const [listOptions, setlistOptions] = useState([])
  const [selectValue, setSelectValue] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  let cptreAnno = async (event) =>{
    setAnno(event.target.value)
  }

  let cptreMes = async (event) =>{
    setMes(event.target.value)
  }

  /** guarda los options seleccionados del select en una variable */
  let getDataInput = async (data) => {
    //console.log(data)
    setSelectValue(data)
  }
  /** trae desde el SRVR los datos para generar la lista del select */
  let getDataSRVS = async () => {
    let response = await fetch(url+'/getMedidoresList',{
      method: 'POST',
      headers: {
        'authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    let data = await response.json()
    await setlistOptions(data.data.body)
  }

  /** trae los datos listos para fenerar un grafico con los medidores seleccionados */
  let makeChart = async () => {
    //console.log(anno, mes)
    setIsLoading(true)
    let response = await fetch(url+'/makeagraficollash',{
      method: 'POST',
      headers: {
        'authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        listselect: selectValue,
        mes: mes,
        anno: anno
      })
    })
    let data = await response.json()
    setCategoria(data.data.body.categorias)
    //console.log(data.data.body.categorias)
    setSerie(data.data.body.series)
    await setIsLoading(false)
  }

  useEffect(() => {
    getDataSRVS()
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
          text: 'Lectura Medidores',
        },
      }]
    },
  }

  return (
    <div className="container">
      <div className="row fondostatico pb-4">
        <div className="col-12">
          <h5 className="py-3">Graficar</h5>
        </div>
          <div className="col-12">
            <div className="row">
            <div className="col-12 col-md-4">
              <label>Seleccione Año</label>
              <select name="anno" className="form-control form-control-sm" onChange={cptreAnno}>
                <option>2021</option>
              </select>
            </div>
            <div className="col-12 col-md-4">
              <label>Seleccione Mes</label>
              <select className="form-control form-control-sm" onChange={cptreMes}>
                <option value="00">Seleccione Mes</option>
                <option value="01">Enero</option>
                <option value="02">Febrero</option>
                <option value="03">Marzo</option>
                <option value="04">Abril</option>
                <option value="05">Mayo</option>
                <option value="06">Junio</option>
                <option value="07">Julio</option>
                <option value="08">Agosto</option>
                <option value="09">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </select>
            </div>
            <div className="col-12 col-md-8">
              <label>Seleccione Medidores</label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                // defaultValue={[colourOptions[4], colourOptions[5]]}
                isMulti
                options={listOptions}
                onChange={getDataInput}
                isDisabled={isLoading}
                placeholder="Seleccione Medidores a Graficar"
              />
            </div>
            <div className="col-12 col-md-4 ">
              <label className="invisible">buscar</label>
              <button type="button"
                className="btn btn-primary align-top w-100"
                disabled={isLoading}
                onClick={makeChart}>{isLoading?"Cargando. . .":"Graficar"}</button> 
              
            </div>
          </div>
        </div>
        <div className="col-12 py-3 ">
          <Chart
            options={state.options || null}
            series={state.series || null}
            type="bar"
            height="500px"
          />
        </div>
      </div>
    </div>
  )
}
