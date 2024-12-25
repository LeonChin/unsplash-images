import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AppContext = createContext();

const getInitialDarkMode = () => {
  const preferDarkMode = window.matchMedia("(prefers-color-schema: dark)");
  console.log(preferDarkMode);
  const storedDarkMode = localStorage.getItem("darkTheme");
  if (storedDarkMode === null) {
    return preferDarkMode;
  }
  return storedDarkMode === "true";
};

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState("cat");
  const toggleDarkTheme = () => {
    const newState = !isDarkMode;
    setIsDarkMode(newState);
    localStorage.setItem("darkTheme", newState);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkMode);
  }, [isDarkMode]);
  return (
    <AppContext.Provider
      value={{ isDarkMode, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
