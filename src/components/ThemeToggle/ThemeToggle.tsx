
import { Moon, SunMedium } from "lucide-react";
import {useTheme} from "../../context/ThemeContext";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="icon-button"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <Moon size={18} /> : <SunMedium size={18} />}
    </button>
  );
}

export default ThemeToggle;