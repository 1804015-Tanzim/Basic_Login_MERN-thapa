import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import logo from "../images/signup.png";

const Signup = () => {
        const history = useHistory();

        const [user,setUser] = useState({
            name:"",email:"",phone:"",work:"",password:"",cpassword:""
        })

        let name, value;
        const handleInputs=(e)=>{
                console.log(e);
                name = e.target.name;
                value = e.target.value;

                setUser({...user, [name]:value})
        }

        const PostData = async (e) => {
            e.preventDefault();

            const {name, email, phone, work, password, cpassword } = user;

            const res = await fetch("/register" ,{
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                        name, email, phone, work, password, cpassword
                })
            });

            const data  =  await res.json();

            if(res.status === 422 || !data) {
                window.alert("INVALID Resgistration");
                console.log("ERROR CONSOLE RESGISTRATION");
            } else {
                window.alert("SUCCESFULLY Resgistration DONE");
                console.log("SUCCESS CONSOLE RESGISTRATION");

                history.push("/login");
            }
        }
        
    return (
        <>
            <section className="signup">
                <div className="container mt-5">
                    <div class="signup-content">

                        <div className="signup-form">
                            <h2 className="form-title">Sign Up</h2>
                                <form method="POST" className="register-form" id="register-form">

                                <div className="form-group">
                                    <label htmlFor="name">
                                         <i class="zmdi zmdi-account"></i>
                                     </label>
                                    <input type="text" name="name" autoComplete="off" 
                                    value={user.name}
                                    onChange={handleInputs} placeholder="Your Name"/>
                                 </div>

                                <div className="form-group">
                                     <label  label htmlFor="email">
                                          <i class="zmdi zmdi-email"></i>
                                     </label>
                                      <input type="email" name="email" id="email" autoComplete="off" 
                                      value={user.email}
                                      onChange={handleInputs} placeholder="Your email"/>
                                 </div>

                             <div className="form-group">
                                 <label htmlFor="phone">
                                     <i class="zmdi zmdi-phone-in-talk"></i>
                                 </label>
                                 <input type="number" name="phone" id="phone" autoComplete="off" 
                                 value={user.phone}
                                 onChange={handleInputs} placeholder="Your Phone Number"/>
                             </div>

                             <div className="form-group">
                                 <label htmlFor="work">
                                     <i class="zmdi zmdi-slideshow"></i>
                                 </label>
                                 <input type="text" name="work" id="work" autoComplete="off" 
                                 value={user.work}
                                 onChange={handleInputs} placeholder="Your Profession"/>
                             </div>

                             <div className="form-group">
                                 <label htmlFor="password">
                                     <i class="zmdi zmdi-lock"></i>
                                 </label>
                                 <input type="password" name="password" id="password" autoComplete="off" 
                                 value={user.password}
                                 onChange={handleInputs} placeholder="Your Password"/>
                             </div>

                             <div className="form-group">
                                 <label htmlFor="cpassword">
                                     <i class="zmdi zmdi-lock"></i>
                                 </label>
                                 <input type="password" name="cpassword" id="password" autoComplete="off" 
                                 value={user.cpassword}
                                 onChange={handleInputs} placeholder="Confirm Password"/>
                             </div>

                             <div className="form-gruop form-button">
                                 <input type="submit" name="signup" id="signup" className="form-submit" value="Register" onClick={PostData}/>
                             </div>
                        
                          </form>
                    </div>
                                
                            <div className="signup-image">
                                <figure>
                                    <img src={logo} alt="registration pic" width="300"/>
                                </figure>
                                <NavLink to="/login" className="signup-image-link">I have already signed up</NavLink>
                            </div>
   
                        </div>
                    </div>
            </section>
        </>
    )
}

export default Signup
