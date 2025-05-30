import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  
  const lightTheme = {
    "--bg-color": "white",
    "--text-color": "black",
  };

  const darkTheme = {
    "--bg-color": "#222",
    "--text-color": "#ddd",
  };

  const applyTheme = (themeObj) => {
    const root = document.documentElement;
    Object.entries(themeObj).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

 
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "light") {
      applyTheme(lightTheme);
    } else {
      applyTheme(darkTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    if (newTheme === "light") {
      applyTheme(lightTheme);
    } else {
      applyTheme(darkTheme);
    }

    localStorage.setItem("theme", newTheme);
  };

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};

export default ThemeToggle;
