import React from 'react'
// import {url} from '../url/url.link'
import GetLast from '../component/GetlastdataimpComponent'
import MainChart from '../component/chart/Mainchart'

function main() {
 

  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <GetLast />
        </div>
      </div>
    </div>
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-6 py-2">
          <div className="fondostatico">
            <MainChart titulo={"Consumo Pozos"} />
          </div>
        </div>
        <div className="col-12 col-md-6 py-2">
          <div className="fondostatico">
            <MainChart titulo={"Consumo Empalmes"} />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default main
