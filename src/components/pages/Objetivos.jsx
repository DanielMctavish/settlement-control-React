import { useState } from "react";
import { ObjectiveList } from "../objective/ObjectiveList";
import ObjectiveMenu from "../objective/ObjectiveMenu";
import "./Objetivos.css"

function Objetivos() {
    return (
        <div id="objetivos">
            <ObjectiveMenu />
            <div className="painel-obj-list">
                <ObjectiveList />
            </div>

            <div id="logo" onClick={
                () => {
                    let timer = document.getElementById("timer")
                    timer.style.display = "flex";
                    let menuHome = document.getElementById("home");
                    menuHome.classList.remove("active")
                    let menuObjetivos = document.getElementById("objetivos");
                    menuObjetivos.classList.remove("active");
                }
            }>SETTLEMENT CONTROL</div>
            <div className="addNewObjective" onClick={() => {
                document.querySelector(".objectivemenu").classList.toggle("active")
            }}>
                <span className="material-symbols-outlined" id="addplus">
                    add
                </span>
                <span>Adicionar uma nota de objetivo</span>
            </div>
        </div>
    )
}

export default Objetivos;