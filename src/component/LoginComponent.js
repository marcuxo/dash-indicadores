import {AuthContext} from "../App";
import React from 'react';
import './login.css'
import {url} from '../url/url.link'

function LoginComponent() {
  const {dispatch} = React.useContext(AuthContext);
  const initialState = {
    email: "",
    clave: "",
    isSubmit: false,
    errorMessage: null
  };
  const [data, setData] = React.useState(initialState);
  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };
  const handleFormSubmit = event => {
    event.preventDefault();
    setData({
      ...data,
      isSubmit: true,
      errorMessage: null
    });
    
    fetch(url+'/signin',{
      method: 'POST',
      headers: {
        'authorization': "paico 2021",
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: data.email,
        clave: data.clave
      })
    })
    .then(res => res.json())
    .then(resp => {
      //console.log(resp.data)
      // console.log(resp.data.token)
      // console.log(resp.data.name.nombre)
      // console.log(resp.data.name.user)
      if(resp.data.success) {
        dispatch({
          type: "LOGIN",
          payload: {
            user: "superUser",
            token: resp.data.token
          }
        })
      } else {
        setData({
          ...data,
          isSubmit: false,
          errorMessage: "error en los datos ingresados"
        })
      }
    })
  };
  
  const LoginGuestComponent_ = async () => {
    fetch(url+'/guestin',{
      method: 'POST',
      headers: {
        'authorization': "paico 2021",
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res=>res.json())
    .then(res=>{
      if(res.data.success) {
        dispatch({
          type: "LOGIN",
          payload: {
            user: res.data.rol,
            token: res.data.token
          }
        })
      } else {
        setData({
          ...data,
          isSubmit: false,
          errorMessage: "Error en servidor. intentelo mas tarde"
        })
      }
    })

  }
  return (
      <div className="container">
        <div className="row" style={{height: '100vh'}}>
          <div className="col-12 col-md-6 px-3 formlogin">
            <form onSubmit={handleFormSubmit}>
              <h1>Login</h1>
              <label htmlFor="email" className="pt-2">
                Email Address
                </label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  value={data.email}
                  onChange={handleInputChange}
                  name="email"
                  id="email"
                />
              
              <label htmlFor="password" className="pt-2">
                Password</label>
                <input
                  className="form-control form-control-sm"
                  type="password"
                  value={data.clave}
                  onChange={handleInputChange}
                  name="clave"
                  id="password"
                />
              
<br/>
              {data.errorMessage && (
                <span className="form-error">{data.errorMessage}</span>
              )}

            <button
              className="btn btn-sm btn-info w-100"
              disabled={data.isSubmitting}>
                {data.isSubmitting ? (
                  "Loading..."
                ) : (
                  "Entrar"
                )}
              </button>
            </form>
          <div className="col-12 text-right pt-3">
            <button className="btn btn-link" onClick={LoginGuestComponent_} title="dsds">Entrar como Invitado</button>
          </div>
          </div>
          <div className="col-12 col-md-6 d-flex align-items-center text-center justify-content-center">
            <img src="/img/logo_ariztia.png" alt="Ariztia" />
          </div>
        </div>
      </div>
  )
};

export default LoginComponent
