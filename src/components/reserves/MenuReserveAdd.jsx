import "./MenuReserveAdd.css"
import { addNewReserve } from "../../database/data/FinancialData.js";
import { Saldo } from "../../database/data/FinancialData.js";
import { StatusAlert } from "../statusbar/StatusAlert";



function MenuReserveAdd(props) {

    let ramdonKey = Math.floor(Math.random() * 127);
    

    return (
        <div className="MenuReserveAdd">
            <StatusAlert alertmsg="o valor da reserva é maior do que o saldo" />
            <span className="material-symbols-outlined" id="close-btn" onClick={() => {
                document.querySelector(".MenuReserveAdd").style.display = "none";
            }}>
                close
            </span>
            <div className="group-input"> <span>nome da reserva: </span> <input type="text" className="reserve-name" /></div>
            <div className="group-input"> <span>valor da reserva:</span> <input type="number" className="reserve-value" /></div>
            <button onClick={() => {
                let reserveName = document.querySelector(".reserve-name")
                let reserveValue = document.querySelector(".reserve-value")
                let StatusAlert = document.querySelector(".StatusAlert")
                StatusAlert.style.display = "none"

                if (Saldo <= 0) {
                    return console.log("adicione saldo antes");
                }
                if (reserveValue.value > Saldo) {
                    StatusAlert.style.display = "flex"
                    return
                }


                addNewReserve(reserveName, reserveValue);
                reserveName.value = ""
                reserveValue.value = ""
                document.querySelector(".MenuReserveAdd").style.display = "none";
                props.setUpdateRender(ramdonKey)
            }}>confirmar</button>
        </div>
    )
}

export default MenuReserveAdd;