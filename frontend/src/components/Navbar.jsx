import React from "react";
import data from "../constants/data";

function Navbar({ language, setLanguage }) {
    return (
        <nav className="flex gap-3 py-1 px-8 rounded-md w-auto text-sm">
            {Object.keys(data).map((data, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setLanguage(data)}
                        className={`p-2 hover:text-gray-300 active:opacity-30 transition-all duration-300 ${
                            language === data ? "text-purple-500" : ""
                        }`}
                    >
                        {data}
                    </button>
                );
            })}
            {/* <span className='border border-[2px] rounded-xl opacity-30 h-4 m-auto border-[var(--color-text)]'></span> */}
        </nav>
    );
}

export default Navbar;
