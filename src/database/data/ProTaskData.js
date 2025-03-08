import { ProfessionalTasksArray } from "../AllSettlementDatabases";

export function ProTaskData(taskName, taskDate, dependency = null) {
    // Criar o objeto de tarefa
    const newTask = {
        name: taskName,
        date: taskDate,
        dependency: dependency,
        completed: false
    };
    
    // Adicionar ao array global
    ProfessionalTasksArray.push(newTask);
    
    // Salvar no localStorage
    const savedTasks = JSON.parse(localStorage.getItem('professionalTasks') || '[]');
    savedTasks.push(newTask);
    localStorage.setItem('professionalTasks', JSON.stringify(savedTasks));
    
    return newTask;
}

export function removeProTask(index) {
    if (index >= 0 && index < ProfessionalTasksArray.length) {
        // Remover do array global
        ProfessionalTasksArray.splice(index, 1);
        
        // Atualizar localStorage
        localStorage.setItem('professionalTasks', JSON.stringify(ProfessionalTasksArray));
        return true;
    }
    return false;
}

export function completeProTask(index) {
    if (index >= 0 && index < ProfessionalTasksArray.length) {
        // Marcar como concluída
        ProfessionalTasksArray[index].completed = true;
        
        // Atualizar localStorage
        localStorage.setItem('professionalTasks', JSON.stringify(ProfessionalTasksArray));
        return true;
    }
    return false;
}

export default ProTaskData;

export function removeproDependency(hostdependency){
    ProfessionalTasksArray.map(el=>{
        if(el.name === hostdependency || el.dependency === hostdependency){
            el.dependency = ""
        }
        return 0;
    })
}

