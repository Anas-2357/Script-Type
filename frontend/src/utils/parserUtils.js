import data from "./data";

export function prepareCharState(paragraph, language, subLanguage) {
    const chars = paragraph.split("");
    const tempArray = [];
    let subLangIdx = 0;

    for (let i = 0; i < chars.length; i++) {
        const currentChar = chars[i];

        // Logic for sublanguage
        if (currentChar === "ï") {
            // skip special char if subLanguage state is empty
            if (subLanguage === "") {
                backtrackSpaces(tempArray);
            } else {
                const subSnippet =
                    data[language.value]["subLanguage"][subLanguage][subLangIdx++] ||
                    "";
                for (let j = 0; j < subSnippet.length; j++) {
                    tempArray.push({ char: subSnippet[j], status: "normal" });
                }
            }
            continue;
        }
        // push correct object on every iteration
        tempArray.push({ char: currentChar, status: "normal" });
    }

    return { state: tempArray };
}

// Backtrack/pop all the space object until the last non space char
function backtrackSpaces(arr) {
    while (arr[arr.length - 1]?.char === " ") {
        arr.pop();
    }
}
