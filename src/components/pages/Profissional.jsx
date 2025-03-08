import "./Profissional.css";
import { useState, useEffect } from "react";
import { ProfessionalTasksArray } from "../../database/AllSettlementDatabases";
import Itemtask from "../tasks/Itemtask";
import Menutaskadd from "../tasks/Menutaskadd";
import { useToast } from "../common/ToastManager";

function Profissional({ updateState }) {
    const [updateRender, setUpdateRender] = useState();
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all"); // all, pending, completed
    const [showAddMenu, setShowAddMenu] = useState(false);
    const toast = useToast();
    
    // Atualizar o estado quando o componente for montado ou quando updateRender mudar
    useEffect(() => {
        if (updateRender !== undefined) {
            updateState();
        }
    }, [updateRender, updateState]);
    
    // Carregar tarefas do localStorage quando o componente montar
    useEffect(() => {
        const savedTasks = localStorage.getItem('professionalTasks');
        if (savedTasks) {
            // Atualizar o array de tarefas com os dados salvos
            ProfessionalTasksArray.length = 0; // Limpar o array atual
            JSON.parse(savedTasks).forEach(task => {
                ProfessionalTasksArray.push(task);
            });
        }
        
        // Atualizar o estado local de tarefas
        setTasks([...ProfessionalTasksArray]);
        
        // Forçar atualização do componente
        setUpdateRender(Math.floor(Math.random() * 35));
    }, []);
    
    // Atualizar o estado local de tarefas quando ProfessionalTasksArray mudar
    useEffect(() => {
        setTasks([...ProfessionalTasksArray]);
    }, [updateRender]);
    
    const handleHomeClick = () => {
        let timer = document.getElementById("timer");
        timer.style.display = "flex";
        let menuHome = document.getElementById("home");
        menuHome.classList.remove("active");
        let menuProfissional = document.getElementById("profissional");
        menuProfissional.classList.remove("active");
        
        // Não manipular o PainelGadgets aqui, deixar que ele gerencie seu próprio estado
    };
    
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };
    
    const handleClearCompleted = () => {
        // Filtrar tarefas concluídas
        const completedTasks = ProfessionalTasksArray.filter(task => task.completed);
        
        if (completedTasks.length === 0) {
            toast.showInfo("Não há tarefas concluídas para limpar.");
            return;
        }
        
        // Remover tarefas concluídas do array
        const newTasks = ProfessionalTasksArray.filter(task => !task.completed);
        ProfessionalTasksArray.length = 0; // Limpar o array atual
        newTasks.forEach(task => ProfessionalTasksArray.push(task)); // Adicionar tarefas não concluídas de volta
        
        // Atualizar localStorage
        localStorage.setItem('professionalTasks', JSON.stringify(ProfessionalTasksArray));
        
        // Atualizar estado
        setTasks([...ProfessionalTasksArray]);
        
        // Mostrar toast
        toast.showSuccess(`${completedTasks.length} tarefa(s) concluída(s) removida(s).`);
        
        // Forçar atualização do componente
        setUpdateRender(Math.floor(Math.random() * 35));
    };
    
    const handleAddTask = () => {
        setShowAddMenu(true);
    };
    
    const handleTaskAdded = () => {
        setShowAddMenu(false);
        setUpdateRender(Math.floor(Math.random() * 35));
    };
    
    // Filtrar tarefas com base no filtro selecionado
    const filteredTasks = tasks.filter(task => {
        if (filter === "all") return true;
        if (filter === "pending") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });
    
    return (
        <div id="profissional">
            <div className="page-container">
                <div className="page-header">
                    <div className="header-left">
                        <h1>Tarefas Profissionais</h1>
                        <p>Gerencie suas tarefas relacionadas ao trabalho</p>
                    </div>
                    <div className="header-right">
                        <button className="home-button" onClick={handleHomeClick}>
                            <span className="material-symbols-outlined">home</span>
                            Voltar ao Menu
                        </button>
                    </div>
                </div>
                
                <div className="filter-controls">
                    <div className="filter-buttons">
                        <button 
                            className={`filter-button ${filter === "all" ? "active" : ""}`}
                            onClick={() => handleFilterChange("all")}
                        >
                            Todas
                        </button>
                        <button 
                            className={`filter-button ${filter === "pending" ? "active" : ""}`}
                            onClick={() => handleFilterChange("pending")}
                        >
                            Pendentes
                        </button>
                        <button 
                            className={`filter-button ${filter === "completed" ? "active" : ""}`}
                            onClick={() => handleFilterChange("completed")}
                        >
                            Concluídas
                        </button>
                    </div>
                    <div className="filter-actions">
                        <button className="add-task-button" onClick={handleAddTask}>
                            <span className="material-symbols-outlined">add</span>
                            Nova Tarefa
                        </button>
                        <button className="clear-completed-button" onClick={handleClearCompleted}>
                            <span className="material-symbols-outlined">cleaning_services</span>
                            Limpar Concluídas
                        </button>
                    </div>
                </div>
                
                <div className="tasks-list">
                    {filteredTasks.length === 0 ? (
                        <div className="no-tasks-message">
                            {filter === "all" 
                                ? "Nenhuma tarefa adicionada. Clique em 'Nova Tarefa' para começar."
                                : filter === "pending" 
                                    ? "Não há tarefas pendentes."
                                    : "Não há tarefas concluídas."
                            }
                        </div>
                    ) : (
                        filteredTasks.map((task, index) => (
                            <Itemtask
                                key={index}
                                index={index}
                                taskname={task.taskname}
                                taskdate={task.taskdate}
                                completed={task.completed}
                                dependencia={task.dependencia}
                                dependenciafinanceira={task.dependenciafinanceira}
                                dependenciafinanceiravalor={task.dependenciafinanceiravalor}
                                onUpdate={() => setUpdateRender(Math.floor(Math.random() * 35))}
                                taskType="professional"
                            />
                        ))
                    )}
                </div>
            </div>
            
            {showAddMenu && (
                <Menutaskadd 
                    onTaskAdded={handleTaskAdded} 
                    onCancel={() => setShowAddMenu(false)}
                    taskType="professional"
                />
            )}
        </div>
    );
}

export default Profissional;