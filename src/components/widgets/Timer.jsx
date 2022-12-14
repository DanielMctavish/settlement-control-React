import { useState } from "react";
import "../../styles/Timer.css"

function Timer() {
    const [second, setSeconds] = useState(0);
    const [secondDisplay, setSecondisplay] = useState("00")

    const [min, setMin] = useState(0);
    const [minDisplay, setmindisplay] = useState("00")

    const [hour, setHour] = useState(0);

    const [playtime, setPlaytime] = useState(0);
    const [funcInterval01, setFuncInterval01] = useState("")

    let seconds = second;
    let minutes = min;
    let hours = hour;



    const timerOn = () => {
        let iconplay = document.getElementById("timer-play");
        iconplay.style.color = "#04f700"
        let iconpause = document.getElementById("timer-pause");
        iconpause.style.color = "white"
        if (playtime === 1) {
            return 0
        } else {
            setPlaytime(1)
            const runTime = () => {
                seconds++
                setSeconds(seconds)

                if (seconds.toString().length === 1) {
                    setSecondisplay("0" + seconds)
                } else {
                    setSecondisplay(seconds)
                }

                if (seconds === 59) {
                    seconds = -1
                    setTimeout(() => {
                        minutes++
                        setMin(minutes)

                        if (minutes.toString().length === 1) {
                            setmindisplay("0" + minutes)
                        } else {
                            setmindisplay(minutes)
                        }
                    }, 1000);
                }
                if (minutes === 59 && seconds === 0) {
                    minutes = -1
                    setTimeout(() => {
                        hours++
                        setHour(hours)
                    }, 1000);
                }
            }

            let interval01 = setInterval(runTime, 1000);
            setFuncInterval01(interval01)
        }

    }
    let iconplay = document.getElementById("timer-play");
    let iconpause = document.getElementById("timer-pause");

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <div id="timer">
                <span className="material-symbols-outlined" id="timer-play" onClick={timerOn}>timer</span>
                <span className="material-symbols-outlined" id="timer-pause" onClick={() => {
                    
                    iconplay.style.color = "white"
                    iconpause.style.color = "#ffb236"
                    
                    clearInterval(funcInterval01)
                    setPlaytime(0)
                }
                }>pause_circle</span>
                <span className="material-symbols-outlined" id="timer-reset" onClick={

                    () => {
                        iconplay.style.color = "white"
                        iconpause.style.color = "white"

                        clearInterval(funcInterval01)
                        setPlaytime(0)
                        setSeconds(0)
                        setMin(0)
                        setHour(0)
                        setSecondisplay("00")
                        setmindisplay("00")
                    }

                }>replay</span>
                <span className="material-symbols-outlined timerdisplay">
                    {hour}:
                    {minDisplay}:
                    {secondDisplay}
                </span>
            </div>
        </>
    )
}

export default Timer;