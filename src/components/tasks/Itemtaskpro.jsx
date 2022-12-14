import { useState } from "react";
import { Protaskarray, Personaltasksarray } from "../../database/AllSettlementDatabases.js";
import { removeprotask, removeproDependency } from "../../database/data/ProTaskData.js";
import { removeDependency } from "../../database/data/PersonalTaskData.js";
import "../../styles/Itemtask.css"
import { DependencyAlertpro } from "../alerts/DependencyAlertpro.jsx";

function Itemtaskpro(props) {
    let randomKey = Math.floor(Math.random() * 150.152)
    const [dependencyfind, setFinddependency] = useState();
    const [hostdependency, setHostdependency] = useState();

    return (
        <>
            <DependencyAlertpro dependencyfind={dependencyfind} />
            {
                Protaskarray.map((el, index) => {
                    const elementPro = el;
                    //resolvendo data-----------------------------------------

                    let day_mili = (60000 * 60) * 24;
                    let date_ini = new Date();
                    let date_end = new Date(el.inputtaskdatepro);
                    let time_deadline = date_end - date_ini;

                    let prazo_dias_pro = Math.floor(time_deadline / day_mili) + 1;
                    //-----------------------------------------------------------------
                    return <div className="itemTask" key={randomKey + index}>
                        <span className="task-tag">#{index + 1}</span>
                        <span className="task-msg-deadline">restando {prazo_dias_pro} dias</span>
                        <span className="task-title">
                            {el.inputtaskname}

                            <button className="btn-task-finished" onClick={() => {//excluindo da array

                                if (elementPro.selectdependencypro) {
                                    let painelalert = document.querySelector(".Alert-window-pro")
                                    painelalert.style.display = "flex";

                                    Protaskarray.map(task => {
                                        console.log(task);
                                        if (elementPro.selectdependencypro === task.inputtaskname) {
                                            console.log("dependencia encontrada", task.inputtaskname);
                                            setFinddependency(task.inputtaskname)
                                            setHostdependency(elementPro.inputtaskname)
                                        }
                                        return 0;
                                    })

                                    Personaltasksarray.map(taskpersonal => {
                                        if (elementPro.selectdependencypro === taskpersonal.inputtaskname) {
                                            console.log("dependência pessoal encontrada: ", taskpersonal.inputtaskname);
                                            setFinddependency(taskpersonal.inputtaskname)
                                            setHostdependency(elementPro.inputtaskname)
                                        }
                                        return 0;
                                    })
                                }

                                if (!elementPro.selectdependencypro) {
                                    //pesquisar se esta "tarefa profissional" está setada como uma dependencia em uma tarefa pessoal.
                                    Personaltasksarray.map(el => {
                                        if (elementPro.inputtaskname === el.selectdependency) {
                                            console.log("excluíndo a tarefa que estava atribuída como uma dependência pessoal")
                                            removeDependency(elementPro.inputtaskname)
                                        }
                                        return 0;
                                    })

                                    if (elementPro.inputtaskname === dependencyfind) {
                                        console.log("excluíndo a tarefa que estava atribuída como uma dependência");
                                        removeproDependency(hostdependency);
                                    }
                                    removeprotask(index)
                                    props.setChangestatepro(randomKey)
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
        </>
    )


}

export default Itemtaskpro;