import "./Pessoal.css";
import { useState, useEffect } from "react";
import { PersonalTasksArray } from "../../database/AllSettlementDatabases";
import Itemtask from "../tasks/Itemtask";
import Menutaskadd from "../tasks/Menutaskadd";
import { useToast } from "../common/ToastManager";

function Pessoal({ updateState }) {
    const [updateRender, setUpdateRender] = useState();
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all"); // all, pending, completed
    const toast = useToast();
    
    // Atualizar o estado quando o componente for montado ou quando updateRender mudar
    useEffect(() => {
        if (updateRender !== undefined) {
            updateState();
        }
    }, [updateRender, updateState]);
    
    // Carregar tarefas do localStorage quando o componente montar
    useEffect(() => {
        const savedTasks = localStorage.getItem('personalTasks');
        if (savedTasks) {
            // Atualizar o array de tarefas com os dados salvos
            PersonalTasksArray.length = 0; // Limpar o array atual
            JSON.parse(savedTasks).forEach(task => {
                PersonalTasksArray.push(task);
            });
        }
        
        // Atualizar o estado local de tarefas
        setTasks([...PersonalTasksArray]);
        
        // Forçar atualização do componente
        setUpdateRender(Math.floor(Math.random() * 35));
    }, []);
    
    // Atualizar o estado local de tarefas quando PersonalTasksArray mudar
    useEffect(() => {
        setTasks([...PersonalTasksArray]);
    }, [updateRender]);
    
    // Salvar tarefas no localStorage quando houver mudanças
    useEffect(() => {
        if (updateRender !== undefined) {
            localStorage.setItem('personalTasks', JSON.stringify(PersonalTasksArray));
        }
    }, [updateRender]);
    
    const handleHomeClick = () => {
        let timer = document.getElementById("timer");
        timer.style.display = "flex";
        let menuHome = document.getElementById("home");
        menuHome.classList.remove("active");
        let menuPessoal = document.getElementById("pessoal");
        menuPessoal.classList.remove("active");
        let bargadgets = document.getElementById("gadgets");
        bargadgets.classList.remove("active");
    };
    
    const handleAddTask = () => {
        document.querySelector(".Menutaskadd").style.display = "flex";
    };
    
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };
    
    // Filtrar tarefas com base no filtro selecionado
    const filteredTasks = tasks.filter(task => {
        if (filter === "all") return true;
        if (filter === "pending") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });
    
    const handleClearCompleted = () => {
        if (tasks.some(task => task.completed)) {
            toast.confirm(
                "Deseja remover todas as tarefas concluídas?",
                () => {
                    // Remover tarefas concluídas
                    const newTasks = PersonalTasksArray.filter(task => !task.completed);
                    PersonalTasksArray.length = 0;
                    newTasks.forEach(task => PersonalTasksArray.push(task));
                    
                    // Atualizar localStorage
                    localStorage.setItem('personalTasks', JSON.stringify(PersonalTasksArray));
                    
                    // Atualizar estado
                    setTasks([...PersonalTasksArray]);
                    
                    toast.showSuccess("Tarefas concluídas removidas com sucesso!");
                    setUpdateRender(Math.floor(Math.random() * 35));
                },
                "Remover"
            );
        } else {
            toast.showInfo("Não há tarefas concluídas para remover.");
        }
    };
    
    return (
        <div id="pessoal">
            <div id="logo" onClick={handleHomeClick}>
                <span className="material-symbols-outlined" id="home-btn">
                    home
                </span>
                SETTLEMENT
            </div>
            
            <div className="personal-container">
                <h2 className="personal-title">Tarefas Pessoais</h2>
                
                <div className="tasks-actions">
                    <button className="add-task-button" onClick={handleAddTask}>
                        <span className="material-symbols-outlined">add_task</span>
                        Nova Tarefa
                    </button>
                    
                    <div className="task-filters">
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
                            />
                        ))
                    )}
                </div>
            </div>
            
            <Menutaskadd onTaskAdded={() => setUpdateRender(Math.floor(Math.random() * 35))} />
        </div>
    );
}

export default Pessoal;