import { useState, useEffect } from "react";
import "../../styles/Deadline.css";
import { PersonalTasksArray, ProfessionalTasksArray } from "../../database/AllSettlementDatabases";
import { useToast } from "../common/ToastManager";

function Deadline() {
    const [personalTasks, setPersonalTasks] = useState([]);
    const [professionalTasks, setProfessionalTasks] = useState([]);
    const [activeTab, setActiveTab] = useState("personal");
    const toast = useToast();
    
    // Carregar e ordenar tarefas por prazo
    useEffect(() => {
        // Função para calcular dias restantes
        const calculateDaysRemaining = (dateString) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const dueDate = new Date(dateString);
            dueDate.setHours(0, 0, 0, 0);
            
            const diffTime = dueDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            return diffDays;
        };
        
        // Filtrar e ordenar tarefas pessoais
        const filteredPersonalTasks = PersonalTasksArray
            .filter(task => !task.completed)
            .map(task => ({
                ...task,
                daysRemaining: calculateDaysRemaining(task.taskdate)
            }))
            .sort((a, b) => a.daysRemaining - b.daysRemaining);
        
        // Filtrar e ordenar tarefas profissionais
        const filteredProfessionalTasks = ProfessionalTasksArray
            .filter(task => !task.completed)
            .map(task => ({
                ...task,
                daysRemaining: calculateDaysRemaining(task.taskdate)
            }))
            .sort((a, b) => a.daysRemaining - b.daysRemaining);
        
        setPersonalTasks(filteredPersonalTasks);
        setProfessionalTasks(filteredProfessionalTasks);
    }, []);
    
    // Formatar a data para exibição
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };
    
    // Navegar para a página de tarefas
    const navigateToTasks = (type) => {
        // Fechar o painel de gadgets
        document.getElementById("gadgets").classList.remove("active2");
        document.getElementById("btn-menu-deadline-icon").classList.remove("active");
        document.querySelector(".displaySaldo")?.classList.remove("active");
        
        // Esconder todas as páginas
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => page.classList.remove('active'));
        
        // Mostrar a página de tarefas correspondente
        if (type === 'personal') {
            document.getElementById('pessoal').classList.add('active');
            toast.showInfo("Navegando para tarefas pessoais");
        } else {
            document.getElementById('profissional').classList.add('active');
            toast.showInfo("Navegando para tarefas profissionais");
        }
    };
    
    return (
        <div className="deadline-widget">
            <div className="deadline-header">
                <h3>Próximos Prazos</h3>
                <div className="deadline-tabs">
                    <button 
                        className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
                        onClick={() => setActiveTab('personal')}
                    >
                        Pessoal
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'professional' ? 'active' : ''}`}
                        onClick={() => setActiveTab('professional')}
                    >
                        Profissional
                    </button>
                </div>
            </div>
            
            <div className="deadline-content">
                {activeTab === 'personal' ? (
                    personalTasks.length > 0 ? (
                        <ul className="deadline-list">
                            {personalTasks.map((task, index) => (
                                <li key={index} className={`deadline-item ${task.daysRemaining < 0 ? 'overdue' : task.daysRemaining <= 3 ? 'urgent' : ''}`}>
                                    <div className="deadline-item-header">
                                        <span className="deadline-item-name">{task.taskname}</span>
                                        <span className="deadline-item-date">{formatDate(task.taskdate)}</span>
                                    </div>
                                    <div className="deadline-progress">
                                        <div className="deadline-days">
                                            {task.daysRemaining < 0 ? (
                                                <span className="days-overdue">Atrasada ({Math.abs(task.daysRemaining)} dias)</span>
                                            ) : (
                                                <span className="days-remaining">
                                                    {task.daysRemaining} {task.daysRemaining === 1 ? 'dia' : 'dias'} restante{task.daysRemaining !== 1 ? 's' : ''}
                                                </span>
                                            )}
                                        </div>
                                        <div className="progress-bar">
                                            <div 
                                                className="progress-fill"
                                                style={{ 
                                                    width: `${Math.max(0, Math.min(100, 100 - (task.daysRemaining * 10)))}%`,
                                                    backgroundColor: task.daysRemaining < 0 ? '#e74c3c' : task.daysRemaining <= 3 ? '#f39c12' : '#43b980'
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="no-tasks-message">
                            Nenhuma tarefa pessoal pendente
                        </div>
                    )
                ) : (
                    professionalTasks.length > 0 ? (
                        <ul className="deadline-list">
                            {professionalTasks.map((task, index) => (
                                <li key={index} className={`deadline-item ${task.daysRemaining < 0 ? 'overdue' : task.daysRemaining <= 3 ? 'urgent' : ''}`}>
                                    <div className="deadline-item-header">
                                        <span className="deadline-item-name">{task.taskname}</span>
                                        <span className="deadline-item-date">{formatDate(task.taskdate)}</span>
                                    </div>
                                    <div className="deadline-progress">
                                        <div className="deadline-days">
                                            {task.daysRemaining < 0 ? (
                                                <span className="days-overdue">Atrasada ({Math.abs(task.daysRemaining)} dias)</span>
                                            ) : (
                                                <span className="days-remaining">
                                                    {task.daysRemaining} {task.daysRemaining === 1 ? 'dia' : 'dias'} restante{task.daysRemaining !== 1 ? 's' : ''}
                                                </span>
                                            )}
                                        </div>
                                        <div className="progress-bar">
                                            <div 
                                                className="progress-fill"
                                                style={{ 
                                                    width: `${Math.max(0, Math.min(100, 100 - (task.daysRemaining * 10)))}%`,
                                                    backgroundColor: task.daysRemaining < 0 ? '#e74c3c' : task.daysRemaining <= 3 ? '#f39c12' : '#43b980'
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="no-tasks-message">
                            Nenhuma tarefa profissional pendente
                        </div>
                    )
                )}
            </div>
            
            <div className="deadline-footer">
                <button 
                    className="view-all-button"
                    onClick={() => navigateToTasks(activeTab)}
                >
                    Ver todas as tarefas
                </button>
            </div>
        </div>
    );
}

export default Deadline;


