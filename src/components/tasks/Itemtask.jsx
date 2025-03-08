import "./Itemtask.css";
import { useState } from "react";
import { PersonalTasksArray, ProfessionalTasksArray } from "../../database/AllSettlementDatabases";
import { useToast } from "../common/ToastManager";

function Itemtask({ index, taskname, taskdate, completed, dependencia, dependenciafinanceira, dependenciafinanceiravalor, onUpdate, taskType = "personal" }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTaskName, setEditTaskName] = useState(taskname);
    const [editTaskDate, setEditTaskDate] = useState(taskdate);
    const [editDependencia, setEditDependencia] = useState(dependencia);
    const [editDependenciaFinanceira, setEditDependenciaFinanceira] = useState(dependenciafinanceira);
    const [editDependenciaFinanceiraValor, setEditDependenciaFinanceiraValor] = useState(dependenciafinanceiravalor);
    const toast = useToast();
    
    // Determinar qual array de tarefas usar com base no tipo
    const tasksArray = taskType === "professional" ? ProfessionalTasksArray : PersonalTasksArray;
    const storageKey = taskType === "professional" ? 'professionalTasks' : 'personalTasks';
    
    // Formatar a data para exibição
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };
    
    // Calcular dias restantes
    const calculateDaysLeft = (dateString) => {
        const taskDate = new Date(dateString);
        const today = new Date();
        
        // Resetar horas para comparar apenas as datas
        taskDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        
        const diffTime = taskDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays;
    };
    
    const daysLeft = calculateDaysLeft(taskdate);
    
    // Determinar a classe de status com base nos dias restantes
    const getStatusClass = () => {
        if (completed) return "completed";
        if (daysLeft < 0) return "overdue";
        if (daysLeft === 0) return "today";
        if (daysLeft <= 3) return "soon";
        return "upcoming";
    };
    
    // Determinar o texto de status com base nos dias restantes
    const getStatusText = () => {
        if (completed) return "Concluída";
        if (daysLeft < 0) return `Atrasada (${Math.abs(daysLeft)} dias)`;
        if (daysLeft === 0) return "Hoje";
        if (daysLeft === 1) return "Amanhã";
        return `${daysLeft} dias restantes`;
    };
    
    const handleToggleComplete = () => {
        tasksArray[index].completed = !completed;
        localStorage.setItem(storageKey, JSON.stringify(tasksArray));
        
        toast.showInfo(completed ? "Tarefa marcada como pendente" : "Tarefa marcada como concluída");
        
        if (onUpdate) {
            onUpdate();
        }
    };
    
    const handleEdit = () => {
        setIsEditing(true);
    };
    
    const handleDelete = () => {
        tasksArray.splice(index, 1);
        localStorage.setItem(storageKey, JSON.stringify(tasksArray));
        
        toast.showSuccess("Tarefa removida com sucesso");
        
        if (onUpdate) {
            onUpdate();
        }
    };
    
    const handleSaveEdit = () => {
        if (!editTaskName.trim()) {
            toast.showError("O nome da tarefa não pode estar vazio");
            return;
        }
        
        if (!editTaskDate) {
            toast.showError("A data da tarefa não pode estar vazia");
            return;
        }
        
        if (editDependenciaFinanceira && !editDependenciaFinanceiraValor) {
            toast.showError("Por favor, insira um valor para a dependência financeira");
            return;
        }
        
        tasksArray[index] = {
            ...tasksArray[index],
            taskname: editTaskName,
            taskdate: editTaskDate,
            dependencia: editDependencia,
            dependenciafinanceira: editDependenciaFinanceira,
            dependenciafinanceiravalor: editDependenciaFinanceira ? editDependenciaFinanceiraValor : "0"
        };
        
        localStorage.setItem(storageKey, JSON.stringify(tasksArray));
        
        toast.showSuccess("Tarefa atualizada com sucesso");
        
        setIsEditing(false);
        
        if (onUpdate) {
            onUpdate();
        }
    };
    
    const handleCancelEdit = () => {
        // Restaurar valores originais
        setEditTaskName(taskname);
        setEditTaskDate(taskdate);
        setEditDependencia(dependencia);
        setEditDependenciaFinanceira(dependenciafinanceira);
        setEditDependenciaFinanceiraValor(dependenciafinanceiravalor);
        
        setIsEditing(false);
    };
    
    return (
        <div className={`task-item ${getStatusClass()} ${taskType}`}>
            {isEditing ? (
                <div className="task-edit-form">
                    <div className="form-group">
                        <label>Nome da Tarefa</label>
                        <input
                            type="text"
                            value={editTaskName}
                            onChange={(e) => setEditTaskName(e.target.value)}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Data da Tarefa</label>
                        <input
                            type="date"
                            value={editTaskDate}
                            onChange={(e) => setEditTaskDate(e.target.value)}
                        />
                    </div>
                    
                    <div className="form-group checkbox-group">
                        <input
                            type="checkbox"
                            id={`edit-dependencia-${index}`}
                            checked={editDependencia}
                            onChange={(e) => setEditDependencia(e.target.checked)}
                        />
                        <label htmlFor={`edit-dependencia-${index}`}>Tem dependência?</label>
                    </div>
                    
                    <div className="form-group checkbox-group">
                        <input
                            type="checkbox"
                            id={`edit-dependencia-financeira-${index}`}
                            checked={editDependenciaFinanceira}
                            onChange={(e) => setEditDependenciaFinanceira(e.target.checked)}
                        />
                        <label htmlFor={`edit-dependencia-financeira-${index}`}>Tem dependência financeira?</label>
                    </div>
                    
                    {editDependenciaFinanceira && (
                        <div className="form-group">
                            <label>Valor da Dependência Financeira</label>
                            <input
                                type="number"
                                value={editDependenciaFinanceiraValor}
                                onChange={(e) => setEditDependenciaFinanceiraValor(e.target.value)}
                                min="0"
                                step="0.01"
                            />
                        </div>
                    )}
                    
                    <div className="edit-actions">
                        <button className="cancel-edit-button" onClick={handleCancelEdit}>
                            Cancelar
                        </button>
                        <button className="save-edit-button" onClick={handleSaveEdit}>
                            Salvar
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="task-checkbox">
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={handleToggleComplete}
                            id={`task-${index}`}
                        />
                        <label htmlFor={`task-${index}`}></label>
                    </div>
                    
                    <div className="task-content">
                        <div className="task-header">
                            <h3 className={completed ? "completed-text" : ""}>{taskname}</h3>
                            <div className="task-badges">
                                {dependencia && (
                                    <span className="task-badge dependency-badge" title="Esta tarefa tem dependência">
                                        <span className="material-symbols-outlined">link</span>
                                    </span>
                                )}
                                
                                {dependenciafinanceira && (
                                    <span className="task-badge financial-badge" title={`Dependência financeira: R$ ${dependenciafinanceiravalor}`}>
                                        <span className="material-symbols-outlined">payments</span>
                                        R$ {dependenciafinanceiravalor}
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        <div className="task-details">
                            <div className="task-date">
                                <span className="material-symbols-outlined">event</span>
                                {formatDate(taskdate)}
                            </div>
                            
                            <div className={`task-status ${getStatusClass()}`}>
                                <span className="material-symbols-outlined">
                                    {completed ? "task_alt" : daysLeft < 0 ? "warning" : "schedule"}
                                </span>
                                {getStatusText()}
                            </div>
                        </div>
                    </div>
                    
                    <div className="task-actions">
                        <button className="edit-button" onClick={handleEdit} title="Editar tarefa">
                            <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button className="delete-button" onClick={handleDelete} title="Excluir tarefa">
                            <span className="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Itemtask;