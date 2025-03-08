import "./Menutaskadd.css";
import { useState, useEffect } from "react";
import { PersonalTasksArray, ReservesArray, ProfessionalTasksArray } from "../../database/AllSettlementDatabases";
import { useToast } from "../common/ToastManager";
import { AddSaldo, Saldo } from "../../database/data/FinancialData";

function Menutaskadd({ onTaskAdded, onCancel, taskType = "personal" }) {
    const [taskName, setTaskName] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [hasDependency, setHasDependency] = useState(false);
    const [dependencyType, setDependencyType] = useState("none");
    const [financialReserve, setFinancialReserve] = useState("");
    const [financialValue, setFinancialValue] = useState("");
    const [error, setError] = useState("");
    const [availableReserves, setAvailableReserves] = useState([]);
    const toast = useToast();
    
    // Obter a data de hoje formatada para o input date
    const today = new Date().toISOString().split('T')[0];
    
    // Carregar reservas financeiras disponíveis
    useEffect(() => {
        setAvailableReserves(ReservesArray);
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!taskName.trim()) {
            toast.showError("Por favor, insira um nome para a tarefa.");
            return;
        }
        
        if (!taskDate) {
            toast.showError("Por favor, selecione uma data para a tarefa.");
            return;
        }
        
        if (hasDependency && dependencyType === "financial" && !financialReserve) {
            toast.showError("Por favor, selecione uma reserva financeira.");
            return;
        }
        
        if (hasDependency && dependencyType === "financial" && financialValue && parseFloat(financialValue) <= 0) {
            toast.showError("Por favor, informe um valor válido para a dependência financeira.");
            return;
        }
        
        if (hasDependency && dependencyType === "financial" && financialReserve && parseFloat(financialValue) > availableReserves.find(r => r.reservename === financialReserve)?.reservevalue) {
            toast.showError("O valor não pode exceder o valor disponível na reserva.");
            return;
        }
        
        // Criar objeto da tarefa
        const newTask = {
            taskname: taskName,
            taskdate: taskDate,
            completed: false,
            dependencia: hasDependency,
            dependenciafinanceira: hasDependency && dependencyType === "financial" ? financialReserve : "",
            dependenciafinanceiravalor: hasDependency && dependencyType === "financial" ? parseFloat(financialValue) : 0
        };
        
        // Adicionar ao array correto com base no tipo de tarefa
        const tasksArray = taskType === "professional" ? ProfessionalTasksArray : PersonalTasksArray;
        tasksArray.push(newTask);
        
        // Salvar no localStorage
        const storageKey = taskType === "professional" ? 'professionalTasks' : 'personalTasks';
        localStorage.setItem(storageKey, JSON.stringify(tasksArray));
        
        // Se tiver dependência financeira, atualizar a reserva
        if (hasDependency && dependencyType === "financial") {
            // Encontrar a reserva
            const reserveIndex = ReservesArray.findIndex(reserve => reserve.reservename === financialReserve);
            if (reserveIndex !== -1) {
                // Subtrair o valor da reserva
                const newValue = ReservesArray[reserveIndex].reservevalue - parseFloat(financialValue);
                ReservesArray[reserveIndex].reservevalue = newValue;
                
                // Salvar no localStorage
                localStorage.setItem('financialReserves', JSON.stringify(ReservesArray));
                
                toast.showInfo(`Valor de R$${parseFloat(financialValue).toFixed(2)} reservado da reserva "${financialReserve}"`);
            }
        }
        
        // Mostrar toast de sucesso
        toast.showSuccess("Tarefa adicionada com sucesso!");
        
        // Limpar formulário
        setTaskName("");
        setTaskDate("");
        setHasDependency(false);
        setDependencyType("none");
        setFinancialReserve("");
        setFinancialValue("");
        
        // Notificar componente pai
        if (onTaskAdded) {
            onTaskAdded();
        }
    };
    
    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    };
    
    return (
        <div className="menu-task-add">
            <div className="menu-task-add-content">
                <div className="menu-task-add-header">
                    <h2>Adicionar Nova Tarefa {taskType === "professional" ? "Profissional" : "Pessoal"}</h2>
                    <button className="close-button" onClick={handleCancel}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="taskName">Nome da Tarefa</label>
                        <input
                            type="text"
                            id="taskName"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            placeholder="Digite o nome da tarefa"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="taskDate">Data da Tarefa</label>
                        <input
                            type="date"
                            id="taskDate"
                            value={taskDate}
                            onChange={(e) => setTaskDate(e.target.value)}
                        />
                    </div>
                    
                    <div className="form-group checkbox-group">
                        <input
                            type="checkbox"
                            id="dependencia"
                            checked={hasDependency}
                            onChange={(e) => setHasDependency(e.target.checked)}
                        />
                        <label htmlFor="dependencia">Tem dependência?</label>
                    </div>
                    
                    {hasDependency && (
                        <div className="dependency-options">
                            <div className="form-group">
                                <label htmlFor="dependencyType">Tipo de Dependência</label>
                                <select
                                    id="dependencyType"
                                    value={dependencyType}
                                    onChange={(e) => setDependencyType(e.target.value)}
                                >
                                    <option value="none">Selecione...</option>
                                    <option value="financial">Financeira</option>
                                    <option value="other" disabled>Outros (em breve)</option>
                                </select>
                            </div>
                            
                            {dependencyType === "financial" && (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="financialReserve">Reserva Financeira</label>
                                        <select
                                            id="financialReserve"
                                            value={financialReserve}
                                            onChange={(e) => setFinancialReserve(e.target.value)}
                                        >
                                            <option value="">Selecione uma reserva...</option>
                                            {availableReserves.map((reserve, index) => (
                                                <option key={index} value={reserve.reservename}>
                                                    {reserve.reservename} (R${reserve.reservevalue.toFixed(2)})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="financialValue">Valor (R$)</label>
                                        <input
                                            id="financialValue"
                                            type="number"
                                            value={financialValue}
                                            onChange={(e) => setFinancialValue(e.target.value)}
                                            placeholder="0.00"
                                            step="0.01"
                                            min="0"
                                            max={financialReserve ? 
                                                availableReserves.find(r => r.reservename === financialReserve)?.reservevalue : 0
                                            }
                                        />
                                    </div>
                                    
                                    {financialReserve && (
                                        <div className="reserve-info">
                                            <span>Valor disponível na reserva:</span>
                                            <span className="reserve-value">
                                                R$ {availableReserves.find(r => r.reservename === financialReserve)?.reservevalue.toFixed(2) || "0.00"}
                                            </span>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                    
                    <div className="form-actions">
                        <button type="button" className="cancel-button" onClick={handleCancel}>
                            Cancelar
                        </button>
                        <button type="submit" className="submit-button">
                            Adicionar Tarefa
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Menutaskadd;