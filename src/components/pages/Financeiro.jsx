import "./Financeiro.css"
import { AddSaldo, ResetSaldo } from "../../database/data/FinancialData.js";
import { Saldo } from "../../database/data/FinancialData.js";
import { ReservesArray } from "../../database/AllSettlementDatabases.js";
import FinancialReserve from "../reserves/FinancialReserve";
import MenuReserveAdd from "../reserves/MenuReserveAdd";
import { useState } from "react";


function Financeiro(props) {
    let displaySaldo = document.querySelector(".displaySaldo");

    const [updateRender, setUpdateRender] = useState()
    props.setChangeAllstates(updateRender);

    return (
        <div id="financeiro">
            <div id="logo" onClick={
                () => {
                    let timer = document.getElementById("timer")
                    timer.style.display = "flex";
                    let menuHome = document.getElementById("home");
                    menuHome.classList.remove("active")
                    let menuFinancial = document.getElementById("financeiro");
                    menuFinancial.classList.remove("active");
                    let bargadgets = document.getElementById("gadgets")
                    bargadgets.classList.remove("active")
                }
            }>SETTLEMENT CONTROL</div>
            <div className="displaySaldo">R${Saldo.toFixed(2)}</div>
            <div className="financial-head">
                <div>
                    Adicionar saldo: <input type="number" className="input-saldo" />
                    <button className="btn-confirm-financial" onClick={
                        () => {
                            let inputSaldo = document.querySelector(".input-saldo");
                            if (!inputSaldo.value) {
                                return 0;
                            }
                            if (inputSaldo.value <= 0) {
                                return 0;
                            }

                            displaySaldo.style.border = "none"
                            AddSaldo(inputSaldo.value)
                            inputSaldo.value = ""
                            props.setChangeAllstates(Math.floor(Math.random() * 35))
                        }
                    }>CONFIRMAR</button>
                    <button className="btn-edit-confirm" onClick={() => {
                        displaySaldo.style.border = "2px solid white"
                        displaySaldo.style.padding = "5px"
                        ResetSaldo()
                        props.setChangeAllstates(Math.floor(Math.random() * 35))
                    }}>ZERAR</button>
                </div>
            </div>
            <div className="add-financial-reserve" onClick={() => {
                document.querySelector(".MenuReserveAdd").style.display = "flex";
            }}>
                <div>
                    <span className="material-symbols-outlined" id="icon-pay">
                        payments
                    </span>
                    <span>Adicionar uma reserva financeira</span>
                </div>
            </div>
            <MenuReserveAdd setUpdateRender={setUpdateRender} />
            <div className="painel-list-reserves">
                {ReservesArray.map((el, index) => {
                    return <FinancialReserve key={index} reservename={el.name} reservevalue={el.value} index={index} setUpdateRender={setUpdateRender} />
                })}
            </div>
        </div>
    )
}

export default Financeiro;