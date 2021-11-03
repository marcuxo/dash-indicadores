import React from 'react'
import { url } from '../url/url.link'
import Mainchart from '../component/chart/Mainchart'
import MainchartDos from '../component/chart/MainChartDos'
import GetlastdataimpComponent from '../component/GetlastdataimpComponent'

export default function Guest({token}) {
  //console.log(token)
  let link = url+"/makefile"
  return (<>
    <div className="container fondostatico mt-3">
    <div className="row fondostatico py-3 d-flex align-items-center">
        <div className="col-12 col-md-6 text-center">
          <GetlastdataimpComponent />
        </div>
        <div className="col-12 col-md-6 text-center">
          <a href={link} className="btn btn-sm btn-info"><i className="far fa-file-excel"></i> Descargar Excel</a>
        </div>
      </div>
    </div>
    <div className="container-fluid  mt-2 mb-3">
      <div className="row">
        <div className="col-12 col-md-6 fondostatico py-3"><Mainchart token={token} titulo={"Consumo Pozos"} /></div>
        <div className="col-12 col-md-6 fondostatico py-3"><MainchartDos token={token} titulo={"Consumo Empalmes"} /></div>
      </div>
    </div>
  </>)
}
