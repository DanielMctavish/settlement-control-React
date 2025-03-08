import { useState, useEffect, useRef } from "react";
import "../../styles/widgets/Pomodoro.css";

function Pomodoro() {
    const [mode, setMode] = useState("work"); // work, break, longBreak
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutos em segundos
    const [isActive, setIsActive] = useState(false);
    const [cycles, setCycles] = useState(0);
    const [settings, setSettings] = useState({
        workTime: 25,
        breakTime: 5,
        longBreakTime: 15,
        longBreakInterval: 4
    });
    const [showSettings, setShowSettings] = useState(false);
    const [tempSettings, setTempSettings] = useState({ ...settings });
    
    const timerRef = useRef(null);
    const audioRef = useRef(null);
    
    // Carregar configurações do localStorage
    useEffect(() => {
        const savedSettings = localStorage.getItem('pomodoroSettings');
        if (savedSettings) {
            const parsedSettings = JSON.parse(savedSettings);
            setSettings(parsedSettings);
            setTempSettings(parsedSettings);
            
            // Atualizar o tempo restante com base nas configurações carregadas
            if (mode === "work") {
                setTimeLeft(parsedSettings.workTime * 60);
            } else if (mode === "break") {
                setTimeLeft(parsedSettings.breakTime * 60);
            } else {
                setTimeLeft(parsedSettings.longBreakTime * 60);
            }
        }
    }, []);
    
    // Efeito para gerenciar o timer
    useEffect(() => {
        if (isActive) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timerRef.current);
                        playAlarm();
                        
                        // Alternar entre modos
                        if (mode === "work") {
                            const newCycles = cycles + 1;
                            setCycles(newCycles);
                            
                            if (newCycles % settings.longBreakInterval === 0) {
                                setMode("longBreak");
                                setTimeLeft(settings.longBreakTime * 60);
                                return 0;
                            } else {
                                setMode("break");
                                setTimeLeft(settings.breakTime * 60);
                                return 0;
                            }
                        } else {
                            setMode("work");
                            setTimeLeft(settings.workTime * 60);
                            return 0;
                        }
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }
        
        return () => clearInterval(timerRef.current);
    }, [isActive, mode, cycles, settings]);
    
    const toggleTimer = () => {
        setIsActive(!isActive);
    };
    
    const resetTimer = () => {
        setIsActive(false);
        if (mode === "work") {
            setTimeLeft(settings.workTime * 60);
        } else if (mode === "break") {
            setTimeLeft(settings.breakTime * 60);
        } else {
            setTimeLeft(settings.longBreakTime * 60);
        }
    };
    
    const skipToNext = () => {
        setIsActive(false);
        
        if (mode === "work") {
            const newCycles = cycles + 1;
            setCycles(newCycles);
            
            if (newCycles % settings.longBreakInterval === 0) {
                setMode("longBreak");
                setTimeLeft(settings.longBreakTime * 60);
            } else {
                setMode("break");
                setTimeLeft(settings.breakTime * 60);
            }
        } else {
            setMode("work");
            setTimeLeft(settings.workTime * 60);
        }
    };
    
    const saveSettings = () => {
        setSettings(tempSettings);
        localStorage.setItem('pomodoroSettings', JSON.stringify(tempSettings));
        
        // Atualizar o tempo restante com base nas novas configurações
        if (mode === "work") {
            setTimeLeft(tempSettings.workTime * 60);
        } else if (mode === "break") {
            setTimeLeft(tempSettings.breakTime * 60);
        } else {
            setTimeLeft(tempSettings.longBreakTime * 60);
        }
        
        setShowSettings(false);
    };
    
    const playAlarm = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };
    
    // Formatar o tempo para exibição (MM:SS)
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    
    // Obter a cor de fundo com base no modo
    const getBackgroundColor = () => {
        if (mode === "work") return "rgba(235, 77, 75, 0.2)";
        if (mode === "break") return "rgba(106, 176, 76, 0.2)";
        return "rgba(34, 166, 179, 0.2)";
    };
    
    // Obter o texto do modo
    const getModeText = () => {
        if (mode === "work") return "Trabalho";
        if (mode === "break") return "Pausa Curta";
        return "Pausa Longa";
    };
    
    return (
        <div className="pomodoro-widget">
            <div className="widget-header">
                <div className="widget-title">
                    <span className="material-symbols-outlined">timer</span>
                    Pomodoro
                </div>
                <span 
                    className="material-symbols-outlined settings-icon" 
                    onClick={() => setShowSettings(!showSettings)}
                    title="Configurações"
                >
                    settings
                </span>
            </div>
            
            <div className="widget-content">
                {showSettings ? (
                    <div className="pomodoro-settings">
                        <div className="settings-group">
                            <label>Tempo de Trabalho (min)</label>
                            <input 
                                type="number" 
                                min="1" 
                                max="60" 
                                value={tempSettings.workTime}
                                onChange={(e) => setTempSettings({
                                    ...tempSettings,
                                    workTime: parseInt(e.target.value) || 1
                                })}
                            />
                        </div>
                        
                        <div className="settings-group">
                            <label>Tempo de Pausa Curta (min)</label>
                            <input 
                                type="number" 
                                min="1" 
                                max="30" 
                                value={tempSettings.breakTime}
                                onChange={(e) => setTempSettings({
                                    ...tempSettings,
                                    breakTime: parseInt(e.target.value) || 1
                                })}
                            />
                        </div>
                        
                        <div className="settings-group">
                            <label>Tempo de Pausa Longa (min)</label>
                            <input 
                                type="number" 
                                min="1" 
                                max="60" 
                                value={tempSettings.longBreakTime}
                                onChange={(e) => setTempSettings({
                                    ...tempSettings,
                                    longBreakTime: parseInt(e.target.value) || 1
                                })}
                            />
                        </div>
                        
                        <div className="settings-group">
                            <label>Intervalo de Pausa Longa (ciclos)</label>
                            <input 
                                type="number" 
                                min="1" 
                                max="10" 
                                value={tempSettings.longBreakInterval}
                                onChange={(e) => setTempSettings({
                                    ...tempSettings,
                                    longBreakInterval: parseInt(e.target.value) || 1
                                })}
                            />
                        </div>
                        
                        <div className="settings-actions">
                            <button 
                                className="cancel-settings-btn"
                                onClick={() => {
                                    setTempSettings({ ...settings });
                                    setShowSettings(false);
                                }}
                            >
                                Cancelar
                            </button>
                            <button 
                                className="save-settings-btn"
                                onClick={saveSettings}
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="pomodoro-timer">
                        <div 
                            className="timer-display"
                            style={{ backgroundColor: getBackgroundColor() }}
                        >
                            <div className="timer-mode">{getModeText()}</div>
                            <div className="timer-time">{formatTime(timeLeft)}</div>
                            <div className="timer-cycles">Ciclo: {Math.floor(cycles / settings.longBreakInterval) + 1} ({cycles % settings.longBreakInterval}/{settings.longBreakInterval})</div>
                        </div>
                        
                        <div className="timer-controls">
                            <button 
                                className="timer-control-btn reset-btn"
                                onClick={resetTimer}
                                title="Reiniciar"
                            >
                                <span className="material-symbols-outlined">restart_alt</span>
                            </button>
                            
                            <button 
                                className="timer-control-btn play-btn"
                                onClick={toggleTimer}
                                title={isActive ? "Pausar" : "Iniciar"}
                            >
                                <span className="material-symbols-outlined">
                                    {isActive ? "pause" : "play_arrow"}
                                </span>
                            </button>
                            
                            <button 
                                className="timer-control-btn skip-btn"
                                onClick={skipToNext}
                                title="Pular"
                            >
                                <span className="material-symbols-outlined">skip_next</span>
                            </button>
                        </div>
                    </div>
                )}
                
                <audio ref={audioRef} src="/alarm.mp3" />
            </div>
        </div>
    );
}

export default Pomodoro; 