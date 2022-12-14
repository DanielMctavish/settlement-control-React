import { useState } from "react";
import Itemtaskpro from "../tasks/Itemtaskpro";
import MenuTaskPro from "../tasks/MenuTaskPro";
import "./Profissional.css"

function Profissional(props) {
    const [changestatepro, setChangestatepro] = useState("");
    props.setChangeAllstates(changestatepro)
    
    return (
        <div id="profissional">
            <div id="logo" onClick={
                () => {
                    let timer = document.getElementById("timer")
                    timer.style.display = "flex";
                    let menuHome = document.getElementById("home");
                    menuHome.classList.remove("active")
                    let menuProfissional = document.getElementById("profissional");
                    menuProfissional.classList.remove("active");
                    let bargadgets = document.getElementById("gadgets")
                    bargadgets.classList.remove("active")
                }
            }>
                <span className="material-symbols-outlined" id="home-btn">
                    home
                </span>
                SETTLEMENT CONTROL
            </div>
            {/* ------------------------------------------------------------------------ */}
            <div id="profissionalTask" onClick={() => {
                let menutaskpro = document.querySelector(".Menu-task-pro");
                menutaskpro.style.display = "flex";
            }}>
                <div id="iconTask">
                    <div></div>
                    <div></div>
                </div>
                Adicionar uma tarefa profissional.
            </div>


            <div id="painel-tasks">
                <MenuTaskPro setChangestatepro = {setChangestatepro}/>
                <Itemtaskpro setChangestatepro = {setChangestatepro}/>
            </div>
        </div>

    )
}

export default Profissional;