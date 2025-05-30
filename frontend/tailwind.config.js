/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                mono: ['"Roboto Mono"', "monospace"],
            },
            keyframes: {
                blink: {
                    "0%, 100%": { opacity: "0" },
                    "50%": { opacity: "1" },
                },
            },
            animation: {
                blink: "blink 1s step-start infinite",
            },
            colors: {
                primary: "var(--color-primary)",
                secondary: "var(--color-secondary)",
            },
        },
    },
    plugins: [],
};
