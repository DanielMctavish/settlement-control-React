import "../objective/ObjectiveMenu.css"
import { AddObjective } from "../../database/data/ObjectivesData.js";

function ObjectiveMenu(props){
    return(
        <div className="objectivemenu">
            Digite aqui um objetivo pessoal: <input type="text" className="input-objective" />
            <button className="btn-objective-add" onClick={()=>{
                document.querySelector(".objectivemenu").classList.remove("active")
                AddObjective(document.querySelector(".input-objective").value);
                document.querySelector(".input-objective").value = "";
                props.setRenderobj(Math.floor(Math.random() * 130))
            }}>adicionar</button>
        </div>
    )
}

export default ObjectiveMenu;