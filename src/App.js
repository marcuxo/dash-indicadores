import React from 'react';
import './App.css';
import LoginComp from './component/LoginComponent';
import Main from './view/main';
import OutOfApp from './component/OutOfApp';
import NotFound from './view/notfounh';
import Mantenedor from './view/Mantenedor';
import Graficar from './view/Graficar';
import {BrowserRouter as Router, Switch, Link} from 'react-router-dom';
import Guest from './view/Guest';
import Footer from './view/Footer';
/** Marcuxo 2021 */

export const AuthContext = React.createContext();
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null
}
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      sessionStorage.setItem('user',action.payload.user);
      sessionStorage.setItem('token',action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      }
    case "LOGOUT":
      sessionStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null
      }

    default:
      return state
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    const user = sessionStorage.getItem('user') || null
    const token = sessionStorage.getItem('token') || null
    if(user && token){
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          token
        }
      })
    }
  }, [])
  
  return (
    <AuthContext.Provider
      value={{state,dispatch}}
     
    >
      <div className="App"> {console.log(state.user)}
        {!state.token
        ? <LoginComp />
        :state.user === "superUser"
        ?<Router>
          {console.log("superUser")}
          <div className="container-fluid text-center mb-3 mainmenuh" id="toHeader">
              <img src="./favicon.jpg" className="rounded-circle" alt=""/>
            <div className="d-flex justify-content-end ">
              <div><Link className="btn btn-sm btn-info mx-2" to='/'><span className="text-white"><i className="fas fa-home"></i> Inicio</span></Link></div>
              <div><Link className="btn btn-sm btn-info mx-2" to='/mantenedor'><span className="text-white"><i className="far fa-edit"></i> Mantenedor</span></Link></div>
              <div><Link className="btn btn-sm btn-info mx-2" to='/graficar'><span className="text-white"><i className="far fa-chart-bar"></i> Graficar</span></Link></div>
              <div><Link className="btn btn-sm btn-danger mx-2" to='/outapp'><span className="text-white"><i className="fas fa-sign-out-alt"></i> Salir</span></Link></div>
              {/* <div><Link className="btn btn-sm btn-secondary mx-2" to='/'><span className="text-white">Medidores</span></Link></div> */}
            </div>
          </div>
          
          <Switch>
              <Router exact path='/'><Main token={state.token} /></Router>
              <Router exact path='/graficar'><Graficar token={state.token} /></Router>
              <Router exact path='/mantenedor'><Mantenedor token={state.token} /></Router>
              <Router exact path='/outapp'><OutOfApp /></Router>
              {/* <Router exact path='/'>< /></Router> */}
              <Router path='*'><NotFound /></Router>
          </Switch>
        </Router>
        :
        <Router>
          <div className="d-flex justify-content-end ">
            <div><Link className="btn btn-sm btn-info mx-2" to='/'><span className="text-white"><i className="fas fa-home"></i> Inicio</span></Link></div>
            <div><Link className="btn btn-sm btn-danger mx-2" to='/outapp'><span className="text-white"><i className="fas fa-sign-out-alt"></i> Salir</span></Link></div>
          </div>
          <Switch>
            <Router exact path='/'><Guest token={state.token} /></Router>
            <Router exact path='/outapp'><OutOfApp /></Router>
            <Router path='*'><NotFound /></Router>
          </Switch>
        </Router>
        }
        <Footer />
      </div>
    
    </AuthContext.Provider>
  )
}

export default App;
