import data from "../constants/data";
import { useEffect, useRef, useState } from "react";

function TypingBox({ language, subLanguage }) {
    const paragraph = data[language].snippets[0];
    const [charState, setCharState] = useState([]);
    const inputRef = useRef(null);
    const [currIndex, setCurrIndex] = useState(0);
    const subLangIdx = 0;
    const classes = {
        normal: "",
        correct: "text-green-100",
        inCorrect: "text-red-500",
        blink: "border border-[1.5px] absolute translate-x-[-1px] h-[1.4em] animate-blink",
    };

    // Reseting charState every time the paragraph is changed
    // Adding event listener on document to trigger focus on input element on any click done by user

    useEffect(() => {
        setState();

        const focusInput = () => {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        };

        focusInput();

        document.addEventListener("mousedown", focusInput);
    }, [paragraph, subLanguage]);

    // Initializing the charState

    function setState() {
        const chars = paragraph.split("");
        const tempArray = [];

        for (let i = 0; i < chars.length; i++) {
            const currentChar = chars[i];
            if (currentChar === "ï") {
                if (subLanguage === "") {
                    backtrackSpaces(tempArray);
                    return;
                }

                const subLangSelected =
                    data[language]["subLanguage"][subLanguage][subLangIdx];
                for (let i = 0; i < subLangSelected.length; i++) {
                    tempArray.push({
                        char: subLangSelected[i],
                        status: "normal",
                    });
                }
                continue;
            }
            tempArray.push({ char: currentChar, status: "normal" });
        }

        setCharState(tempArray);
        setCurrIndex(0);
    }

    function backtrackSpaces(tempArray) {
        while (tempArray[tempArray.length - 1].char === " ") {
            tempArray.pop();
        }
    }

    // Logic for adding and removing dummy cursor

    function addCursor(index, updatedState) {
        updatedState.splice(index, 0, { char: "", status: "blink" });
    }

    function removeCursor(index, updatedState) {
        updatedState.splice(index, 1);
    }

    // Main logic for key press

    function handleKeyDown(e) {
        const updatedState = [...charState];
        var index = currIndex;
        if (currIndex) removeCursor(index, updatedState);

        const typedChar = e.key;
        const charToType = updatedState[index].char;

        // This logic helps cover all spaces on press of a 'Tab' key only if last char was ' ' or '\n'

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

        // Return if index is 0 to prevent errors; otherwise, reduce index and simulate backspace

        if (typedChar === "Backspace") {
            if (index === 0) return;
            updatedState[index - 1].status = "normal";
            addCursor(index - 1, updatedState);
            setCurrIndex(index - 1);
            setCharState(updatedState);
            return;
        }

        // Prevent user from skipping a line without pressing 'Enter'

        if (charToType === "\n") {
            if (typedChar === "Enter") {
                addCursor(index + 1, updatedState);
                setCurrIndex(index + 1);
                setCharState(updatedState);
            }
            return;
        }

        // Prevent user from skipping a space without typing one

        if (charToType === " ") {
            if (typedChar === " ") {
                addCursor(index + 1, updatedState);
                setCurrIndex(index + 1);
                setCharState(updatedState);
            }
            return;
        }

        // Ignore all non-essential key presses like shift, insert, delete, etc.

        if (typedChar.length !== 1) {
            return;
        }

        // Advance cursor and apply appropriate styling based on typed character.

        updatedState[index].status =
            charToType === typedChar ? "correct" : "inCorrect";
        addCursor(index + 1, updatedState);
        setCurrIndex(index + 1);
        setCharState(updatedState);
    }

    return (
        <div className="text-2xl w-full whitespace-nowrap overflow-x-auto">
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
