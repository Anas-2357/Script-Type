import React, { useState } from "react";
import PerformanceChart from "./PerformanceChart";

function Result() {
    const [wpm, setWpm] = useState()
    return (
        <div className="flex justify-between items-center w-[80vw]">
            <p className="text-2xl/6 text-center"><span className="text-purple-500 text-6xl">{wpm}</span> <br /> WPM</p>
            <div className=" w-[90%] h-[250px]">
                <PerformanceChart setWpm={setWpm}/>
            </div>
            
        </div>
    );
}

export default Result;
