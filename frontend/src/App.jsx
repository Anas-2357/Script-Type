import Editor from "@monaco-editor/react";
import BaseEditor from "./components/BaseEditor";
import { useState } from "react";

function App() {
    const [content, setContent] = useState(`kjsbndkdjfnjkdsnfkjnaskjdfjnsdjknfkjsn
        
asdfas
asdfsad
asdfsdf
asdfsadadkjfand`)
    return (
        <div className="flex flex-col items-center gap-8 h-screen p-8 bg-[#2c2025ee]">
            <BaseEditor
                defaultLanguage="javascript"
                defaultValue={content}
            />
        </div>
    );
}
export default App;
