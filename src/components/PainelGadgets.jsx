import "../styles/PainelGaggets.css"
import { useState, useEffect } from "react";
import Calendar from "./widgets/Calendar";
import Deadline from "./widgets/Deadline";
import DigitalClock from "./widgets/DigitalClock";
import Weather from "./widgets/Weather";
import Notes from "./widgets/Notes";
import Calculator from "./widgets/Calculator";
import Pomodoro from "./widgets/Pomodoro";
import { useToast } from "./common/ToastManager";

function PainelGadgets() {
    const [isExpanded, setIsExpanded] = useState(false);
    const toast = useToast();

    // Verificar se o painel deve estar expandido com base no localStorage
    useEffect(() => {
        const savedState = localStorage.getItem('gadgetsPanelExpanded');
        if (savedState) {
            setIsExpanded(JSON.parse(savedState));

            // Aplicar classes se estiver expandido
            if (JSON.parse(savedState)) {
                document.getElementById("gadgets").classList.add("active2");
                document.querySelector(".displaySaldo")?.classList.add("active");
            }
        }
    }, []);

    const togglePanel = () => {
        const newState = !isExpanded;
        setIsExpanded(newState);

        // Salvar estado no localStorage
        localStorage.setItem('gadgetsPanelExpanded', JSON.stringify(newState));

        // Toggle das classes
        const gadgetsElement = document.getElementById("gadgets");
        gadgetsElement.classList.toggle("active2");
        document.querySelector(".displaySaldo")?.classList.toggle("active");

        // Log para depuração
        console.log("Toggle painel:", newState, gadgetsElement.classList.contains("active2"));

        // Mostrar toast
        toast.showInfo(newState ? "Painel de ferramentas expandido" : "Painel de ferramentas recolhido");
    };

    return (
        <div id="gadgets">
            {/* Borda clicável */}
            <span
                className="gadgets-border"
                onClick={togglePanel}
                title="Clique para expandir/recolher o painel"
            ></span>

            {/* Botão para expandir/recolher */}
            <button
                className="toggle-panel-btn"
                onClick={togglePanel}
                title="Expandir/recolher painel"
            >
                <span className="material-symbols-outlined">
                    {isExpanded ? "chevron_right" : "chevron_left"}
                </span>
            </button>

            <div className="gadgets-container">
                <DigitalClock />
                <Pomodoro />
                <Weather />
                <Notes />
                <Calculator />
                <Calendar />
                <Deadline />
            </div>
        </div>
    );
}

export default PainelGadgets;