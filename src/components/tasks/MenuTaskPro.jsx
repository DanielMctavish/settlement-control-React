import "../../styles/MenuTaskPro.css"
import { ProTaskData } from "../../database/data/ProTaskData.js";
import { Protaskarray } from "../../database/AllSettlementDatabases.js";
import { Personaltasksarray } from "../../database/AllSettlementDatabases.js";
import { ReservesArray } from "../../database/AllSettlementDatabases.js";
import { comsumeReserve } from "../../database/data/FinancialData.js";


function MenuTaskPro(props) {

    let randomKey = Math.floor(Math.random() * 150.152)

    return (
        <div className="Menu-task-pro" key={randomKey + 1} >
            <span className="material-symbols-outlined" id="close-menu-icon" onClick={() => {
                let menutasktpro = document.querySelector(".Menu-task-pro");
                menutasktpro.style.display = "none";
            }}>
                close
            </span>
            <div>
                Nome da tarefa
                <input type="text" placeholder="nome da tarefa" className="input-taskpro-name" required />
            </div>
            <div>
                Prazo
                <input type="date" className="input-task-date-pro" required />
            </div>
            <div>
                Dependências
                <select className="select-dependency-pro">
                    <option value=""></option>
                    {
                        Protaskarray.map(el => {
                            return <option name="select-dependency" value={el.inputtaskname}>{el.inputtaskname}</option>
                        })
                    }
                    {
                        Personaltasksarray.map(el => {
                            return <option name="select-dependency" value={el.inputtaskname}>{el.inputtaskname}</option>
                        })
                    }
                </select>
            </div>
            <div>
                Dependência Financeira
                <div className="financialfield">
                    <select className="select-dependency-financial-pro">
                        <option value=""></option>
                        {
                            ReservesArray.map(el => {
                                return <option value={el.name}>{el.name}</option>
                            })
                        }
                    </select>
                    <input type="number" placeholder="R$ 100,00" className="input-value-dependency-pro" />
                </div>
            </div>
            <button className="btn-confirm-newtask" onClick={() => {
                const inputtaskname = document.querySelector(".input-taskpro-name")//nome da tarefa
                const inputtaskdatepro = document.querySelector(".input-task-date-pro")//prazo da tarefa
                const selectdependencypro = document.querySelector(".select-dependency-pro")//dependencias da tarefa
                const dependenciafinanceirapro = document.querySelector(".select-dependency-financial-pro")//dependencia financeira
                const dependenciafinanceiravalorpro = document.querySelector(".input-value-dependency-pro")//valor da dependencia financeira

                if (!inputtaskname.value) {
                    inputtaskname.style.border = "2px red solid"
                    inputtaskname.style.background = "#e87d7d"
                    inputtaskname.style.color = "white"
                    return
                } else {
                    inputtaskname.style.background = "white"
                    inputtaskname.style.color = "black"
                    inputtaskname.style.border = "none"
                }

                if (!inputtaskdatepro.value) {
                    inputtaskdatepro.style.background = "#e87d7d"
                    inputtaskdatepro.style.color = "white"
                    return
                } else {
                    inputtaskdatepro.style.background = "white"
                    inputtaskdatepro.style.color = "black"
                }
                //-----------------------------------------------------------------------------------------------------------------------------

                ReservesArray.map(el => {
                    if (dependenciafinanceirapro.value === el.name) {
                        console.log("dependencia financeira encontrada");
                        if (parseFloat(dependenciafinanceiravalorpro.value) > el.value) {
                            console.log("o valor escolhido é maior do que a reserva");
                            document.querySelector(".status-personal-alert").style.display = "flex";
                            props.setChangestatepro(Math.floor(Math.random() * 120))
                            return
                        }

                        let menuproadd = document.querySelector(".Menu-task-pro");
                        menuproadd.style.display = "none";

                        comsumeReserve(dependenciafinanceirapro, dependenciafinanceiravalorpro)
                        ProTaskData(inputtaskname, inputtaskdatepro, selectdependencypro.value, dependenciafinanceirapro, dependenciafinanceiravalorpro);

                        inputtaskname.value = "";
                        inputtaskdatepro.value = "";
                        props.setChangestatepro(Math.floor(Math.random() * 120))
                        return;
                    }
                    return 0;
                })

                if (!dependenciafinanceirapro.value) {
                    let menuproadd = document.querySelector(".Menu-task-pro");
                    menuproadd.style.display = "none";

                    comsumeReserve(dependenciafinanceirapro, dependenciafinanceiravalorpro)
                    ProTaskData(inputtaskname, inputtaskdatepro, selectdependencypro.value, dependenciafinanceirapro, dependenciafinanceiravalorpro);

                    inputtaskname.value = "";
                    inputtaskdatepro.value = "";
                    props.setChangestatepro(Math.floor(Math.random() * 120))
                }

            }}>confirmar</button>
        </div>
    )
}

export default MenuTaskPro;