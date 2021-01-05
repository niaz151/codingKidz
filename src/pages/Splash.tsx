import React from 'react';
import '../styles/Splash.css';
import {Container} from "react-bootstrap";
import splash_logo from '../images/splash_logo.svg';
import {Link} from 'react-router-dom';

const Splash: React.FC =  () => {
    return(
        <div className="splash-container" >
            <div className="splash-logo-title-wrap mt-5">
                <span className="splash-logo-title-one">coding</span>
                <span className="splash-logo-title-two">KIDZ</span>
            </div>
            <div className="splash-logo-img-wrap mt-5">
                <div className="splash-logo-circle-portrait mt-5">
                    <img src={splash_logo} alt="logo" />
                </div>
            </div>
            <div className="splash-caption-wrap mt-5">
                <div className="splash-logo-caption">
                    lorem ipsum dolor sit amet, cosnectetur adipiscing elit.
                </div>
            </div> 
            <div className="splash-button-wrap mt-3">
                <div className="splash-button splash-button-one">
                    <Link to="/login"> LOG IN </Link>  
                </div>
                <div className="splash-button splash-button-two" >
                    <Link to="/register"> SIGN UP </Link>
                </div>
            </div> 
        </div>
    )
} 



export default Splash; 


