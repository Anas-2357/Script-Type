import { useState } from "react";
import Navbar from "./components/Navbar";
import TypingBox from "./components/TypingBox";

function App() {
    const [language, setLanguage] = useState('Javascript')
    return (
        <div className="px-48 py-12 flex flex-col gap-24 items-center">
            <Navbar language={language} setLanguage={setLanguage}/>
            <TypingBox />
        </div>
    );
}

export default App;
