import data from "../constants/data";
import { useEffect, useRef, useState } from "react";

function TypingBox({ language }) {
    const paragraph = data[language][0];
    const [charState, setCharState] = useState([]);
    const inputRef = useRef(null);
    const [currIndex, setCurrIndex] = useState(0);
    const classes = {
        normal: "",
        correct: "text-green-100",
        inCorrect: "text-red-500",
        blink: "border border-[1.5px] absolute translate-x-[-1px] h-[1.4em] animate-blink",
    };

    function setState() {
        const state = paragraph.split("").map((data) => ({
            char: data,
            status: "normal",
        }));
        setCharState(state);
        setCurrIndex(0);
    }

    function addCursor(index, updatedState) {
        updatedState.splice(index, 0, { char: "", status: "blink" });
    }

    function removeCursor(index, updatedState) {
        updatedState.splice(index, 1);
    }

    useEffect(() => {
        setState();

        const focusInput = () => {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        };

        focusInput();

        document.addEventListener("mousedown", focusInput);
    }, [paragraph]);

    function handleKeyDown(e) {
        const updatedState = [...charState];
        var index = currIndex;
        if (currIndex) removeCursor(index, updatedState);

        const typedChar = e.key;
        const charToType = updatedState[index].char;

        if (typedChar === "Tab") {
            e.preventDefault();
            if (index === 0) return;
            if (
                updatedState[index - 1].char === "\n" ||
                (updatedState[index - 1].char === " " &&
                    updatedState[index].char === " ")
            ) {
                while (updatedState[index].char === " ") index++;
                addCursor(index, updatedState);
                setCurrIndex(index);
                setCharState(updatedState);
                return;
            }
        }

        if (typedChar === "Backspace") {
            if (index === 0) return;
            updatedState[index - 1].status = "normal";
            addCursor(index - 1, updatedState);
            setCurrIndex(index - 1);
            setCharState(updatedState);
            return;
        }
        if (charToType === "\n") {
            if (typedChar === "Enter") {
                addCursor(index + 1, updatedState);
                setCurrIndex(index + 1);
                setCharState(updatedState);
            }
            return;
        }
        if (charToType === " ") {
            if (typedChar === " ") {
                addCursor(index + 1, updatedState);
                setCurrIndex(index + 1);
                setCharState(updatedState);
            }
            return;
        }

        if (typedChar.length !== 1) {
            return;
        }

        updatedState[index].status =
            charToType === typedChar ? "correct" : "inCorrect";
        addCursor(index + 1, updatedState);
        setCurrIndex(index + 1);
        setCharState(updatedState);
    }

    return (
        <div className="text-2xl w-full">
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
