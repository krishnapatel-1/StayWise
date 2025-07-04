import React from "react";
import './header.css'
import { useNavigate } from "react-router-dom";
function Header() {
    const Navigate = useNavigate();
    function handle_clicks(oper) {
        Navigate(oper);
    }
    return <>

        <div id="head">
            <div id="title"><h1>StayWise</h1></div>
            <div id="services">
                <div id="service">Rent a room</div>
                <div id="service">Buy a room</div>
                <div id="service">know about us</div>
            </div>
            <div id="login_signup">
                <div id="user_oper" onClick={() => handle_clicks("/mybookings")}>check bookings</div>
                <div id="user_oper" onClick={() => handle_clicks("/Login")}>login</div>
                <div id="user_oper" onClick={() => handle_clicks("/CustomerSignup")}>signup</div>

            </div>
        </div>

    </>
}
export default Header