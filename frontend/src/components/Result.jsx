import React, { useState } from "react";
import PerformanceChart from "./PerformanceChart";

function Result() {
    const [wpm, setWpm] = useState();
    const [consistency, setConsistency] = useState();
    const [acceptanceRatio, setAcceptanceRatio] = useState();
    const [time, setTime] = useState();
    const [correctChars, setCorrectChars] = useState();
    const [inCorrectChars, setInCorrectChars] = useState();

    return (
        <div className="w-[80vw] flex flex-col gap-12 py-24">
            <div className="w-full flex justify-between">
                <div className="flex flex-col items-center">
                    <p className="text-purple-500 text-6xl">{wpm}</p>
                    <p className="text-xl mb-4">WPM</p>
                    <p className="text-purple-500 text-5xl">
                        {acceptanceRatio}%
                    </p>
                    <p className="text-xl">Acc</p>
                </div>
                <div className="w-[90%] h-[250px]">
                    <PerformanceChart
                        setWpm={setWpm}
                        setConsistency={setConsistency}
                        setAcceptanceRatio={setAcceptanceRatio}
                        setTime={setTime}
                        setCorrectChars={setCorrectChars}
                        setInCorrectChars={setInCorrectChars}
                    />
                </div>
            </div>
            <div className="flex justify-around">
                <div>
                    <p className="text-purple-500 text-5xl">{consistency}%</p>
                    <p className="text-xl mb-4">Consistency</p>
                </div>
                <div>
                    <p className="text-purple-500 text-5xl">{correctChars}/{inCorrectChars}</p>
                    <p className="text-xl">Charactors</p>
                </div>
                <div>
                    <p className="text-purple-500 text-5xl">{time}</p>
                    <p className="text-xl">Time</p>
                </div>
            </div>
        </div>
    );
}

export default Result;
