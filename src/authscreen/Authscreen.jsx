import "../index.css"
import { Pass } from "../database/data/dan.js"

export default function Authscreen(props){
    return(
        <div id="Authscreen" >
            <input type="password" placeholder="password" id="pass"/>
            <button className="btn-auth" onClick={()=>{
                let pass = document.getElementById("pass")
                if(pass.value === Pass){
                    props.auth(true)
                }else{
                    pass.setAttribute("type","text")
                    pass.value = "senha incorreta"
                    
                    let authscreen = document.getElementById("Authscreen")
                    authscreen.style.transition = "2s"
                    authscreen.style.background = "red"
                    pass.style.transition = "3s"
                    pass.style.opacity = "0"
                    pass.style.fontWeight = "800"
                    setTimeout(() => {
                        authscreen.style.display = "none"
                    }, 2500);
                }
                
            }}>acessar</button>
        </div>
        
    )
}

