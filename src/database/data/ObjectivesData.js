import { ObjectivesArray } from "../AllSettlementDatabases.js";

export function AddObjective(obj) {
    ObjectivesArray.push(obj)
}

export function RemoveObj(index) {
    ObjectivesArray.splice(index, 1)
}