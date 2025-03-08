import { useState, useEffect } from 'react';
import './Toast.css';

// Tipos de toast: success, error, warning, info
const Toast = ({ message, type = 'info', duration = 3000, onClose, showConfirm = false, onConfirm, confirmText = 'Confirmar' }) => {
    const [visible, setVisible] = useState(true);
    const [isClosing, setIsClosing] = useState(false);
    
    useEffect(() => {
        let timer;
        
        // Se não for um toast de confirmação, fechar automaticamente após a duração
        if (!showConfirm && duration > 0) {
            timer = setTimeout(() => {
                handleClose();
            }, duration);
        }
        
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [duration, showConfirm]);
    
    const handleClose = () => {
        setIsClosing(true);
        
        // Aguardar a animação de saída antes de remover completamente
        setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, 300);
    };
    
    const handleConfirm = () => {
        if (onConfirm) onConfirm();
        handleClose();
    };
    
    if (!visible) return null;
    
    return (
        <div className={`toast-container ${isClosing ? 'toast-exit' : 'toast-enter'}`}>
            <div className={`toast toast-${type}`}>
                <div className="toast-content">
                    <div className="toast-icon">
                        {type === 'success' && <span className="material-symbols-outlined">check_circle</span>}
                        {type === 'error' && <span className="material-symbols-outlined">error</span>}
                        {type === 'warning' && <span className="material-symbols-outlined">warning</span>}
                        {type === 'info' && <span className="material-symbols-outlined">info</span>}
                    </div>
                    <div className="toast-message">{message}</div>
                </div>
                
                {showConfirm ? (
                    <div className="toast-actions">
                        <button className="toast-cancel" onClick={handleClose}>Cancelar</button>
                        <button className="toast-confirm" onClick={handleConfirm}>{confirmText}</button>
                    </div>
                ) : (
                    <button className="toast-close" onClick={handleClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Toast; 