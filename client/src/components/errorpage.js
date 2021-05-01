import React from 'react'
import { NavLink } from 'react-router-dom'
const errorpage = () => {
    return (
        <>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>404</h1>
                    </div>
                        <h2>Page Not Found</h2>
                        <NavLink to='/'> Back to Homepage</NavLink>
                </div>
            </div>
        </>
    )
}

export default errorpage
