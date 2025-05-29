import { useEffect, useRef, useState } from "react";

const paragraph = `function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
  console.log(factorial(5));
}
`;

function TypingBox() {
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
        setCharState((prev) => [...prev, ...state]);
    }

    function addCursor(index, updatedState) {
        updatedState.splice(index, 0, { char: "", status: "blink" });
    }

    function removeCursor(index, updatedState) {
        updatedState.splice(index, 1);
    }

    useEffect(() => {
        setState();

        inputRef.current?.focus();
    }, []);

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
                updatedState[index - 1].char === "\n" &&
                updatedState[index].char === " "
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
        <div className="text-xl">
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
                    <br />
                ) : data.char === " " ? (
                    <span>&nbsp;</span>
                ) : (
                    <span className={classes[data.status]}>{data.char}</span>
                )
            )}
        </div>
    );
}

export default TypingBox;
