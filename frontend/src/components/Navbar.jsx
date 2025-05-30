import React from "react";
import data from "../constants/data";

function Navbar({ language, setLanguage, subLanguage, setSubLanguage }) {
    const hasSubLanguages = Object.keys(data[language]?.subLanguage).length > 0;
    return (
        <nav className="flex gap-3 py-1 px-8 rounded-md w-auto text-sm">
            {Object.keys(data).map((lang, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => {
                            setLanguage(lang);
                        }}
                        className={`p-2 hover:text-gray-300 active:opacity-30 transition-all duration-300 ${
                            language === lang ? "text-purple-500" : ""
                        }`}
                    >
                        {lang}
                    </button>
                );
            })}
            {hasSubLanguages && (
                <>
                    <span className="border border-[2px] rounded-xl opacity-30 h-4 m-auto border-[var(--color-text)]"></span>

                    {Object.keys(data[language]["subLanguage"]).map(
                        (subLang, index) => (
                            <button
                                key={index}
                                onClick={() => setSubLanguage(subLang)}
                                className={`p-2 hover:text-gray-300 active:opacity-30 transition-all duration-300 ${
                                    subLanguage === subLang
                                        ? "text-purple-500"
                                        : ""
                                }`}
                            >
                                {subLang}
                            </button>
                        )
                    )}
                </>
            )}
        </nav>
    );
}

export default Navbar;
