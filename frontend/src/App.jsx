import Editor from "@monaco-editor/react";

function App() {

    return (
        <div className="flex flex-col items-center gap-8 h-screen p-8 bg-[#2c2025ee]">
            <Editor
                height="45vh"
                width="80vw"
                defaultLanguage="javascript"
                defaultValue="// some comment"
                // onMount={handleEditorDidMount}
                theme="vs-dark"
                options={{
                    readOnly: true,
                }}
            />
            <Editor
                height="40vh"
                width="80vw"
                defaultLanguage="javascript"
                defaultValue="// some comment"
                // onMount={handleEditorDidMount}
                theme="vs-dark"
            />
        </div>
    );
}
export default App;
