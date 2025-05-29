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

    function addCursor(index) {
        const currentState = charState;
        currentState.splice(index, 0, { char: "", status: "blink" });
        setCharState(currentState);
    }

    function removeCursor() {
        const currentState = charState;
        currentState.splice(currIndex, 1);
        setCharState(currentState);
    }

    useEffect(() => {
        setState();

        inputRef.current?.focus();
    }, []);

    function handleKeyDown(e) {
        const typedChar = e.key
        const charToType = currIndex ? charState[currIndex + 1].char : charState[currIndex].char;
        currIndex && removeCursor();

        // console.log(typedChar);
        // console.log(charToType);
        // console.log(charState)

        if (typedChar === "Backspace") {
            charState[currIndex - 1].status = "normal";
            setCurrIndex((prev) => prev - 1);
            addCursor(currIndex - 1);
        } else {
            charState[currIndex].status =
                charToType === typedChar ? "correct" : "inCorrect";
            setCurrIndex((prev) => prev + 1);
            addCursor(currIndex + 1);
        }
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
