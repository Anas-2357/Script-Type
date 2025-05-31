import { useEffect, useRef, useState } from "react";
import data from "../constants/data";
import { prepareCharState } from "../utils/parserUtils";
import { addCursor, removeCursor } from "../utils/cursorUtils";
import { trackTiming } from "../utils/trackTiming";

function useTypingLogic(language, subLanguage, inputRef) {
    const paragraph = data[language].snippets[0];
    const [charState, setCharState] = useState([]);
    const [currIndex, setCurrIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState();
    var currTimeRef = useRef();

    // Setup paragraph state
    useEffect(() => {
        const { state } = prepareCharState(paragraph, language, subLanguage);
        setCharState(state);
        setCurrIndex(0);

        const focusInput = () => setTimeout(() => inputRef.current?.focus(), 0);
        focusInput();
        document.addEventListener("mousedown", focusInput);

        return () => {
            document.removeEventListener("mousedown", focusInput);
        };
    }, [language, subLanguage]);

    function startTimer() {
        setCurrentTime(0);
        currTimeRef.current = 0;
        setInterval(() => {
            setCurrentTime((prev) => prev + 1);
            currTimeRef.current = currTimeRef.current + 1;
        }, 1000);
    }

    // Handle key press
    function handleKeyDown(e) {
        const updatedState = [...charState];
        let index = currIndex;

        if (index) removeCursor(index, updatedState);

        const typedChar = e.key;
        const charToType = updatedState[index]?.char;

        // Start timer on the first key press
        if (currTimeRef.current === undefined) {
            startTimer();
        }

        // Tab key logic: skip spaces/line breaks
        if (typedChar === "Tab") {
            e.preventDefault();
            if (index === 0) return;
            if (
                updatedState[index - 1].char === "\n" ||
                (updatedState[index - 1].char === " " &&
                    updatedState[index].char === " ")
            ) {
                while (updatedState[index]?.char === " ") index++;
                addCursor(index, updatedState);
                setCurrIndex(index);
                setCharState(updatedState);
                trackTiming(currTimeRef.current, true);
            }
        }

        // Backspace
        else if (typedChar === "Backspace") {
            if (index === 0) return;
            updatedState[index - 1].status = "normal";
            addCursor(index - 1, updatedState);
            setCurrIndex(index - 1);
            setCharState(updatedState);
        }

        // Skip if charToType is undefined
        else if (!charToType) return;
        // Prevent skipping line without Enter
        else if (charToType === "\n") {
            if (typedChar === "Enter") {
                addCursor(index + 1, updatedState);
                setCurrIndex(index + 1);
                setCharState(updatedState);
                trackTiming(currTimeRef.current, true);
            } else {
                // Prevent moving forvard
                addCursor(index, updatedState);
                setCharState(updatedState);
            }
        }

        // Prevent skipping space without Space key
        else if (charToType === " ") {
            if (typedChar === " ") {
                addCursor(index + 1, updatedState);
                setCurrIndex(index + 1);
                setCharState(updatedState);
                trackTiming(currTimeRef.current, true);
            } else {
                // Prevent moving forward
                addCursor(index, updatedState);
                setCharState(updatedState);
            }
        }

        // Ignore non-character keys like Shift, Ctrl
        else if (typedChar.length !== 1) {
            addCursor(index, updatedState);
            setCharState(updatedState);
        }

        // Normal character typing
        else {
            updatedState[index].status =
                typedChar === charToType ? "correct" : "inCorrect";
            addCursor(index + 1, updatedState);
            setCurrIndex(index + 1);
            setCharState(updatedState);
            trackTiming(currTimeRef.current, typedChar === charToType);
        }
    }

    return { charState, handleKeyDown, currentTime };
}

export default useTypingLogic;
