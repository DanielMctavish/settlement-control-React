import { useState, useEffect, createContext, useContext } from 'react';
import Toast from './Toast';

// Criar contexto para o Toast
const ToastContext = createContext();

// Hook personalizado para usar o Toast
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast deve ser usado dentro de um ToastProvider');
    }
    return context;
};

// Provedor do Toast
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    
    // Função para adicionar um novo toast
    const addToast = (message, type = 'info', duration = 3000) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type, duration, showConfirm: false }]);
        return id;
    };
    
    // Função para adicionar um toast de confirmação
    const addConfirmToast = (message, onConfirm, confirmText = 'Confirmar') => {
        const id = Date.now();
        setToasts(prev => [...prev, { 
            id, 
            message, 
            type: 'warning', 
            duration: 0, 
            showConfirm: true, 
            onConfirm,
            confirmText
        }]);
        return id;
    };
    
    // Função para remover um toast
    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };
    
    // Funções de conveniência para diferentes tipos de toast
    const showSuccess = (message, duration = 3000) => addToast(message, 'success', duration);
    const showError = (message, duration = 3000) => addToast(message, 'error', duration);
    const showWarning = (message, duration = 3000) => addToast(message, 'warning', duration);
    const showInfo = (message, duration = 3000) => addToast(message, 'info', duration);
    
    // Função para confirmar ações
    const confirm = (message, onConfirm, confirmText = 'Confirmar') => {
        return addConfirmToast(message, onConfirm, confirmText);
    };
    
    return (
        <ToastContext.Provider value={{ 
            showSuccess, 
            showError, 
            showWarning, 
            showInfo, 
            confirm,
            addToast, 
            removeToast 
        }}>
            {children}
            
            {/* Renderizar todos os toasts ativos */}
            {toasts.map(toast => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    duration={toast.duration}
                    showConfirm={toast.showConfirm}
                    onConfirm={toast.onConfirm}
                    confirmText={toast.confirmText}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </ToastContext.Provider>
    );
}; 