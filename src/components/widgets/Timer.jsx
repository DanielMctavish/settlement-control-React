import { useState, useEffect, useRef } from "react";
import "../../styles/Timer.css"

function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [secondsDisplay, setSecondsDisplay] = useState("00");
    const [minutes, setMinutes] = useState(0);
    const [minutesDisplay, setMinutesDisplay] = useState("00");
    const [hours, setHours] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    
    // Usando useRef para armazenar o intervalo
    const intervalRef = useRef(null);
    
    // Função para formatar números com zero à esquerda
    const formatWithLeadingZero = (num) => {
        return num < 10 ? `0${num}` : `${num}`;
    };
    
    // Efeito para atualizar os displays quando os valores mudam
    useEffect(() => {
        setSecondsDisplay(formatWithLeadingZero(seconds));
    }, [seconds]);
    
    useEffect(() => {
        setMinutesDisplay(formatWithLeadingZero(minutes));
    }, [minutes]);
    
    // Função para iniciar o timer
    const startTimer = () => {
        if (isRunning) return;
        
        setIsRunning(true);
        
        intervalRef.current = setInterval(() => {
            setSeconds(prevSeconds => {
                if (prevSeconds === 59) {
                    setMinutes(prevMinutes => {
                        if (prevMinutes === 59) {
                            setHours(prevHours => prevHours + 1);
                            return 0;
                        }
                        return prevMinutes + 1;
                    });
                    return 0;
                }
                return prevSeconds + 1;
            });
        }, 1000);
    };
    
    // Função para pausar o timer
    const pauseTimer = () => {
        if (!isRunning) return;
        
        clearInterval(intervalRef.current);
        setIsRunning(false);
    };
    
    // Função para resetar o timer
    const resetTimer = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setSeconds(0);
        setMinutes(0);
        setHours(0);
    };
    
    // Limpar o intervalo quando o componente for desmontado
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <div id="timer">
            <span 
                className="material-symbols-outlined" 
                id="timer-play" 
                onClick={startTimer}
                style={{ color: isRunning ? "#04f700" : "white" }}
            >
                timer
            </span>
            <span 
                className="material-symbols-outlined" 
                id="timer-pause" 
                onClick={pauseTimer}
                style={{ color: !isRunning && (seconds > 0 || minutes > 0 || hours > 0) ? "#ffb236" : "white" }}
            >
                pause_circle
            </span>
            <span 
                className="material-symbols-outlined" 
                id="timer-reset" 
                onClick={resetTimer}
            >
                replay
            </span>
            <span className="material-symbols-outlined timerdisplay">
                {formatWithLeadingZero(hours)}:{minutesDisplay}:{secondsDisplay}
            </span>
        </div>
    );
}

export default Timer;