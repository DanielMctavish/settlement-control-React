import "./FinancialReserve.css"
import { ReservesArray } from "../../database/AllSettlementDatabases";
import { useState } from "react";
import { AddSaldo, Saldo } from "../../database/data/FinancialData";
import { useToast } from "../common/ToastManager";

export default function FinancialReserve({ index, reservename, reservevalue, onUpdate }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const toast = useToast();
    
    const handleDeleteReserve = () => {
        // Usar toast de confirmação em vez de window.confirm
        toast.confirm(
            `Deseja realmente excluir a reserva "${reservename}"?`,
            () => {
                // Adicionar o valor de volta ao saldo
                AddSaldo(parseFloat(reservevalue));
                
                // Atualizar o saldo no localStorage
                localStorage.setItem('currentSaldo', Saldo);
                
                // Atualizar o display do saldo na tela principal
                const displaySaldo = document.querySelector(".displaySaldo");
                if (displaySaldo) {
                    displaySaldo.textContent = `R$${Saldo.toFixed(2)}`;
                }
                
                // Remover a reserva do array
                ReservesArray.splice(index, 1);
                
                // Atualizar localStorage
                localStorage.setItem('financialReserves', JSON.stringify(ReservesArray));
                
                // Mostrar toast de sucesso
                toast.showSuccess(`Reserva "${reservename}" excluída com sucesso!`);
                
                // Notificar o componente pai
                if (onUpdate) {
                    onUpdate();
                }
            },
            "Excluir"
        );
    };
    
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    
    // Calcular a porcentagem do valor total das reservas
    const calculatePercentage = () => {
        const totalReserves = ReservesArray.reduce((sum, reserve) => sum + reserve.reservevalue, 0);
        return totalReserves > 0 ? (reservevalue / totalReserves * 100).toFixed(1) : 0;
    };
    
    return (
        <div className={`reserve-item ${isExpanded ? 'expanded' : ''}`}>
            <div className="reserve-item-header" onClick={toggleExpand}>
                <div className="reserve-item-title-container">
                    <span className="material-symbols-outlined reserve-icon">
                        {isExpanded ? 'expand_less' : 'expand_more'}
                    </span>
                    <div className="reserve-item-title">{reservename}</div>
                </div>
                <div className="reserve-item-value">R$ {parseFloat(reservevalue).toFixed(2)}</div>
            </div>
            
            {isExpanded && (
                <div className="reserve-item-details">
                    <div className="reserve-item-stats">
                        <div className="reserve-stat">
                            <span className="reserve-stat-label">Porcentagem do total:</span>
                            <span className="reserve-stat-value">{calculatePercentage()}%</span>
                        </div>
                        <div className="reserve-stat">
                            <span className="reserve-stat-label">Criada em:</span>
                            <span className="reserve-stat-value">{new Date().toLocaleDateString('pt-BR')}</span>
                        </div>
                    </div>
                    
                    <div className="reserve-progress">
                        <div 
                            className="reserve-progress-bar" 
                            style={{width: `${calculatePercentage()}%`}}
                        ></div>
                    </div>
                    
                    <div className="reserve-item-actions">
                        <button className="reserve-item-edit">
                            <span className="material-symbols-outlined">edit</span>
                            Editar
                        </button>
                        <button className="reserve-item-delete" onClick={handleDeleteReserve}>
                            <span className="material-symbols-outlined">delete</span>
                            Excluir
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}