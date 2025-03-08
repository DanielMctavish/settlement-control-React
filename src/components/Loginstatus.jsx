import { useEffect } from "react";
import "../styles/Loginstatus.css"

// Importar a senha local
import { Pass } from "../database/data/dan.js";

function Loginstatus({ setLoginStatus }) {

    useEffect(() => {
        // Este componente provavelmente está importando e usando o instance do Axios
        // Precisamos modificá-lo para não fazer requisições HTTP
    }, [setLoginStatus])

    // Substituir a lógica de requisição HTTP por uma verificação local
    const checkLogin = (username, password) => {
        // Verificação local simples
        if (password === Pass) {
            setLoginStatus(true);
            return true;
        }
        return false;
    };

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