import React, { useEffect, useState } from 'react'
import {url} from '../url/url.link'

export default function GetlastdataimpComponent() {
  const [ultimo, setultimo] = useState("")
  useEffect(() => {

    fetch(url+'/getlastfechainp',{
      method: 'POST',
      headers: {
        'authorization': sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    })
    .then(res=>res.json())
    .then(res=>{
      // console.log(res.data.body)
      setultimo(res.data.body)
    })
    
  }, [])
  
  return (
    <div>
      <p className="btn btn-primary">
        Fecha Ultimos Datos Guardados <span className="badge badge-light">{ultimo}</span>
        <span className="sr-only">unread messages</span>
      </p>
    </div>
  )
}
