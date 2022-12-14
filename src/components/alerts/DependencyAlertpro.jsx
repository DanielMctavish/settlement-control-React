import "../alerts/DependencyAlertpro.css"

export function DependencyAlertpro(props) {
    return (
        <div className="Alert-window-pro">
            Existe uma tarefa pendente! <br />
            para poder conluir esta tarefa, <br />
            conclua a tarefa: <br />

            <span>
                {props.dependencyfind}
            </span>

            <button className="btn-alert-ok" onClick={()=>{
                document.querySelector(".Alert-window-pro").style.display = "none";
            }}>ok</button>
        </div>
    )
}