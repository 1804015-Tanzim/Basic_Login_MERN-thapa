import React ,{useState , useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {UserContext} from "../App.js"

const Loginform = () => {

    const {state , dispatch} = useContext(UserContext);

    
    const history = useHistory();
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const loginUser = async (e) =>{
        e.preventDefault();
        const res = await fetch('/signin' , {
            method:"POST",
            headers : {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,password
            })
        });

        const data = res.json();

        if(res.status === 400 || !data) {
                window.alert("INVALID Credentials");
        } else {

            dispatch({type:"USER" , payload: true})
            window.alert("Login SUCCESFULL");
            history.push("/");
        }


    }
    
    return (
    
        <>
             <form method ="POST" className="register-form" id="register-form">

                    <div className="form-group">
                         <label  label htmlFor="email">
                              <i class="zmdi zmdi-email"></i>
                         </label>
                          <input type="email" name="email" id="email" autoComplete="off" value={email} onChange = {
                              (e) => setEmail(e.target.value)
                          }
                           placeholder="Your email"/>
                     </div>

                 <div className="form-group">
                     <label htmlFor="password">
                         <i class="zmdi zmdi-lock"></i>
                     </label>
                     <input type="password" name="password" id="password" autoComplete="off" value={password} onChange = {
                              (e) => setPassword(e.target.value)
                          }
                  placeholder="Your Password"/>
                 </div>

                 <div className="form-gruop form-button">
                     <input type="submit" name="signin" id="signin" className="form-submit" value="Sign In" onClick={loginUser}/>
                 </div>

              </form>
        </>
    )
}

export default Loginform
