import { useState } from "react"
import { Personaltasksarray, Protaskarray } from "../../database/AllSettlementDatabases.js"
import { removepersonaltask, removeDependency } from "../../database/data/PersonalTaskData.js"
import { DependencyAlert } from "../alerts/DependencyAlert.jsx"
import "../../styles/Itemtask.css"


function Itemtask(props) {
    let randomKey = Math.floor(Math.random() * 150.152)
    const [dependencyfind, setFinddependency] = useState();
    const [hostdependency, setHostdependency] = useState();




    return (
        <div className="items-all-personal">
            <DependencyAlert dependencyfind={dependencyfind} />
            {
                Personaltasksarray.map((el, index) => {
                    const elementPersonal = el;

                    //resolvendo data-----------------------------------------

                    let day_mili = (60000 * 60) * 24;
                    let date_ini = new Date();
                    let date_end = new Date(el.inputtaskdate);
                    let time_deadline = date_end - date_ini;

                    let prazo_dias = Math.floor(time_deadline / day_mili) + 1;

                    //-----------------------------------------------------------------
                    return <div className="itemTask" key={index}>
                        <span className="task-tag">#{index + 1}</span>
                        <span className="task-msg-deadline">restando {prazo_dias} dias</span>
                        <span className="task-title">
                            {el.inputtaskname}
                            {/* excluindo item da lista------------------------------- */}
                            <button className="btn-task-finished" onClick={() => {

                                if (elementPersonal.selectdependency) {
                                    let painelalert = document.querySelector(".Alert-window")
                                    painelalert.style.display = "flex";

                                    console.log("procurando...", elementPersonal.selectdependency);
                                    Personaltasksarray.map(task => {
                                        if (elementPersonal.selectdependency === task.inputtaskname) {
                                            console.log("dependencia encontrada", task.inputtaskname);
                                            setFinddependency(task.inputtaskname)
                                            setHostdependency(elementPersonal.inputtaskname)
                                        }
                                        return 0;
                                    })
                                    Protaskarray.map(taskpro => {
                                        if (elementPersonal.selectdependency === taskpro.inputtaskname) {
                                            console.log("dependência profissional encontrada: ", taskpro.inputtaskname);
                                            setFinddependency(taskpro.inputtaskname)
                                        }
                                        return 0;
                                    })
                                }


                                if (!elementPersonal.selectdependency) {
                                    //pesquisar se esta "tarefa pessoal" está setada como uma dependencia em uma tarefa profissional.
                                    Protaskarray.map(el => {
                                        if (elementPersonal.inputtaskname === el.selectdependencypro) {
                                            console.log("excluíndo a tarefa que estava atribuída como uma dependência profissional")
                                            removeDependency(elementPersonal.inputtaskname)
                                        }
                                        return 0;
                                    })

                                    if (elementPersonal.inputtaskname === dependencyfind) {
                                        console.log("excluíndo a tarefa que estava atribuída como uma dependência");
                                        removeDependency(hostdependency);
                                    }
                                    removepersonaltask(index)
                                    props.setChangeAppstate(randomKey)
                                }

                            }}><div></div>concluir</button>

                        </span>
                        {el.dependenciafinanceira !== "" ? <div className="financial-ticket">
                            R$ {el.dependenciafinanceiravalor}
                            <span>{el.dependenciafinanceira}</span>
                        </div> : ""}
                    </div>


                })
            }
        </div>
    )
}

export default Itemtask;