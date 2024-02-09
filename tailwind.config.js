/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "2rem",
                sm: "4rem",
                lg: "6rem",
                xl: "7rem",
                "2xl": "8rem",
            },
        },
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                cupcake: {
                    primary: "#f95f62",
                    "primary-focus": "#f22c2f",
                    "primary-content": "#ffffff",
                    secondary: "#f95f62",
                    "secondary-focus": "#f22c2f",
                    "secondary-content": "#ffffff",
                    accent: "#37cdbe",
                    "accent-focus": "#2aa79b",
                    "accent-content": "#ffffff",
                    neutral: "#3d4451",
                    "neutral-focus": "#2a2e37",
                    "neutral-content": "#ffffff",
                    "base-100": "#ffffff",
                    "base-200": "#f9fafb",
                    "base-300": "#d1d5db",
                    "base-content": "#1f2937",
                    info: "#2094f3",
                    success: "#009485",
                    warning: "#ff9900",
                    error: "#ff5724",
                },
            },
            'night'
        ],
    },
};

// cupcake , forest , night
