/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";
import lineClamp from "@tailwindcss/line-clamp";

export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lineageGold: "#c8a96e",
        lineageDark: "#0b0e13",
        lineageGray: "#1a1f29"
      },
      fontFamily: {
        serif: ['"Cinzel"', "serif"]
      },
      backgroundImage: {
        lineage: "url('/lineage-bg.jpg')"
      }
    }
  },
  plugins: [forms, lineClamp]
}

