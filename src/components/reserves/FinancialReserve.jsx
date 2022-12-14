import "./FinancialReserve.css"
import { removeAtualReserve } from "../../database/data/FinancialData.js";
import { reAddValueReserve } from "../../database/data/FinancialData.js";
import { Saldo } from "../../database/data/FinancialData.js";

export default function FinancialReserve(props) {
    let ramdonKey = Math.floor(Math.random() * 127);
    let indexProps = props.index;
    let reserveitemdisplay = parseFloat(props.reservevalue).toFixed(2);
    
    return (
        <div className="reserve-item">
            
            <span className="display-item-saldo-reserve">R${reserveitemdisplay}</span>
            <span id={`alert-item-reserve${indexProps}`} className="alert-item-reserve" >valor maior do que o saldo :/</span>
            <span className="reserve-name-item">{props.reservename}</span>
            <div className={`btns-item-reserve${indexProps}`} id = "btns-reserve-style">
                <button onClick={
                    () => {

                        let divBtnsReserve = document.querySelector(`.btns-item-reserve${indexProps}`)
                        let newInputValueReserve = document.getElementById(`newInputValueReserve${indexProps}`)
                        let alertitemreserve = document.getElementById(`alert-item-reserve${indexProps}`)
                        
                        if (!newInputValueReserve) {
                            let newInputText = document.createElement("input")
                            newInputText.setAttribute("type", "number")
                            newInputText.setAttribute("id", `newInputValueReserve${indexProps}`)
                            newInputText.style.width = "100px"
                            divBtnsReserve.appendChild(newInputText)
                        }

                        if (parseFloat(newInputValueReserve.value) > Saldo) {
                            //console.log("o valor é maior do que o saldo permitido")
                            
                            alertitemreserve.style.display = "flex"
                            alertitemreserve.style.opacity = "1"
                            
                            setTimeout(() => {
                                alertitemreserve.style.transition = "2s"
                                alertitemreserve.style.opacity = "0"
                                setTimeout(()=>{alertitemreserve.style.display = "none"},2000)
                            }, 1500);

                            props.setUpdateRender(ramdonKey)
                            return
                        }

                        if (document.getElementById(`newInputValueReserve${indexProps}`)) {
                            reAddValueReserve(props.reservename, document.getElementById(`newInputValueReserve${indexProps}`).value)
                            document.getElementById(`newInputValueReserve${indexProps}`).value = ""
                            divBtnsReserve.removeChild(document.getElementById(`newInputValueReserve${indexProps}`))
                            props.setUpdateRender(ramdonKey)
                        }

                    }
                }>adicionar</button>
                <button id="btn-del-reserve" onClick={() => {

                    removeAtualReserve(indexProps, props.reservevalue)
                    props.setUpdateRender(ramdonKey)

                }}>devolver</button>
            </div>
        </div>
    )
}