import {Personaltasksarray, Protaskarray} from "../AllSettlementDatabases.js";


function PersonalTaskData(inputtaskname,inputtaskdate,selectdependency,dependenciafinanceira,dependenciafinanceiravalor) {
    const personalTasksJson = {
        inputtaskname: inputtaskname.value,
        inputtaskdate: inputtaskdate.value,
        selectdependency: selectdependency,
        dependenciafinanceira:dependenciafinanceira.value,
        dependenciafinanceiravalor:dependenciafinanceiravalor.value
    }

    Personaltasksarray.push(personalTasksJson)
}

export function removepersonaltask(index){
    Personaltasksarray.splice(index,1)
}

export function removeDependency(hostdependency){ // hostdependency é a tarefa que está sendo concluída
    Personaltasksarray.map(el=>{
        if(el.inputtaskname === hostdependency || el.selectdependency === hostdependency){
            el.selectdependency = ""
        }
        return 0;
    })
    Protaskarray.map(el =>{
        console.log(el);
        if(el.selectdependencypro === hostdependency){
            console.log("removendo dependencia");
            el.selectdependencypro = ""
        }
        return;
    })
}

export default PersonalTaskData;


