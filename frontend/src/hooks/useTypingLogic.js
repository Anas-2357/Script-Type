import { useEffect, useRef, useState } from "react";
import data from "../utils/data";
import { prepareCharState } from "../utils/parserUtils";
import { addCursor, removeCursor } from "../utils/cursorUtils";
import useTrackingStore from "../store/useTrackingStore";

function useTypingLogic(
    language,
    subLanguage,
    inputRef,
    setIsSessionComplete,
    timeThreshold
) {
    const randomIndexRef = useRef(0);
    const prevLanguageRef = useRef(language.value);
    const [charState, setCharState] = useState([]);
    const [currIndex, setCurrIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState();
    const currTimeRef = useRef();
    const intervalRef = useRef(null);
    const prevUpdatedAtRef = useRef(0);

    const trackTiming = useTrackingStore((state) => state.trackTiming);

    useEffect(() => {
        // Update random index if language.value changes or if language remains same but language.updatedAt changes
        if (
            prevLanguageRef.current !== language.value ||
            (prevLanguageRef.current === language.value &&
                prevUpdatedAtRef.current !== language.updatedAt)
        ) {
            // Updating index while making sure new index is not equals to previous index
            const currIndex = randomIndexRef.current;
            var newIndex = Math.floor(
                Math.random() * data[language.value].snippets.length
            );
            while (currIndex === newIndex)
                newIndex = Math.floor(
                    Math.random() * data[language.value].snippets.length
                );
            randomIndexRef.current = newIndex;
            prevLanguageRef.current = language.value;
            prevUpdatedAtRef.current = language.updatedAt;
        }

        // Initiate paragraph array with language snippet based on current language and index
        const paragraph = data[language.value].snippets[randomIndexRef.current];

        // Call prepareCharState function which will preapare a state array with correct objects, than push that to sharState
        const { state } = prepareCharState(paragraph, language, subLanguage);
        setCharState(state);
        setCurrIndex(0);

        // Focus input initially and on every event on document using event listener
        const focusInput = () => setTimeout(() => inputRef.current?.focus(), 0);
        focusInput();
        document.addEventListener("mousedown", focusInput);

        return () => {
            document.removeEventListener("mousedown", focusInput);
            clearInterval(intervalRef.current);
        };
    }, [language, subLanguage]);

    // Integrate timer
    function startTimer() {
        // If timeThreshold is not null means a time is selected so start time with the selected value and decrease that every second until zero at which setIsSessionComlete to true
        if (timeThreshold) {
            setCurrentTime(timeThreshold);
            currTimeRef.current = timeThreshold;
            intervalRef.current = setInterval(() => {
                setCurrentTime((prev) => prev - 1);
                currTimeRef.current = currTimeRef.current - 1;
                if (currTimeRef.current === 0) {
                    console.log("time is <1");
                    setIsSessionComplete(true);
                }
            }, 1000);
        }
        // Else start time from zero and increase it every second
        else {
            setCurrentTime(0);
            currTimeRef.current = 0;
            intervalRef.current = setInterval(() => {
                setCurrentTime((prev) => prev + 1);
                currTimeRef.current = currTimeRef.current + 1;
            }, 1000);
        }
    }

    function handleKeyDown(e) {
        //Disable long press
        if (e.repeat) return;

        const updatedState = [...charState];
        let index = currIndex;

        // Rmove cursor if index is not 0
        if (index) removeCursor(index, updatedState);

        // Initiate and define typedChar and charToType variables
        const typedChar = e.key;
        const charToType = updatedState[index]?.char;

        // Call startTimer function on the first key press
        if (currTimeRef.current === undefined) {
            startTimer();
        }

        // Skip spaces based on previous chars if tab key is pressed
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
                trackTiming(currTimeRef.current, true, timeThreshold);
            }
        }
        // Backtrack the charState on click of Backspace key
        else if (typedChar === "Backspace") {
            if (index === 0) return;
            updatedState[index - 1].status = "normal";
            addCursor(index - 1, updatedState);
            setCurrIndex(index - 1);
            setCharState(updatedState);
        }
        // Ignore key press if any non essntial key is typed
        else if (!charToType) return;
        // Prevent moving forward until Enter is typed if keyToType is Enter
        else if (charToType === "\n") {
            if (typedChar === "Enter") {
                addCursor(index + 1, updatedState);
                setCurrIndex(index + 1);
                setCharState(updatedState);
                trackTiming(currTimeRef.current, true, timeThreshold);
            } else {
                addCursor(index, updatedState);
                setCharState(updatedState);
                trackTiming(currTimeRef.current, false, timeThreshold);
            }
        }
        // Prevent moving forward until ' ' is typed if keyToType is ' '
        else if (charToType === " ") {
            if (typedChar === " ") {
                addCursor(index + 1, updatedState);
                setCurrIndex(index + 1);
                setCharState(updatedState);
                trackTiming(currTimeRef.current, true, timeThreshold);
            } else {
                addCursor(index, updatedState);
                setCharState(updatedState);
                trackTiming(currTimeRef.current, false, timeThreshold);
            }
        }
        // Ignore all the non essential key pressess
        else if (typedChar.length !== 1) {
            addCursor(index, updatedState);
            setCharState(updatedState);
        }
        // Move the cursor agead while giving correct classnames to the previous character
        else {
            updatedState[index].status =
                typedChar === charToType ? "correct" : "inCorrect";
            addCursor(index + 1, updatedState);
            setCurrIndex(index + 1);
            setCharState(updatedState);
            trackTiming(
                currTimeRef.current,
                typedChar === charToType,
                timeThreshold
            );
        }
        // Finish the setIsCompleteSession which in turn will stop the test and display result
        if (index === updatedState.length - 2) {
            setIsSessionComplete(true);
        }
        requestAnimationFrame(() => {
            document.querySelector(".scrollToThis")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            });
        });
    }

    return { charState, handleKeyDown, currentTime };
}

export default useTypingLogic;
