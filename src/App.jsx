import { useEffect, useState, useCallback } from "react";
import "./App.css"
import Home from "./components/HomeLogin";
import Financeiro from "./components/pages/Financeiro";
import Login from "./components/pages/Login";
import Objetivos from "./components/pages/Objetivos";
import Pessoal from "./components/pages/Pessoal";
import Profissional from "./components/pages/Profissional";
import Register from "./components/pages/Register";
import PainelGadgets from "./components/PainelGadgets";
import Timer from "./components/widgets/Timer";
import { initializeDataFromLocalStorage } from "./database/AllSettlementDatabases";
import { ToastProvider } from './components/common/ToastManager';

function App() {
    const [changeAllstates, setChangeAllstates] = useState(0);
    const [changeAllstates02, setChangeAllstates02] = useState(0);
    const [loginStatus, setLoginStatus] = useState(false);
    
    // Usando useCallback para memoizar as funções de atualização
    const updateAllStates = useCallback(() => {
        setChangeAllstates(prev => prev + 1);
    }, []);

    const updateAllStates02 = useCallback(() => {
        setChangeAllstates02(prev => prev + 1);
    }, []);
    
    // Efeito para logging, sem dependências que causem loop
    useEffect(() => {
        console.log("App montado inicialmente");
        
        // Opcional: Carregar dados iniciais do localStorage aqui
        const savedLoginStatus = localStorage.getItem('loginStatus');
        if (savedLoginStatus) {
            setLoginStatus(JSON.parse(savedLoginStatus));
        }
    }, []); // Array de dependências vazio = executa apenas na montagem
    
    // Efeito separado para logging de mudanças de estado
    useEffect(() => {
        console.log("Estado mudou:", { changeAllstates, changeAllstates02, loginStatus });
        
        // Opcional: Salvar loginStatus no localStorage quando mudar
        localStorage.setItem('loginStatus', JSON.stringify(loginStatus));
    }, [changeAllstates, changeAllstates02, loginStatus]);

    useEffect(() => {
        // Inicializar dados do localStorage
        initializeDataFromLocalStorage();
    }, []);

    return (
        <ToastProvider>
            <div id="app">
                <Home loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
                <Login setLoginStatus={setLoginStatus} />
                <Register />
                <Pessoal updateState={updateAllStates02} />
                <Profissional updateState={updateAllStates} />
                <Objetivos />
                <Financeiro updateState={updateAllStates} />
                <PainelGadgets />
                <Timer />
            </div>
        </ToastProvider>
    )
}

export default App;