import 'bootstrap/dist/css/bootstrap.css'
import React, { createContext, useReducer } from 'react'
import { Route, Switch } from "react-router-dom"
import { initialState, reducer } from "./reducer/UseReducer"
import './App.css'
import About from './components/About'
import Contact from './components/Contact'
import Error from './components/errorpage'
import Home from './components/Home'
import Login from './components/Login'
import Logout from './components/Logout'
import Navbar from './components/Navbar'
import Signup from './components/Signup'


// 1: context API
  export const UserContext = createContext();

// routing 



const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const Routing  = () => {
    return (
        <Switch>
        <Route exact path='/'><Home/></Route>
        <Route path='/signup'><Signup/></Route>     
        <Route path='/login'><Login/></Route>   
        <Route path='/about'><About/></Route>
        <Route path='/contact'><Contact/></Route>
        <Route path='/logout'><Logout/></Route>
        <Route><Error/></Route>
        </Switch>
   )
}

  return (

    <>  
        <UserContext.Provider value = {{state,dispatch}} >
        <Navbar/>
        <Routing/>
        </UserContext.Provider>
    </>
  )
}

export default App

  