import { ObjectivesArray } from "../../database/AllSettlementDatabases.js"
import { RemoveObj } from "../../database/data/ObjectivesData.js"
import "./ObjList.css"

export function ObjectiveList(props) {
    return (
        ObjectivesArray.map((el, index) => {
            return <div className="obj-item">
                <span>{index + 1} - </span> {el}
                <span className="btn-obj-item" onClick={
                    ()=>{
                        RemoveObj(index)
                        props.setRenderobj(Math.floor(Math.random() * 130))
                    }
                }>excluir</span>
            </div>
        })
    )
}