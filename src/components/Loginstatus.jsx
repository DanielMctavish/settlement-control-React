import { useEffect } from "react";
import instance from "../database/Api.js";
import "../styles/Loginstatus.css"

function Loginstatus(props) {

    useEffect(() => {

        instance.get("statuslogin").then(res => {
            console.log("rota dos status");
            if (res.data.authLogin) {
                document.getElementById("icon-status-login").style.background = "green"
                document.getElementById("name-status-login").innerHTML = res.data.user;
            } else {
                document.getElementById("icon-status-login").style.background = "red"
                document.getElementById("name-status-login").innerHTML = "offline";
            }
        })

    }, [props.loginStatus])

    return (
        <div id="Login-status" onClick={() => {
            let menuHome = document.getElementById("home");
            menuHome.style.display = "none";
            let timer = document.getElementById("timer")
            timer.style.display = "none";

            let Login = document.querySelector(".Login");
            Login.style.display = "flex";
        }}>
            <span id="name-status-login">Login</span>
            <div id="icon-status-login"></div>
        </div>
    )
}

export default Loginstatus;