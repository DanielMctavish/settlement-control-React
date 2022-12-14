import "./Register.css"
import React from "react"
import instance from "../../database/Api.js"

export default function Register() {

    let register = document.querySelector(".register")
    let home = document.getElementById("home")

    return (
        <div className="register">
            <div className="register-logo" onClick={() => {
                register.style.display = "none"
                home.style.display = "flex"
            }}>SETTLEMENT CONTROL - VOLTAR</div>
            <input type="email" placeholder="email" className="register-email" required />
            <div id="msg-status-cad" style={{"color":"white"}}></div>
            <button className="btn-send-register" onClick={()=>{
                let emailregister = document.querySelector(".register-email").value
                console.log(emailregister);
                instance.post("registration",{
                    email:emailregister
                }).then(res=>{
                    let inputemailregister = document.querySelector(".register-email")
                    document.querySelector(".btn-send-register").style.display = "none"
                    inputemailregister.style.display = "none";
                    document.getElementById("msg-status-cad").innerHTML = "um email foi enviado para confirmação, acesse sua caixa de entrada"
                    console.log(res);
                }).catch(err=>{
                    document.getElementById("msg-status-cad").innerHTML = "houve um erro ao tentar cadastrar este email"
                    console.log(err);
                })
            }}>cadastrar</button>
        </div>
    )
}