import data from "../constants/data";

export function prepareCharState(paragraph, language, subLanguage) {
    const chars = paragraph.split("");
    const tempArray = [];
    let subLangIdx = 0;

    for (let i = 0; i < chars.length; i++) {
        const currentChar = chars[i];

        if (currentChar === "ï") {
            if (subLanguage === "") {
                backtrackSpaces(tempArray);
            } else {
                const subSnippet =
                    data[language]["subLanguage"][subLanguage][subLangIdx++] ||
                    "";
                for (let j = 0; j < subSnippet.length; j++) {
                    tempArray.push({ char: subSnippet[j], status: "normal" });
                }
            }
            continue;
        }

        tempArray.push({ char: currentChar, status: "normal" });
    }

    return { state: tempArray };
}

function backtrackSpaces(arr) {
    while (arr[arr.length - 1]?.char === " ") {
        arr.pop();
    }
}
