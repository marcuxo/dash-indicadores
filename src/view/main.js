import React from 'react'
// import {url} from '../url/url.link'
import GetLast from '../component/GetlastdataimpComponent'
import MainChart from '../component/chart/Mainchart'
import MainchartDos from '../component/chart/MainChartDos'
import { url } from '../url/url.link'

function main({token}) {
  let link = url+"/makefile"
  return (
    <>
    <div className="container">
      <div className="row fondostatico py-3 d-flex align-items-center">
        <div className="col-12 col-md-6 text-center">
          <GetLast />
        </div>
        <div className="col-12 col-md-6 text-center">
          <a href={link} className="btn btn-sm btn-info"><i className="far fa-file-excel"></i> Descargar Excel</a>
        </div>
      </div>
    </div>
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-6 py-2">
          <div className="fondostatico">
            <MainChart token={token} titulo={"Consumo Pozos"} />
          </div>
        </div>
        <div className="col-12 col-md-6 py-2">
          <div className="fondostatico">
            <MainchartDos token={token} titulo={"Consumo Empalmes"} />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default main
