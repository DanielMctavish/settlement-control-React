import PersonalTaskData from "../../database/data/PersonalTaskData.js";
import { Personaltasksarray } from "../../database/AllSettlementDatabases.js";
import { Protaskarray } from "../../database/AllSettlementDatabases.js";
import { ReservesArray } from "../../database/AllSettlementDatabases.js";
import { comsumeReserve } from "../../database/data/FinancialData.js";
import "../../styles/Menutaskadd.css"


function Menutaskadd(props) {

    let randomKey = Math.floor(Math.random() * 150.152)

    return (
        <div className="menu-task-add" key={randomKey - 1} >
            
            <span className="material-symbols-outlined" id="close-menu-icon" onClick={() => {
                let menutaskadd = document.querySelector(".menu-task-add");
                menutaskadd.style.display = "none";
            }}>
                close
            </span>
            <div>
                Nome da tarefa
                <input type="text" placeholder="nome da tarefa" className="input-task-name" required />
            </div>
            <div>
                Prazo
                <input type="date" className="input-task-date" required />
            </div>
            <div>
                Dependências
                <select className="select-dependency" name="select-dependency">
                    <option value="" key={randomKey}></option>
                    {
                        Personaltasksarray.map(el => {
                            return <option name="select-dependency" value={el.inputtaskname}>{el.inputtaskname}</option>
                        })
                    }
                    {
                        Protaskarray.map(el => {
                            return <option name="select-dependency" value={el.inputtaskname}>{el.inputtaskname}</option>
                        })
                    }
                </select>
            </div>
            <div>
                Dependência Financeira
                <div className="financialfield">
                    <select className="select-dependency-financial">
                        <option value=""></option>
                        {
                            ReservesArray.map(el => {
                                return <option value={el.name}>{el.name}</option>
                            })
                        }
                    </select>
                    <input type="number" placeholder="R$ 100,00" className="input-value-dependency" />
                </div>
            </div>
            <button className="btn-confirm-newtask" onClick={() => {
                const inputtaskname = document.querySelector(".input-task-name")//nome da tarefa
                const inputtaskdate = document.querySelector(".input-task-date")//prazo da tarefa
                const selectdependency = document.querySelector(".select-dependency")//dependencias da tarefa
                const dependenciafinanceira = document.querySelector(".select-dependency-financial")//dependencia financeira
                const dependenciafinanceiravalor = document.querySelector(".input-value-dependency")//valor da dependencia financeira

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

                if (!inputtaskdate.value) {
                    inputtaskdate.style.border = "2px red solid"
                    inputtaskdate.style.background = "#e87d7d"
                    inputtaskdate.style.color = "white"
                    return
                } else {
                    inputtaskdate.style.border = "none"
                    inputtaskdate.style.background = "white"
                    inputtaskdate.style.color = "black"
                }
                ReservesArray.map(el => {
                    if (dependenciafinanceira.value === el.name) {
                        console.log("dependencia financeira encontrada");
                        if (parseFloat(dependenciafinanceiravalor.value) > el.value) {
                            console.log("o valor escolhido é maior do que a reserva");
                            document.querySelector(".status-personal-alert").style.display = "flex";
                            props.setChangeAppstate(Math.floor(Math.random() * 120))
                            return
                        }

                        let menutaskadd = document.querySelector(".menu-task-add");
                        menutaskadd.style.display = "none";

                        comsumeReserve(dependenciafinanceira, dependenciafinanceiravalor)
                        PersonalTaskData(inputtaskname, inputtaskdate, selectdependency.value, dependenciafinanceira, dependenciafinanceiravalor);

                        inputtaskname.value = "";
                        inputtaskdate.value = "";
                        props.setChangeAppstate(Math.floor(Math.random() * 120))
                        return;
                    }
                    return 0;
                })

                if (!dependenciafinanceira.value) {
                    let menutaskadd = document.querySelector(".menu-task-add");
                    menutaskadd.style.display = "none";

                    comsumeReserve(dependenciafinanceira, dependenciafinanceiravalor)
                    PersonalTaskData(inputtaskname, inputtaskdate, selectdependency.value, dependenciafinanceira, dependenciafinanceiravalor);

                    inputtaskname.value = "";
                    inputtaskdate.value = "";
                    props.setChangeAppstate(Math.floor(Math.random() * 120))
                }

            }}>confirmar</button>
        </div>
    )
}

export default Menutaskadd;