import "../alerts/DependencyAlert.css"

export function DependencyAlert(props) {
    return (
        <div className="Alert-window">
            Existe uma tarefa pendente <br />
            para poder conluir esta tarefa, antes <br />
            conclua a tarefa: <br />

            <span>
                {props.dependencyfind}
            </span>

            <button className="btn-alert-ok" onClick={()=>{
                document.querySelector(".Alert-window").style.display = "none";
            }}>ok</button>
        </div>
    )
}