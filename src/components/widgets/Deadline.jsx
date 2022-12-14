import "../../styles/Deadline.css"
import { Personaltasksarray } from "../../database/AllSettlementDatabases.js";
import { Protaskarray } from "../../database/AllSettlementDatabases.js";

function Deadline() {
    let randomKey = Math.floor(Math.random() * 150.152)
    return (
        <div id="deadline-painel">
            <div id="dead-line-painel-personal">
                <h3>Tarefas Pessoais</h3>
                {
                    Personaltasksarray.map((el, index) => {

                        //resolvendo data-----------------------------------------


                        // <span className="faixa-deadline-day" style={{
                        //     width: `15px`,
                        //     left:`calc(15px*${prazo_dias-1})`
                        // }}></span>


                        let day_mili = (60000 * 60) * 24;
                        let date_ini = new Date();
                        let date_end = new Date(el.inputtaskdate);
                        let time_deadline = date_end - date_ini;

                        let prazo_dias = Math.floor(time_deadline / day_mili) + 1;

                        return <div className="deadline-list-element" key={randomKey + index}>
                            <span className="tag-deadline">#{index + 1}</span>
                            <span className="faixa-deadline" style={{
                                width: `calc(15px * ${prazo_dias})`
                            }}>
                                <span className="faixa-deadline-day" style={{
                                    width: `15px`,
                                    left: `calc(15px*${prazo_dias - 1})`
                                }}></span>
                            </span>

                        </div>

                    })
                }
            </div>

            <hr style={{ width: "300px" }} />

            <div id="dead-line-painel-pro">
                <h3>Tarefas Profissionais</h3>
                {
                    Protaskarray.map((el, index) => {

                        //resolvendo data-----------------------------------------

                        let day_mili = (60000 * 60) * 24;
                        let date_ini = new Date();
                        let date_end = new Date(el.inputtaskdatepro);
                        let time_deadline = date_end - date_ini;

                        let prazo_dias = Math.floor(time_deadline / day_mili) + 1;


                        return <div className="deadline-list-element" key={randomKey + index}>
                            <span className="tag-deadline">#{index + 1}</span>
                            <span className="faixa-deadline" style={{ width: `calc(15px * ${prazo_dias})` }}>
                                <span className="faixa-deadline-day" style={{
                                    width: `15px`,
                                    left: `calc(15px*${prazo_dias - 1})`
                                }}></span>
                            </span>
                        </div>
                    })
                }
            </div>
            <div className="space-painel" ></div>


        </div>
    )
}

export default Deadline;


