/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                urbanist: ["Urbanist", "sans-serif"],
            },
            colors: {
                primary: {
                    50: "#f0fdf4",
                    100: "#dcfce7",
                    200: "#bbf7d0",
                    300: "#86efac",
                    400: "#4ade80",
                    500: "#22c55e",
                    600: "#16a34a",
                    700: "#15803d",
                    800: "#166534",
                    900: "#14532d",
                },
                light: {
                    100: "#ffffff",
                    200: "#fafafa",
                    300: "#f5f5f5",
                    400: "#f0f0f0",
                    500: "#d9d9d9",
                    600: "#bfbfbf",
                    700: "#8c8c8c",
                    800: "#595959",
                    900: "#262626",
                },
            },
        },
    },
    plugins: [],
};
