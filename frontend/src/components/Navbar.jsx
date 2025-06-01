import React, { useState } from "react";
import data from "../utils/data";

function Navbar({
    language,
    setLanguage,
    subLanguage,
    setSubLanguage,
    timeThreshold,
    setTimeThreshold,
}) {
    const hasSubLanguages = Object.keys(data[language]?.subLanguage).length > 0;
    const timeLimits = { Time: [15, 30, 60, 120] };
    return (
        <nav className="flex gap-3 py-1 px-8 rounded-md w-auto text-sm">
            {/* Seconds buttons */}
            {timeThreshold &&
                timeLimits.Time.map((seconds, index) => (
                    <button
                        key={index}
                        className={`p-2 hover:text-gray-300 active:opacity-30 transition-all duration-300 ${
                            seconds === timeThreshold ? "text-purple-500" : ""
                        }`}
                        onClick={() => setTimeThreshold(seconds)}
                    >
                        {seconds}
                    </button>
                ))}
            {/* Category saprating margin */}
            {timeThreshold && (
                <span className="border border-[2px] rounded-xl opacity-30 h-4 m-auto border-[var(--color-text)]"></span>
            )}
            {/* Time Button */}
            <button
                onClick={() => {
                    setTimeThreshold(timeThreshold ? null : 30);
                }}
                className={`p-2 hover:text-gray-300 active:opacity-30 transition-all duration-300 ${
                    timeThreshold ? "text-purple-500" : ""
                }`}
            >
                Time
            </button>
            {/* Category saprating margin */}
            <span className="border border-[2px] rounded-xl opacity-30 h-4 m-auto border-[var(--color-text)]"></span>
            {/* Language Buttons */}
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
                                onClick={() => {
                                    if (subLanguage === subLang)
                                        setSubLanguage("");
                                    else setSubLanguage(subLang);
                                }}
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
