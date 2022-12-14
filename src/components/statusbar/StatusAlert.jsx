import "./StatusAlert.css"

export function StatusAlert(props) {

    return (
        <div className="StatusAlert">
            {props.alertmsg}
            <button onClick={() => {
                let StatusAlert = document.querySelector(".StatusAlert")
                StatusAlert.style.display = "none"
            }}>entendi</button>
        </div>

    )
}