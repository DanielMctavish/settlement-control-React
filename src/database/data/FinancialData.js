import { ReservesArray } from "../AllSettlementDatabases.js";
export let Saldo = parseFloat(localStorage.getItem('currentSaldo')) || 0;

export function AddSaldo(value) {
    // Converter para número para garantir que a operação seja matemática
    const numValue = parseFloat(value);
    
    if (!isNaN(numValue)) {
        // Adicionar o valor ao saldo (pode ser positivo ou negativo)
        Saldo += numValue;
        
        // Garantir que o saldo não fique negativo
        if (Saldo < 0) Saldo = 0;
        
        // Atualizar o localStorage
        localStorage.setItem('currentSaldo', Saldo.toString());
        
        // Atualizar qualquer exibição do saldo na interface
        const displaySaldo = document.querySelector(".displaySaldo");
        if (displaySaldo) {
            displaySaldo.textContent = `R$${Saldo.toFixed(2)}`;
        }
        
        console.log("Saldo atualizado:", Saldo);
        return true;
    }
    
    console.error("Valor inválido para AddSaldo:", value);
    return false;
}

export function ResetSaldo() {
    Saldo = 0;
    localStorage.setItem('currentSaldo', Saldo);
    return true;
}

export function addNewReserve(reserveName, reserveValue) {
    ReservesArray.push({
        name: reserveName.value,
        value: reserveValue.value
    })
    Saldo = Saldo - reserveValue.value
    console.log(ReservesArray);
}

export function removeAtualReserve(indexProp,value){
    ReservesArray.splice(indexProp,1)
    Saldo = Saldo + parseFloat(value);
}

export function comsumeReserve(dependenciafinanceira,dependenciafinanceiravalor){
    ReservesArray.map(el=>{
        if(dependenciafinanceira.value === el.name){
            el.value = el.value - parseFloat(dependenciafinanceiravalor.value)
            console.log("dependencia valor",dependenciafinanceiravalor.value);
            console.log("consumindo reserva!",el);
        }
        return null;
    })
}

export function reAddValueReserve(reservename,valueReAdd){
    ReservesArray.map(el=>{
        if(valueReAdd === ""){
            return;
        }

        if(reservename === el.name){
            el.value = parseFloat(el.value) + parseFloat(valueReAdd);
            Saldo = Saldo - parseFloat(valueReAdd);
        }
        return null;
    })
}
