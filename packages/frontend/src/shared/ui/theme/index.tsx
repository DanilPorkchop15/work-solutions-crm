import React, { createContext, useContext, useEffect, useState } from "react";
import { BulbFilled, BulbOutlined } from "@ant-design/icons";
import { Button, Tooltip, Typography } from "antd";

type ThemeType = "light" | "dark";

interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  toggleTheme: () => {}
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const storedTheme: string | null = localStorage.getItem("theme");
    return storedTheme ? (storedTheme as ThemeType) : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);

export const ThemeSwitcherButton = () => {
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      type="text"
      icon={theme === "dark" ? <BulbFilled /> : <BulbOutlined />}
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        fontSize: "16px",
        transition: "all 0.3s",
        width: isHovered ? 120 : 32,
        overflow: "hidden"
      }}
    >
      {isHovered && (
        <Typography.Text
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s",
            whiteSpace: "nowrap"
          }}
        >
          {theme === "dark" ? "Светлая тема" : "Тёмная тема"}
        </Typography.Text>
      )}
    </Button>
  );
};
