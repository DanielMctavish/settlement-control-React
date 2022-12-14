import "./statuspersonal.css"

export function StatusAlertPersonal(props) {
    return (
        <div className="status-personal-alert">
            <span>{props.msg}</span>
            <button onClick={()=>{
                document.querySelector(".status-personal-alert").style.display = "none";
            }}>entendi</button>
        </div>
    )
}