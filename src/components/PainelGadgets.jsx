import "../styles/PainelGaggets.css"
import Calendar from "./widgets/Calendar";
import Deadline from "./widgets/Deadline";
import DigitalClock from "./widgets/DigitalClock";

function PainelGadgets() {
    return (
        <div id="gadgets">
            <div>
                <span className="material-symbols-outlined" id="btn-menu-deadline-icon" onClick={() => {
                    document.getElementById("gadgets").classList.toggle("active2")
                    document.getElementById("btn-menu-deadline-icon").classList.toggle("active")
                    document.querySelector(".displaySaldo").classList.toggle("active")
                }}>
                    double_arrow
                </span>
                <Calendar />
                <DigitalClock />
                <Deadline />
            </div>
        </div>
    )
}

export default PainelGadgets;