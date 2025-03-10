import React from "react"
import { useEffect } from "react";
import "../styles/Home.css"
import Loginstatus from "./Loginstatus";
import StatusBarHome from "./statusbar/StatusBarHome"
import bg_home from '../styles/medias/pexels-boris-ulzibat-2643896.jpg'

function Home(props) {
    useEffect(() => { console.log("renderizando nosso home!"); }, [props.loginStatus])

    return (
        <div id="home">
            <img src={bg_home} alt="" id="bg-home-cover" />
            <div id="header-home">
                <div id="logo-home">TAREFAS SC</div>
                <div className="tag-app-version">versão: 1.0.2 (build de testes)</div>
            </div>

            <div id="ul-menu-home">
                <li onClick={() => {
                    let menuHome = document.getElementById("home");
                    let timer = document.getElementById("timer")
                    timer.style.display = "none";
                    let menuPessoal = document.getElementById("pessoal");
                    menuPessoal.classList.toggle("active")
                    menuHome.classList.toggle("active")

                }}>
                    <span className="minibox-menu" style={{ background: "#1B5365" }}></span>
                    <span>Pessoal</span>
                </li>
                <li onClick={() => {
                    let menuHome = document.getElementById("home");
                    let menuPro = document.getElementById("profissional");
                    let timer = document.getElementById("timer")
                    timer.style.display = "none";
                    menuPro.classList.toggle("active")
                    menuHome.classList.toggle("active")
                    let bargadgets = document.getElementById("gadgets")
                    bargadgets.classList.toggle("active")

                }}>
                    <span className="minibox-menu" style={{ background: "#E5660B" }}></span>
                    <span>Profissional</span>
                </li>
                <li onClick={() => {
                    let menuHome = document.getElementById("home");
                    let menuObjetivos = document.getElementById("objetivos");
                    let timer = document.getElementById("timer")
                    timer.style.display = "none";
                    menuObjetivos.classList.toggle("active")
                    menuHome.classList.toggle("active")

                }}>
                    <span className="minibox-menu" style={{ background: "#FFEE56" }}></span>
                    <span>Objetivos</span>
                </li>
                <li onClick={() => {
                    let menuHome = document.getElementById("home");
                    let financial = document.getElementById("financeiro");
                    let timer = document.getElementById("timer")
                    timer.style.display = "none";
                    financial.classList.toggle("active")
                    menuHome.classList.toggle("active")
                    let bargadgets = document.getElementById("gadgets")
                    bargadgets.classList.toggle("active")

                }}>
                    <span className="minibox-menu" style={{ background: "#216645" }}></span>
                    <span>Financeiro</span>
                </li>
            </div>
            <StatusBarHome msg="você não está logado, as informações não serão salvas" />
            <Loginstatus loginStatus={props.loginStatus} />
        </div>
    )
}

export default Home;
