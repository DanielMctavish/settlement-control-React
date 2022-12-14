import Menutaskadd from "../tasks/Menutaskadd";
import "../pages/Pessoal.css"
import Itemtask from "../tasks/Itemtask";
import { useState } from "react";
import { StatusAlertPersonal } from "../statusbar/StatusAlertPersonal";

function Pessoal(props) {
    const [changeAppstate, setChangeAppstate] = useState("");
    props.setChangeAllstates02(changeAppstate);
    return (
        <div id="pessoal" onbeforeunload={
            ()=>{
                console.log("voltando");
            }
        }>

            <div id="logo" onClick={
                () => {
                    let timer = document.getElementById("timer")
                    timer.style.display = "flex";
                    let menuHome = document.getElementById("home");
                    menuHome.classList.remove("active")
                    let menuPessoal = document.getElementById("pessoal");
                    menuPessoal.classList.remove("active");
                    let bargadgets = document.getElementById("gadgets")
                    bargadgets.classList.remove("active")
                }
            }> <span className="material-symbols-outlined" id="home-btn">
                    home
                </span> SETTLEMENT CONTROL</div>
            {/* ---------------------------------------------------------------- */}
            <div id="personalTask" onClick={() => {
                let menutaskadd = document.querySelector(".menu-task-add");
                menutaskadd.style.display = "flex";
            }}>
                <div id="iconTask">
                    <div></div>
                    <div></div>
                </div>
                Adicionar uma tarefa pessoal
            </div>

            <div id="painel-tasks">
                <Menutaskadd setChangeAppstate={setChangeAppstate} />
                <Itemtask setChangeAppstate={setChangeAppstate} />
                <StatusAlertPersonal msg="o valor excede o limite da reserva" />
            </div>
        </div>
    )
}

export default Pessoal;