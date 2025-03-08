import { useState, useEffect } from "react";
import "../../styles/DigitalClock.css";

function DigitalClock() {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    
    useEffect(() => {
        // Função para atualizar a data
        const updateDate = () => {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            setDate(now.toLocaleDateString('pt-BR', options));
        };
        
        // Função para atualizar o relógio
        const updateClock = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            setTime(`${hours}:${minutes}:${seconds}`);
        };
        
        // Atualizar data e hora inicialmente
        updateDate();
        updateClock();
        
        // Configurar intervalo para atualizar a hora a cada segundo
        const clockInterval = setInterval(updateClock, 1000);
        
        // Configurar intervalo para atualizar a data à meia-noite
        const dateInterval = setInterval(() => {
            const now = new Date();
            if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
                updateDate();
            }
        }, 1000);
        
        // Limpar intervalos quando o componente for desmontado
        return () => {
            clearInterval(clockInterval);
            clearInterval(dateInterval);
        };
    }, []);
    
    return (
        <div className="digital-clock">
            <div className="time">{time}</div>
            <div className="date">{date}</div>
        </div>
    );
}

export default DigitalClock;