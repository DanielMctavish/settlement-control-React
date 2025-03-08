import "./MenuReserveAdd.css"
import { useState, useEffect } from "react";
import { ReservesArray, saveAllDataToLocalStorage } from "../../database/AllSettlementDatabases";
import { Saldo, AddSaldo } from "../../database/data/FinancialData";
import { useToast } from "../common/ToastManager";

function MenuReserveAdd({ onReserveAdded }) {
    const [reserveName, setReserveName] = useState("");
    const [reserveValue, setReserveValue] = useState("");
    const [error, setError] = useState("");
    const [currentSaldo, setCurrentSaldo] = useState(Saldo);
    const toast = useToast();
    
    // Atualizar o saldo exibido quando o componente for montado ou o Saldo mudar
    useEffect(() => {
        setCurrentSaldo(Saldo);
    }, [Saldo]);
    
    const handleAddReserve = () => {
        // Limpar erro anterior
        setError("");
        
        // Validar os campos
        if (!reserveName.trim()) {
            setError("Por favor, informe um nome para a reserva");
            return;
        }
        
        const value = parseFloat(reserveValue);
        if (isNaN(value) || value <= 0) {
            setError("Por favor, informe um valor válido");
            return;
        }
        
        // Verificar se o valor não excede o saldo
        if (value > Saldo) {
            setError("O valor não pode exceder o saldo disponível");
            return;
        }
        
        // Criar o objeto de reserva
        const newReserve = {
            reservename: reserveName.trim(),
            reservevalue: value,
            createdAt: new Date().toISOString()
        };
        
        // Adicionar ao array de reservas
        ReservesArray.push(newReserve);
        
        console.log("Saldo antes:", Saldo);
        console.log("Valor a subtrair:", value);
        
        // Subtrair o valor do saldo atual
        const success = AddSaldo(-value);
        
        console.log("Saldo depois:", Saldo);
        console.log("Operação bem-sucedida:", success);
        
        if (!success) {
            setError("Erro ao atualizar o saldo. Tente novamente.");
            return;
        }
        
        // Salvar no localStorage
        localStorage.setItem('financialReserves', JSON.stringify(ReservesArray));
        localStorage.setItem('currentSaldo', Saldo);
        
        // Atualizar o display do saldo na tela principal
        const displaySaldo = document.querySelector(".displaySaldo");
        if (displaySaldo) {
            displaySaldo.textContent = `R$${Saldo.toFixed(2)}`;
        }
        
        // Limpar os campos
        setReserveName("");
        setReserveValue("");
        
        // Fechar o menu
        document.querySelector(".MenuReserveAdd").style.display = "none";
        
        // Mostrar toast de sucesso
        toast.showSuccess(`Reserva "${reserveName}" adicionada com sucesso!`);
        
        // Notificar o componente pai
        if (onReserveAdded) {
            onReserveAdded();
        }
    };
    
    const handleCancel = () => {
        // Limpar os campos e erros
        setReserveName("");
        setReserveValue("");
        setError("");
        
        // Fechar o menu
        document.querySelector(".MenuReserveAdd").style.display = "none";
    };
    
    return (
        <div className="MenuReserveAdd">
            <div className="MenuReserveAdd-overlay" onClick={handleCancel}></div>
            <div className="MenuReserveAdd-content">
                <div className="MenuReserveAdd-header">
                    <h2>Nova Reserva Financeira</h2>
                    <button className="MenuReserveAdd-close" onClick={handleCancel}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                
                {error && <div className="MenuReserveAdd-error">{error}</div>}
                
                <div className="MenuReserveAdd-form">
                    <div className="form-group">
                        <label htmlFor="reserveName">Nome da Reserva</label>
                        <input
                            id="reserveName"
                            type="text"
                            value={reserveName}
                            onChange={(e) => setReserveName(e.target.value)}
                            placeholder="Ex: Férias, Emergência, etc."
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="reserveValue">Valor (R$)</label>
                        <input
                            id="reserveValue"
                            type="number"
                            value={reserveValue}
                            onChange={(e) => setReserveValue(e.target.value)}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                        />
                    </div>
                    
                    <div className="saldo-info">
                        <span>Saldo disponível:</span>
                        <span className="saldo-value">R$ {currentSaldo.toFixed(2)}</span>
                    </div>
                    
                    <div className="MenuReserveAdd-actions">
                        <button className="btn-cancel" onClick={handleCancel}>
                            Cancelar
                        </button>
                        <button className="btn-confirm" onClick={handleAddReserve}>
                            Adicionar Reserva
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuReserveAdd;