import { useEffect, useRef, useState } from "react";
import data from "../utils/data";
import { prepareCharState } from "../utils/parserUtils";
import { addCursor, removeCursor } from "../utils/cursorUtils";
import useTrackingStore from "../store/useTrackingStore";

function useTypingLogic(language, subLanguage, inputRef, setIsSessionComplete) {
    const randomIndexRef = useRef(0);
    const prevLanguageRef = useRef(language);
    const [charState, setCharState] = useState([]);
    const [currIndex, setCurrIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState();
    const currTimeRef = useRef();
    const intervalRef = useRef(null);

    const trackTiming = useTrackingStore((state) => state.trackTiming);

    useEffect(() => {
        // Update random index if language changes
        if (prevLanguageRef.current !== language) {
            randomIndexRef.current = Math.floor(
                Math.random() * data[language].snippets.length
            );
            prevLanguageRef.current = language;
        }

        const paragraph = data[language].snippets[randomIndexRef.current];
        const { state } = prepareCharState(paragraph, language, subLanguage);
        setCharState(state);
        setCurrIndex(0);

        const focusInput = () => setTimeout(() => inputRef.current?.focus(), 0);
        focusInput();
        document.addEventListener("mousedown", focusInput);

        return () => {
            document.removeEventListener("mousedown", focusInput);
            clearInterval(intervalRef.current);
        };
    }, [language, subLanguage]);

    function startTimer() {
        setCurrentTime(0);
        currTimeRef.current = 0;
        intervalRef.current = setInterval(() => {
            setCurrentTime((prev) => prev + 1);
            currTimeRef.current = currTimeRef.current + 1;
        }, 1000);
    }

    function handleKeyDown(e) {
        const updatedState = [...charState];
        let index = currIndex;

        if (index) removeCursor(index, updatedState);

        const typedChar = e.key;
        const charToType = updatedState[index]?.char;

        if (currTimeRef.current === undefined) {
            startTimer();
        }

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
        } else if (typedChar === "Backspace") {
            if (index === 0) return;
            updatedState[index - 1].status = "normal";
            addCursor(index - 1, updatedState);
            setCurrIndex(index - 1);
            setCharState(updatedState);
        } else if (!charToType) return;
        else if (charToType === "\n") {
            if (typedChar === "Enter") {
                addCursor(index + 1, updatedState);
                setCurrIndex(index + 1);
                setCharState(updatedState);
                trackTiming(currTimeRef.current, true);
            } else {
                addCursor(index, updatedState);
                setCharState(updatedState);
                trackTiming(currTimeRef.current, false);
            }
        } else if (charToType === " ") {
            if (typedChar === " ") {
                addCursor(index + 1, updatedState);
                setCurrIndex(index + 1);
                setCharState(updatedState);
                trackTiming(currTimeRef.current, true);
            } else {
                addCursor(index, updatedState);
                setCharState(updatedState);
                trackTiming(currTimeRef.current, false);
            }
        } else if (typedChar.length !== 1) {
            addCursor(index, updatedState);
            setCharState(updatedState);
        } else {
            updatedState[index].status =
                typedChar === charToType ? "correct" : "inCorrect";
            addCursor(index + 1, updatedState);
            setCurrIndex(index + 1);
            setCharState(updatedState);
            trackTiming(currTimeRef.current, typedChar === charToType);
        }

        if (index === updatedState.length - 2) {
            setIsSessionComplete(true);
        }
    }

    return { charState, handleKeyDown, currentTime };
}

export default useTypingLogic;
