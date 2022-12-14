import React from "react"
import { useEffect } from "react";
import "../styles/Home.css"
import Loginstatus from "./Loginstatus";
import StatusBarHome from "./statusbar/StatusBarHome"

function Home(props) {
    useEffect(()=>{console.log("renderizando nosso home!");},[props.loginStatus])

    return (
        <div id="home">
            <div id="logo">TAREFASSC</div>
            <span className="tag-app-version">versão: 1.0.1 (build de testes)</span>
            <div id="ul-menu-home">
                <li onClick={() => {
                    let menuHome = document.getElementById("home");
                    let timer = document.getElementById("timer")
                    timer.style.display = "none";
                    let menuPessoal = document.getElementById("pessoal");
                    menuPessoal.classList.toggle("active")
                    menuHome.classList.toggle("active")
                    let bargadgets = document.getElementById("gadgets")
                    bargadgets.classList.toggle("active")

                }}><span className="minibox-menu" style={{ background: "#1B5365" }}></span>Pessoal</li>
                <li onClick={() => {
                    let menuHome = document.getElementById("home");
                    let menuPro = document.getElementById("profissional");
                    let timer = document.getElementById("timer")
                    timer.style.display = "none";
                    menuPro.classList.toggle("active")
                    menuHome.classList.toggle("active")
                    let bargadgets = document.getElementById("gadgets")
                    bargadgets.classList.toggle("active")

                }}><span className="minibox-menu" style={{ background: "#E5660B" }} ></span>Profissional</li>
                <li onClick={() => {

                    let menuHome = document.getElementById("home");
                    let menuObjetivos = document.getElementById("objetivos");
                    let timer = document.getElementById("timer")
                    timer.style.display = "none";
                    menuObjetivos.classList.toggle("active")
                    menuHome.classList.toggle("active")

                }}><span className="minibox-menu" style={{ background: "#FFEE56" }} ></span>Objetivos</li>
                <li onClick={() => {
                    
                    let menuHome = document.getElementById("home");
                    let financial = document.getElementById("financeiro");
                    let timer = document.getElementById("timer")
                    timer.style.display = "none";
                    financial.classList.toggle("active")
                    menuHome.classList.toggle("active")
                    let bargadgets = document.getElementById("gadgets")
                    bargadgets.classList.toggle("active")

                }}><span className="minibox-menu" style={{ background: "#216645" }} ></span>Financeiro</li>
            </div>
            <StatusBarHome msg = "você não está logado, as informações não serão salvas" />
            <Loginstatus loginStatus = {props.loginStatus}/>
        </div>
    )
}

export default Home;
