import { useState, useEffect } from "react";
import "../../styles/Calendar.css"
import { PersonalTasksArray, ProfessionalTasksArray } from "../../database/AllSettlementDatabases";
import { useToast } from "../common/ToastManager";

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);
    const toast = useToast();
    
    // Meses em português
    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    
    // Dias da semana em português
    const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    
    // Obter o primeiro dia do mês atual
    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };
    
    // Obter o número de dias no mês atual
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };
    
    // Obter o número de dias no mês anterior
    const getDaysInPreviousMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    };
    
    // Navegar para o mês anterior
    const goToPreviousMonth = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() - 1);
            return newDate;
        });
    };
    
    // Navegar para o próximo mês
    const goToNextMonth = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + 1);
            return newDate;
        });
    };
    
    // Verificar se uma data tem tarefas
    const hasTasksForDate = (date) => {
        const dateString = date.toISOString().split('T')[0];
        
        const personalTasks = PersonalTasksArray.filter(task => 
            task.taskdate && task.taskdate.split('T')[0] === dateString
        );
        
        const professionalTasks = ProfessionalTasksArray.filter(task => 
            task.taskdate && task.taskdate.split('T')[0] === dateString
        );
        
        return personalTasks.length > 0 || professionalTasks.length > 0;
    };
    
    // Selecionar uma data e mostrar tarefas
    const handleDateClick = (year, month, day) => {
        const selectedDate = new Date(year, month, day);
        setSelectedDate(selectedDate);
        
        const dateString = selectedDate.toISOString().split('T')[0];
        
        const personalTasks = PersonalTasksArray.filter(task => 
            task.taskdate && task.taskdate.split('T')[0] === dateString
        ).map(task => ({ ...task, type: 'personal' }));
        
        const professionalTasks = ProfessionalTasksArray.filter(task => 
            task.taskdate && task.taskdate.split('T')[0] === dateString
        ).map(task => ({ ...task, type: 'professional' }));
        
        const allTasks = [...personalTasks, ...professionalTasks];
        
        setTasksForSelectedDate(allTasks);
        
        if (allTasks.length > 0) {
            toast.showInfo(`${allTasks.length} tarefa(s) para ${day} de ${months[month]} de ${year}`);
        } else {
            toast.showInfo(`Nenhuma tarefa para ${day} de ${months[month]} de ${year}`);
        }
    };
    
    // Renderizar o calendário
    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        const firstDayOfMonth = getFirstDayOfMonth(year, month);
        const daysInMonth = getDaysInMonth(year, month);
        const daysInPrevMonth = getDaysInPreviousMonth(year, month);
        
        const today = new Date();
        
        const days = [];
        
        // Dias do mês anterior
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            const date = new Date(year, month - 1, day);
            const hasEvents = hasTasksForDate(date);
            
            days.push(
                <li 
                    key={`prev-${day}`} 
                    className="inactive"
                    onClick={() => handleDateClick(year, month - 1, day)}
                >
                    {day}
                    {hasEvents && <span className="event-dot"></span>}
                </li>
            );
        }
        
        // Dias do mês atual
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isToday = day === today.getDate() && 
                            month === today.getMonth() && 
                            year === today.getFullYear();
            
            const isSelected = selectedDate && 
                              day === selectedDate.getDate() && 
                              month === selectedDate.getMonth() && 
                              year === selectedDate.getFullYear();
            
            const hasEvents = hasTasksForDate(date);
            
            days.push(
                <li 
                    key={`current-${day}`} 
                    className={`${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleDateClick(year, month, day)}
                >
                    {day}
                    {hasEvents && <span className="event-dot"></span>}
                </li>
            );
        }
        
        // Dias do próximo mês
        const totalDaysDisplayed = days.length;
        const remainingCells = 42 - totalDaysDisplayed; // 6 linhas x 7 dias = 42 células
        
        for (let day = 1; day <= remainingCells; day++) {
            const date = new Date(year, month + 1, day);
            const hasEvents = hasTasksForDate(date);
            
            days.push(
                <li 
                    key={`next-${day}`} 
                    className="inactive"
                    onClick={() => handleDateClick(year, month + 1, day)}
                >
                    {day}
                    {hasEvents && <span className="event-dot"></span>}
                </li>
            );
        }
        
        return days;
    };
    
    return (
        <>
            <link rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <div className="wrapper">
                <header>
                    <p className="current-date"></p>
                    <div className="icons">
                        <span className="material-symbols-outlined" id="prev" onClick={goToPreviousMonth}>chevron_left</span>
                        <span className="material-symbols-outlined" id="next" onClick={goToNextMonth}>chevron_right</span>
                    </div>
                </header>
                <div className="calendar">
                    <ul className="weeks">
                        {weekdays.map(day => <li key={day}>{day}</li>)}
                    </ul>
                    <ul className="days">
                        {renderCalendar()}
                    </ul>
                </div>
            </div>
            {selectedDate && tasksForSelectedDate.length > 0 && (
                <div className="calendar-tasks">
                    <h3>
                        Tarefas para {selectedDate.getDate()} de {months[selectedDate.getMonth()]}
                    </h3>
                    <ul className="task-list">
                        {tasksForSelectedDate.map((task, index) => (
                            <li 
                                key={index} 
                                className={`task-item ${task.type === 'personal' ? 'personal' : 'professional'}`}
                            >
                                <span className="task-name">{task.taskname}</span>
                                {task.completed && <span className="task-completed-badge">Concluída</span>}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}

export default Calendar;