import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import dp from "../images/dp.png";
import dp2 from "../images/dp2.png";

const About = () => {

    const history = useHistory();
    const [userData,setUserData]=useState({});

    const callAboutPage = async () => {
        try {
            const res = await fetch('/aboutback',{
                method: "GET",
                headers: {
                  Accept: "application/json" ,
                  "Content-Type" : "application/json" 
                },
                credentials:"include"
            });
            const data= await res.json(); 
            console.log(data);
            setUserData(data);

            if(!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
            
        } catch (err) {
            console.log(err);
            history.push('/login');
        }
    }

    useEffect(() => {
        callAboutPage();

    }, [])



    return (
        <>
          <div className="container emp-profile">
              <form method="GET">
                  <div className="row">
                      <div className="col-md-4">
                          <img src={userData.name === 'Tanzim Rahman' ? dp2 : dp} height = "300" width="200" alt="dp"/>
                      </div>
                    
                      <div className="col-md-6">
                          <div className="profile-head">
                              <h5>{userData.name}</h5>
                              <h6>{userData.work}</h6>
                              <p className="profile-rating mt-3 mb-5">Ranking <span> 1/10</span></p>

                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab"  href="#home" role="tab">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab"  href="#profile" role="tab">Timeline</a>
                                    </li>
                                </ul>  
                          </div>
                      </div>

                      <div className="col-md-2">
                          <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                      </div>
                  </div>

                  <div className="row">
                      {/* left */}
                      <div className="col-md-4">
                          <div className="profile-work">
                              <p>Work Link</p>
                              <a href="https://www.youtube.com/channel/UC6fwmV4gepBzDy8W8EEqxXQ" target="_link">Youtube link</a> <br/>
                              <a href="https://www.youtube.com/channel/UC6fwmV4gepBzDy8W8EEqxXQ" target="_link">FaceBook link</a> <br/>
                              <a href="https://www.youtube.com/channel/UC6fwmV4gepBzDy8W8EEqxXQ" target="_link">Insta link</a> <br/>
                              <a href="https://www.youtube.com/channel/UC6fwmV4gepBzDy8W8EEqxXQ" target="_link">Twitter link</a> <br/>
                          </div>
                      </div>
                      {/* right */}
                      <div className="col-md-8 pl-5 about-info">
                          <div className="tab-content profile-tab" id="myTabContent">
                              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                  <div className="row mt-2">
                                      <div className="col-md-6">
                                          <label >User ID</label>
                                      </div>

                                      <div className="col-md-6">
                                          <p>{userData._id}</p>
                                      </div>
                                  </div>

                                  <div className="row mt-2">
                                      <div className="col-md-6">
                                          <label >Name</label>
                                      </div>

                                      <div className="col-md-6">
                                          <p>{userData.name}</p>
                                      </div>
                                  </div>


                                  <div className="row mt-2">
                                      <div className="col-md-6">
                                          <label >Email</label>
                                      </div>

                                      <div className="col-md-6">
                                          <p>{userData.email}</p>
                                      </div>
                                  </div>

                                  <div className="row mt-2">
                                      <div className="col-md-6">
                                          <label >Phone</label>
                                      </div>

                                      <div className="col-md-6">
                                          <p>{userData.phone}</p>
                                      </div>
                                  </div>

                                    <div className="row mt-2">
                                      <div className="col-md-6">
                                          <label >Profession</label>
                                      </div>

                                      <div className="col-md-6">
                                          <p>{userData.work}</p>
                                      </div>
                                  </div>
                              </div>
                              {/* righr2 */}
                              <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                                  <div className="row mt-2">
                                      <div className="col-md-6">
                                          <label>Experience</label>
                                      </div>

                                      <div className="col-md-6">
                                          <p>Shooting</p>
                                      </div>
                                  </div>

                                  <div className="row mt-2">
                                      <div className="col-md-6">
                                          <label >Hourly Rate</label>
                                      </div>

                                      <div className="col-md-6">
                                          <p>$15M</p>
                                      </div>
                                  </div>

                                  <div className="row mt-2">
                                      <div className="col-md-6">
                                          <label >Total Project</label>
                                      </div>

                                      <div className="col-md-6">
                                          <p>19</p>
                                      </div>
                                  </div>

                                  <div className="row mt-2">
                                      <div className="col-md-6">
                                          <label >English Level</label>
                                      </div>

                                      <div className="col-md-6">
                                          <p>Top</p>
                                      </div>
                                  </div>

                                  <div className="row mt-2">
                                      <div className="col-md-6">
                                          <label >Availability</label>
                                      </div>

                                      <div className="col-md-6">
                                          <p>6 months</p>
                                      </div>
                                  </div>

                              </div>
                          </div>

                          

                      </div>
                      
                   </div>   
              </form>
           </div> 
        </>
    )
}

export default About
