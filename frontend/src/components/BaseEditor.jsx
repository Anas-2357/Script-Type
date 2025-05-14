import React, { useRef, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import "../index.css";

function BaseEditor({
    height = "50vh",
    width,
    defaultLanguage = "javascript",
    defaultValue,
    theme = "vs-dark",
    readOnly = false,
}) {
    const editorRef = useRef(null);
    const monacoRef = useRef(null);
    const highLightIds = {};

    function generateKey(num1, num2) {
        return `${num1}_${num2}`;
    }

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
        monacoRef.current = monaco;
    }

    function addHighlight(lineNumber, colNumber) {
        const monaco = monacoRef.current;
        const editor = editorRef.current;

        const range = new monaco.Range(
            lineNumber,
            colNumber,
            lineNumber,
            colNumber + 1
        );

        const decoration = {
            range,
            options: {
                inlineClassName: "highlighted-text",
            },
        };

        const key = generateKey(lineNumber, colNumber);
        const [id] = editor.deltaDecorations([], [decoration]);
        highLightIds[key] = id;
        console.log(id);
    }

    function removeHighlight(lineNumber, colNumber) {
        const editor = editorRef.current;

        const key = generateKey(lineNumber, colNumber);

        if (!Object.keys(highLightIds).includes(key)) {
            console.log(
                "Trying to remove highlight from a charachtor that isn't already highlighted"
            );
            return;
        }

        editor.deltaDecorations([highLightIds[key]], []);
    }

    return (
        <Editor
            height={height}
            width={width}
            defaultLanguage={defaultLanguage}
            defaultValue={defaultValue}
            theme={theme}
            options={{
                readOnly: readOnly,
            }}
            onMount={handleEditorDidMount}
        />
    );
}

export default BaseEditor;
