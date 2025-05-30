import { useState } from "react";
import Navbar from "./components/Navbar";
import TypingBox from "./components/TypingBox";

function App() {
    const [language, setLanguage] = useState("Javascript");
    const [subLanguage, setSubLanguage] = useState("");
    return (
        <div className="px-48 py-12 flex flex-col gap-24 items-center">
            <Navbar language={language} setLanguage={setLanguage} subLanguage={subLanguage} setSubLanguage={setSubLanguage} />
            <TypingBox language={language} />
        </div>
    );
}

export default App;
