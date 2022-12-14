import { ReservesArray } from "../AllSettlementDatabases.js";
export let Saldo = 0;

export function AddSaldo(value) {
    if (value < 0) {
        return value = 0;
    }
    return Saldo += parseFloat(value);
}

export function ResetSaldo() {
    return Saldo = 0;
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
    })

}
