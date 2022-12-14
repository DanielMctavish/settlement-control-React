import "./Login.css"
import instance from "../../database/Api.js";

function Login(props) {

    let loadspan = document.querySelector(".load-login")
    let statusbarhome = document.getElementById("status-home")
    let timer = document.getElementById("timer")

    return (
        <div className="Login">
            <span className="load-login"></span>

            <div id="logo-login" onClick={() => {
                let menuHome = document.getElementById("home");
                menuHome.style.display = "flex";
                document.querySelector(".Login").style.display = "none";
                timer.style.display = "flex"
            }}>
                <span>SETTLEMENT CONTROL</span>
            </div>

            <button className="register-btn" onClick={()=>{
                let Login = document.querySelector(".Login");
                let RegisterDisplay = document.querySelector(".register")
                Login.style.display = "none";
                RegisterDisplay.style.display = "flex";
                props.setLoginStatus(false)
            }}>cadastre-se</button>


            <button className="btn-logout" onClick={() => {
                instance.get("logout").then(res => {
                    loadspan.innerHTML = "deslogado"
                    statusbarhome.innerHTML = "desconectado"
                    statusbarhome.style.background = "red"
                    props.setLoginStatus(res.data)
                })
            }}>deslogar</button>

            <div className="form-Login">
                <input type="text" placeholder="email" className="login-email" />
                <input type="password" name="" placeholder="senha" className="login-pass" />
                <button className="btn-login" onClick={() => {
                    let loginemail = document.querySelector(".login-email")
                    let loginpassword = document.querySelector(".login-pass")
                    document.querySelector(".load-login").innerHTML = "carregando..."
                    instance.post("login", {
                        email: loginemail.value,
                        password: loginpassword.value
                    }).then(res => {
                        let respostasServer = res.data
                        console.log(respostasServer);
                        loginemail.value = ""
                        loginpassword.value = ""

                        if (res.data.authenticateLogin) {
                            loadspan.innerHTML = "conectado"
                            statusbarhome.innerHTML = "usuário conectado"
                            statusbarhome.style.background = "green"
                        } else {
                            loadspan.innerHTML = res.data
                        }
                        props.setLoginStatus(respostasServer)

                    }).catch(err => {
                        document.querySelector(".load-login").innerHTML = "erro ao tentar conectar..."
                        console.log("erro ao tentar conectar com o servidor: ", err);
                    })

                }}>
                    <span id="iconlogin"></span>
                    <span>entrar</span>
                </button>
                <hr style={{ width: "300px" }} />
            </div>
        </div>
    )
}

export default Login;