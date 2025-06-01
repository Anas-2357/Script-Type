import { useRef } from "react";
import useTypingLogic from "../hooks/useTypingLogic";

const classes = {
    normal: "",
    correct: "text-green-100",
    inCorrect: "text-red-500",
    blink: "outline outline-[1.5px] translate-x-[-1px] h-[1.4em] animate-blink scrollToThis",
};

function TypingBox({
    language,
    subLanguage,
    setIsSessionComplete,
    timeThreshold,
}) {
    const inputRef = useRef(null);
    const { charState, handleKeyDown, currentTime } = useTypingLogic(
        language,
        subLanguage,
        inputRef,
        setIsSessionComplete,
        timeThreshold
    );

    return (
        <div className="text-xl/8 w-full whitespace-nowrap overflow-x-auto hide-scrollbar">
            <p className="text-purple-500">{currentTime}</p>
            <input
                ref={inputRef}
                type="text"
                onKeyDown={handleKeyDown}
                className="absolute opacity-0 pointer-events-none"
                autoComplete="off"
                spellCheck="false"
            />
            {charState.map((data, index) =>
                data.char === "\n" ? (
                    <br key={index} />
                ) : data.char === " " ? (
                    <span key={index}>&nbsp;</span>
                ) : (
                    <span key={index} className={classes[data.status]}>
                        {data.char}
                    </span>
                )
            )}
        </div>
    );
}

export default TypingBox;
