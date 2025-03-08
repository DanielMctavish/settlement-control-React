import "./Financeiro.css"
import { Saldo, AddSaldo, ResetSaldo } from "../../database/data/FinancialData";
import FinancialReserve from "../reserves/FinancialReserve";
import MenuReserveAdd from "../reserves/MenuReserveAdd";
import { useState, useEffect } from "react";
import { ReservesArray } from "../../database/AllSettlementDatabases";
import { useToast } from "../common/ToastManager";

function Financeiro({ updateState }) {
    const [updateRender, setUpdateRender] = useState();
    const [currentSaldo, setCurrentSaldo] = useState(Saldo);
    const toast = useToast();
    
    // Atualizar o saldo quando o componente for montado ou quando updateRender mudar
    useEffect(() => {
        setCurrentSaldo(Saldo);
        
        if (updateRender !== undefined) {
            updateState();
        }
    }, [updateRender, updateState]);
    
    const handleHomeClick = () => {
        let timer = document.getElementById("timer")
        timer.style.display = "flex";
        let menuHome = document.getElementById("home");
        menuHome.classList.remove("active")
        let menuFinancial = document.getElementById("financeiro");
        menuFinancial.classList.remove("active");
        let bargadgets = document.getElementById("gadgets")
        bargadgets.classList.remove("active")
    };
    
    const handleAddSaldo = () => {
        let inputSaldo = document.querySelector(".input-saldo");
        
        if (!inputSaldo.value || inputSaldo.value <= 0) {
            toast.showError("Por favor, insira um valor válido para adicionar ao saldo.");
            return;
        }
        
        AddSaldo(parseFloat(inputSaldo.value));
        document.querySelector(".displaySaldo").textContent = `R$${Saldo.toFixed(2)}`;
        inputSaldo.value = "";
        
        // Salvar no localStorage
        localStorage.setItem('currentSaldo', Saldo);
        
        toast.showSuccess(`Saldo atualizado com sucesso!`);
        setUpdateRender(Math.floor(Math.random() * 35));
    };
    
    const handleResetSaldo = () => {
        toast.confirm(
            "Tem certeza que deseja zerar o saldo?",
            () => {
                ResetSaldo();
                document.querySelector(".displaySaldo").textContent = `R$${Saldo.toFixed(2)}`;
                
                // Salvar no localStorage
                localStorage.setItem('currentSaldo', Saldo);
                
                toast.showSuccess("Saldo zerado com sucesso!");
                setUpdateRender(Math.floor(Math.random() * 35));
            },
            "Zerar"
        );
    };
    
    const handleAddReserve = () => {
        document.querySelector(".MenuReserveAdd").style.display = "flex";
    };
    
    // Função para salvar os dados no localStorage
    const saveDataToLocalStorage = () => {
        localStorage.setItem('financialReserves', JSON.stringify(ReservesArray));
        localStorage.setItem('currentSaldo', Saldo);
    };
    
    // Carregar dados do localStorage quando o componente montar
    useEffect(() => {
        const savedReserves = localStorage.getItem('financialReserves');
        const savedSaldo = localStorage.getItem('currentSaldo');
        
        if (savedReserves) {
            // Atualizar o array de reservas com os dados salvos
            ReservesArray.length = 0; // Limpar o array atual
            JSON.parse(savedReserves).forEach(reserve => {
                ReservesArray.push(reserve);
            });
        }
        
        if (savedSaldo) {
            // Atualizar o saldo com o valor salvo
            AddSaldo(parseFloat(savedSaldo) - Saldo); // Ajustar para o valor salvo
        }
        
        // Forçar atualização do componente
        setUpdateRender(Math.floor(Math.random() * 35));
    }, []);
    
    // Salvar dados quando houver mudanças
    useEffect(() => {
        if (updateRender !== undefined) {
            saveDataToLocalStorage();
        }
    }, [updateRender]);
    
    return (
        <div id="financeiro">
            <div id="logo" onClick={handleHomeClick}>
                <span className="material-symbols-outlined" id="home-btn">
                    home
                </span>
                SETTLEMENT
            </div>
            <div className="financial-container">
                <h2 className="financial-title">Controle Financeiro</h2>
                
                <div className="saldo-container">
                    <h3 className="saldo-title">Saldo Atual</h3>
                    <div className="displaySaldo">R${currentSaldo.toFixed(2)}</div>
                </div>
                
                <div className="financial-actions">
                    <div className="add-saldo-container">
                        <h3>Adicionar Saldo</h3>
                        <div className="add-saldo-form">
                            <input type="number" className="input-saldo" placeholder="Valor" />
                            <div className="add-saldo-buttons">
                                <button className="btn-confirm-financial" onClick={handleAddSaldo}>ADICIONAR</button>
                                <button className="btn-edit-confirm" onClick={handleResetSaldo}>ZERAR</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="reserves-container">
                    <h3 className="reserves-title">Reservas Financeiras</h3>
                    
                    <button className="add-financial-reserve" onClick={handleAddReserve}>
                        <span className="material-symbols-outlined" id="icon-pay">
                            payments
                        </span>
                        Adicionar Reserva Financeira
                    </button>
                    
                    <div className="painel-list-reserves">
                        {ReservesArray.length === 0 ? (
                            <div className="no-reserves-message">
                                Nenhuma reserva financeira adicionada. Clique em "Adicionar Reserva Financeira" para começar.
                            </div>
                        ) : (
                            ReservesArray.map((el, index) => (
                                <FinancialReserve
                                    key={index}
                                    index={index}
                                    reservename={el.reservename}
                                    reservevalue={el.reservevalue}
                                    onUpdate={() => setUpdateRender(Math.floor(Math.random() * 35))}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
            <MenuReserveAdd onReserveAdded={() => setUpdateRender(Math.floor(Math.random() * 35))} />
        </div>
    )
}

export default Financeiro;