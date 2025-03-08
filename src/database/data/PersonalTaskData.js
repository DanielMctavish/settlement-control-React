import { PersonalTasksArray, ProfessionalTasksArray } from "../AllSettlementDatabases";

export function PersonalTaskData(taskName, taskDate, dependency = null, financialReserve = null) {
    // Criar o objeto de tarefa
    const newTask = {
        name: taskName,
        date: taskDate,
        dependency: dependency,
        financialReserve: financialReserve,
        completed: false
    };
    
    // Adicionar ao array global
    PersonalTasksArray.push(newTask);
    
    // Salvar no localStorage
    const savedTasks = JSON.parse(localStorage.getItem('personalTasks') || '[]');
    savedTasks.push(newTask);
    localStorage.setItem('personalTasks', JSON.stringify(savedTasks));
    
    return newTask;
}

export function removePersonalTask(index) {
    if (index >= 0 && index < PersonalTasksArray.length) {
        // Remover do array global
        PersonalTasksArray.splice(index, 1);
        
        // Atualizar localStorage
        localStorage.setItem('personalTasks', JSON.stringify(PersonalTasksArray));
        return true;
    }
    return false;
}

export function completePersonalTask(index) {
    if (index >= 0 && index < PersonalTasksArray.length) {
        // Marcar como concluída
        PersonalTasksArray[index].completed = true;
        
        // Atualizar localStorage
        localStorage.setItem('personalTasks', JSON.stringify(PersonalTasksArray));
        return true;
    }
    return false;
}

export default PersonalTaskData;


