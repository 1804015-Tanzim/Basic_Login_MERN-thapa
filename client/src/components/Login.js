import React from 'react'
import logo from '../images/signin.png'
import {NavLink} from 'react-router-dom'
import Loginform from './Loginform'


const Login = () => {

    
    return (
        <>
           <section className="signin">
                <div className="container mt-5">
                    <div class="signin-content">

                           <div className="signin-image">
                                <figure>
                                    <img src={logo} alt="Login pic" width="300"/>
                                </figure>
                                <NavLink to="/signup" className="signup-image-link">Create an account</NavLink>
                            </div>

                             <div className="signin-form">
                                 <h2 className="form-title">Sign in</h2>
                                <Loginform/>
                            </div> 
                        </div>
                    </div>
            </section>
        </>
    )
}

export default Login
