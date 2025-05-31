import { useState } from "react";
import Navbar from "./components/Navbar";
import TypingBox from "./components/TypingBox";
import Result from "./components/Result";

function App() {
    const [language, setLanguage] = useState("Javascript");
    const [subLanguage, setSubLanguage] = useState("");
    const [isSessionComplete, setIsSessionComplete] = useState(false);
    return (
        <div className="px-48 py-12 flex flex-col gap-24 items-center">
            {!isSessionComplete && (
                <>
                    <Navbar
                        language={language}
                        setLanguage={setLanguage}
                        subLanguage={subLanguage}
                        setSubLanguage={setSubLanguage}
                    />
                    <TypingBox language={language} subLanguage={subLanguage} setIsSessionComplete={setIsSessionComplete}/>{" "}
                </>
            )}
            {isSessionComplete && 
                <Result />
            }
        </div>
    );
}

export default App;
