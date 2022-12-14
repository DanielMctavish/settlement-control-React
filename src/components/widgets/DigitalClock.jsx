import React, { useState, useEffect } from "react";
import "../../styles/DigitalClock.css"

function DigitalClock() {
    const [date, setDate] = useState("01/11/2022");
    const [hour, setHour] = useState("19:00");

    let currentDate = new Date().toLocaleString().substr(0, 10);

    useEffect(() => {
        setDate(currentDate)
        setInterval(() => {
            setHour(new Date().toLocaleTimeString())
        }, 1000)
    },[currentDate])

    return (
        <div className="digitalCafe">
            <div className="date">{date}</div>
            <div className="time">{hour}</div>
        </div>
    )
}

export default DigitalClock;