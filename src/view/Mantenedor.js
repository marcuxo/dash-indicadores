import React, { useEffect, useState } from 'react'
import { url } from '../url/url.link'
// import ModalEditCamp from './ModalEditCamp'

export default function Mantenedor({token}) {
  const [anno, setAnno] = useState('2021')
  const [mes, setMes] = useState('00')
  const [arrheader, setArrHeader] = useState(null)
  const [arrTable, setArrTable] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [dataModal, setDataModal] = useState({valor:0, id:"", newvalor:0})

  let cptreAnno = async (event) =>{
    setAnno(event.target.value)
  }

  let cptreMes = async (event) =>{
    setMes(event.target.value)
  }

  let getData = async () => {
    //console.log(anno,mes)
    let response = await fetch(url+'/getdatamantenedor',{
      method: 'POST',
      headers: {
        'authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        anno: anno,
        mes: mes
      })
    })
    let data = await response.json()
    setArrHeader(data.data.body.arrheader)
    setArrTable(data.data.body.arrtable)
    //await console.log(arrTable)
  }
  let modalEditCampo = async (e) => {
    // console.log(e.target.id, e.target.innerHTML)
    setDataModal({...dataModal,valor:e.target.innerHTML,id:e.target.id})
    setShowModal(true)
  }
  let closeModal = async () => {
    setShowModal(false)
  }
  let updateMedidor = async () => {
    //console.log(dataModal)
    if(await updateDataToSRVR(dataModal)) {
      getData()
      closeModal()
    }
  }
  let dataModalChange = async (e) => {
    setDataModal({...dataModal,newvalor:e.target.value})
  }

  let updateDataToSRVR = async (datos) => {
    //console.log("srvr",datos, dataModal)
    let response = await fetch(url+'/uptadatemedidor',{
      method: 'POST',
      headers: {
        'authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        valor: datos.newvalor,
        id: datos.id
      })
    })
    let data = await response.json()
    return data.data.success
  }

  return (
    <div className="container-fluid fondostatico pb-5">
      <div className="row">
        <div className="col-12 py-3">
          <h5>Mantenedor Lecturas</h5>
        </div>
        <div className="col-12 col-md-4">
          <label>Seleccione Año</label>
          <select name="anno" className="form-control form-control-sm" onChange={cptreAnno}>
            <option>2021</option>
          </select>
        </div>
        <div className="col-12 col-md-4">
          <label>Seleccione Mes</label>
          <select className="form-control form-control-sm" onChange={cptreMes}>
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
        <div className="col-12 col-md-4">
          <label className="invisible">Buscar</label>
          <button className="btn btn-sm btn-success w-100" onClick={getData}>Buscar</button>
        </div>

        {!arrTable?
        <div className="col-12 text-center pt-5"><h5>En Espera</h5></div>
        :
        <>
        <div className="col pt-5 table-responsive">
          <table className="table table-sm table-light table-hover table-striped">
            <thead className="thead-dark">
              <tr>
                {arrheader.map((al, index)=><th key={index} className={index!==0?"text-right":""}><small>{al}</small></th>)}
              </tr>
            </thead>
            <tbody>
              {
                arrTable.map((am, index)=><tr key={index}>
                  {
                    am.map((an, index)=>
                    <td key={index}
                    id={an.ID}
                    onClick={an.ID?modalEditCampo:null}
                    className={index!==0?"text-right":""}
                    >
                      {an.VALOR}
                    </td>)
                  }
                </tr>)
              }
              
            </tbody>
          </table>
        </div>
        </>
        }
      </div>
        {!showModal?
        null:
        <div className="modal fade show fondostatico" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle"  style={{display: 'block'}}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header p-0">
                <h5 className="modal-title pl-2" id="exampleModalCenterTitle">Editar Lectura</h5>
              </div>
              <div className="modal-body p-2">
                <div className="row">
                  <div className="col-6">
                    <label>Valor Actual</label>
                    <input type="text" className="form-control form-control-sm" value={dataModal.valor} readOnly/>
                  </div>
                  <div className="col-6">
                    <label>Nuevo Valor</label>
                    <input type="number" name="newvalue" onChange={dataModalChange} className="form-control form-control-sm" />
                  </div>
                </div>
                
              </div>
              <div className="modal-footer p-1">
                <button type="button" className="btn btn-sm btn-secondary" onClick={closeModal}>Cerrar</button>
                <button type="button" className="btn btn-sm btn-primary" onClick={updateMedidor}>Guardar Cambios</button>
              </div>
            </div>
          </div>
        </div>
        }
      
    </div>
  )
}
