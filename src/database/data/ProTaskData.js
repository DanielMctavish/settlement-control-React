import { Protaskarray } from "../AllSettlementDatabases.js";


export function ProTaskData(inputtaskname, inputtaskdatepro, selectdependencypro, dependenciafinanceira, dependenciafinanceiravalor) {
    const proTasksJson = {
        inputtaskname: inputtaskname.value,
        inputtaskdatepro: inputtaskdatepro.value,
        selectdependencypro: selectdependencypro,
        dependenciafinanceira: dependenciafinanceira.value,
        dependenciafinanceiravalor: dependenciafinanceiravalor.value
    }

    Protaskarray.push(proTasksJson)
}

export function removeprotask(index) {
    Protaskarray.splice(index, 1)
}

export function removeproDependency(hostdependency){
    Protaskarray.map(el=>{
        if(el.inputtaskname === hostdependency || el.selectdependencypro === hostdependency){
            el.selectdependencypro = ""
        }
        return 0;
    })
}

