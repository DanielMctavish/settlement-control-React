import { useState, useEffect } from "react";
import "./MenuTaskPro.css";
import { ProfessionalTasksArray, PersonalTasksArray } from "../../database/AllSettlementDatabases";

function MenuTaskPro({ onTaskAdded }) {
    const [taskName, setTaskName] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [selectedDependency, setSelectedDependency] = useState("");
    const [availableTasks, setAvailableTasks] = useState([]);
    
    // Carregar as tarefas disponíveis para dependência
    useEffect(() => {
        const allTasks = [
            ...ProfessionalTasksArray.map(task => ({ name: task.name, type: 'professional' })),
            ...PersonalTasksArray.map(task => ({ name: task.name, type: 'personal' }))
        ];
        setAvailableTasks(allTasks);
    }, []);
    
    const handleAddTask = () => {
        // Validar os campos
        if (!taskName || !taskDate) {
            alert("Por favor, preencha o nome e a data da tarefa.");
            return;
        }
        
        // Criar o objeto de tarefa
        const newTask = {
            name: taskName,
            date: taskDate,
            dependency: selectedDependency || null,
            completed: false
        };
        
        // Adicionar a tarefa
        const professionalTasks = JSON.parse(localStorage.getItem('professionalTasks') || '[]');
        professionalTasks.push(newTask);
        localStorage.setItem('professionalTasks', JSON.stringify(professionalTasks));
        
        // Atualizar o array global
        ProfessionalTasksArray.push(newTask);
        
        // Limpar os campos
        setTaskName("");
        setTaskDate("");
        setSelectedDependency("");
        
        // Fechar o menu
        document.querySelector(".menu-task-pro").style.display = "none";
        
        // Notificar o componente pai
        if (onTaskAdded) {
            onTaskAdded();
        }
    };
    
    const handleCancel = () => {
        // Limpar os campos
        setTaskName("");
        setTaskDate("");
        setSelectedDependency("");
        
        // Fechar o menu
        document.querySelector(".menu-task-pro").style.display = "none";
    };
    
    return (
        <div className="menu-task-pro">
            <div className="menu-task-pro-content">
                <div className="menu-task-pro-title">Adicionar Tarefa Profissional</div>
                <div className="menu-task-pro-form">
                    <input
                        type="text"
                        placeholder="Nome da Tarefa"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <input
                        type="date"
                        value={taskDate}
                        onChange={(e) => setTaskDate(e.target.value)}
                    />
                    <select
                        value={selectedDependency}
                        onChange={(e) => setSelectedDependency(e.target.value)}
                    >
                        <option value="">Sem dependência</option>
                        {availableTasks.map((task, index) => (
                            <option key={index} value={task.name}>
                                {task.name} ({task.type === 'professional' ? 'Profissional' : 'Pessoal'})
                            </option>
                        ))}
                    </select>
                    <div className="menu-task-pro-buttons">
                        <button className="menu-task-pro-cancel" onClick={handleCancel}>
                            Cancelar
                        </button>
                        <button className="menu-task-pro-confirm" onClick={handleAddTask}>
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuTaskPro;