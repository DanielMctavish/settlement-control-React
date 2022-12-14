
import { useEffect, useState } from "react";
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
import instance from "./database/Api.js";

function App() {
    const[changeAllstates,setChangeAllstates] = useState()
    const[changeAllstates02,setChangeAllstates02] = useState()
    const[loginStatus, setLoginStatus] = useState()

        useEffect(()=>{
            console.log("renderizando App main");
            instance.get("/").then(res=>{
                console.log(res.data);
            })
        },[changeAllstates02,changeAllstates,loginStatus])
    return (
        <div id="app">
            <Home loginStatus = {loginStatus}/>
            <Login setLoginStatus = {setLoginStatus}/>
            <Register/>
            <Pessoal setChangeAllstates02 ={setChangeAllstates02}/>
            <Profissional setChangeAllstates ={setChangeAllstates}/>
            <Objetivos />
            <Financeiro setChangeAllstates ={setChangeAllstates}/>
            <PainelGadgets />
            <Timer />
        </div>
    )
}

export default App;