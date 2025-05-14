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
    const decorationsRef = useRef([]);
    const allDecoration = [];

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
        monacoRef.current = monaco;
    }

    function addHighlight(lineNumber, colNumber) {
        const monaco = monacoRef.current;

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

        allDecoration.push(decoration);
        triggerHighlight();
    }

    function triggerHighlight() {
        const editor = editorRef.current;

        decorationsRef.current = editor.deltaDecorations(
            decorationsRef.current,
            allDecoration
        );
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
