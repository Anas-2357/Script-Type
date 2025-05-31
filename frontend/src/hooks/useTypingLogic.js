import { useEffect, useState } from "react";
import data from "../constants/data";
import { prepareCharState } from "../utils/parserUtils";
import { addCursor, removeCursor } from "../utils/cursorUtils";

function useTypingLogic(language, subLanguage, inputRef) {
    const paragraph = data[language].snippets[0];
    const [charState, setCharState] = useState([]);
    const [currIndex, setCurrIndex] = useState(0);

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

    // Handle key press
    function handleKeyDown(e) {
        const updatedState = [...charState];
        let index = currIndex;

        if (index) removeCursor(index, updatedState);

        const typedChar = e.key;
        const charToType = updatedState[index]?.char;

        // --- Tab key logic: skip spaces/line breaks ---
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
                return;
            }
        }

        // --- Backspace ---
        if (typedChar === "Backspace") {
            if (index === 0) return;
            updatedState[index - 1].status = "normal";
            addCursor(index - 1, updatedState);
            setCurrIndex(index - 1);
            setCharState(updatedState);
            return;
        }

        // --- Skip if charToType is undefined ---
        if (!charToType) return;

        // --- Prevent skipping line without Enter ---
        if (charToType === "\n") {
            if (typedChar === "Enter") {
                addCursor(index + 1, updatedState);
                setCurrIndex(index + 1);
                setCharState(updatedState);
            } else {
                addCursor(index, updatedState); // Stay on the same
                setCharState(updatedState);
            }
            return;
        }

        // --- Prevent skipping space without Space key ---
        if (charToType === " ") {
            if (typedChar === " ") {
                addCursor(index + 1, updatedState);
                setCurrIndex(index + 1);
                setCharState(updatedState);
            } else {
                addCursor(index, updatedState); // Don't move
                setCharState(updatedState);
            }
            return;
        }

        // --- Ignore non-character keys like Shift, Ctrl ---
        if (typedChar.length !== 1) {
            addCursor(index, updatedState);
            setCharState(updatedState);
            return;
        }

        // --- Normal character typing ---
        updatedState[index].status =
            typedChar === charToType ? "correct" : "inCorrect";
        addCursor(index + 1, updatedState);
        setCurrIndex(index + 1);
        setCharState(updatedState);
    }

    return { charState, handleKeyDown };
}

export default useTypingLogic;
