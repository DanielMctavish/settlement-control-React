import { useState, useEffect } from "react";
import "./Itemtaskpro.css";
import { ProfessionalTasksArray, PersonalTasksArray } from "../../database/AllSettlementDatabases";
import { DependencyAlertpro } from "../alerts/DependencyAlertpro.jsx";

function Itemtaskpro({ updateState }) {
    const [tasks, setTasks] = useState([]);
    const [updateRender, setUpdateRender] = useState(0);
    const [dependencyfind, setFinddependency] = useState();
    const [hostdependency, setHostdependency] = useState();
    
    // Carregar tarefas do localStorage
    useEffect(() => {
        const savedTasks = localStorage.getItem('professionalTasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        } else {
            // Compatibilidade com dados antigos
            setTasks(ProfessionalTasksArray);
        }
    }, [updateRender]);
    
    // Atualizar o componente pai quando necessário
    useEffect(() => {
        if (updateRender > 0) {
            updateState();
        }
    }, [updateRender, updateState]);
    
    const handleDeleteTask = (index) => {
        if (window.confirm("Deseja realmente excluir esta tarefa?")) {
            const updatedTasks = [...tasks];
            updatedTasks.splice(index, 1);
            setTasks(updatedTasks);
            
            // Atualizar o array global e o localStorage
            ProfessionalTasksArray.length = 0;
            updatedTasks.forEach(task => ProfessionalTasksArray.push(task));
            localStorage.setItem('professionalTasks', JSON.stringify(updatedTasks));
            
            setUpdateRender(prev => prev + 1);
        }
    };
    
    const handleCompleteTask = (index) => {
        if (window.confirm("Marcar esta tarefa como concluída?")) {
            const updatedTasks = [...tasks];
            updatedTasks[index].completed = true;
            setTasks(updatedTasks);
            
            // Atualizar o array global e o localStorage
            ProfessionalTasksArray.length = 0;
            updatedTasks.forEach(task => ProfessionalTasksArray.push(task));
            localStorage.setItem('professionalTasks', JSON.stringify(updatedTasks));
            
            setUpdateRender(prev => prev + 1);
        }
    };
    
    // Verificar se uma tarefa tem dependência
    const hasDependency = (task) => {
        return task.dependency && task.dependency !== "";
    };
    
    // Encontrar a tarefa dependente
    const findDependentTask = (taskName) => {
        // Procurar nas tarefas profissionais
        const proTask = ProfessionalTasksArray.find(task => task.name === taskName);
        if (proTask) return proTask;
        
        // Procurar nas tarefas pessoais
        return PersonalTasksArray.find(task => task.name === taskName);
    };
    
    return (
        <div className="pro-tasks-container">
            <DependencyAlertpro dependencyfind={dependencyfind} />
            {tasks.length === 0 ? (
                <div className="no-tasks-message">
                    Nenhuma tarefa profissional adicionada.
                </div>
            ) : (
                tasks.map((task, index) => (
                    <div 
                        key={index} 
                        className={`pro-task-item ${task.completed ? 'task-completed' : ''} ${hasDependency(task) ? 'task-dependency' : ''}`}
                    >
                        <div className="pro-task-item-info">
                            <div className="pro-task-item-title">{task.name}</div>
                            <div className="pro-task-item-date">
                                {new Date(task.date).toLocaleDateString('pt-BR')}
                                {hasDependency(task) && (
                                    <span className="task-dependency-info">
                                        {" - Depende de: "}{task.dependency}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="pro-task-item-actions">
                            {!task.completed && (
                                <button 
                                    className="pro-task-item-complete" 
                                    onClick={() => handleCompleteTask(index)}
                                >
                                    <span className="material-symbols-outlined">check_circle</span>
                                </button>
                            )}
                            <button 
                                className="pro-task-item-delete" 
                                onClick={() => handleDeleteTask(index)}
                            >
                                <span className="material-symbols-outlined">delete</span>
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Itemtaskpro;