import React from "react";
import { useTheme } from "../hooks/useTheme";

const ThemeSwitchButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const LightDarkIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block mr-2"
    >
      <path
        d="M6 2H18C19.1 2 20 2.9 20 4V7.32C20 7.87 19.55 8.32 19 8.32H5C4.45 8.32 4 7.87 4 7.32V4C4 2.9 4.9 2 6 2Z"
        fill="#fff"
      />
      <path
        d="M4 10.3203V11.8803C4 12.9603 4.58 13.9603 5.53 14.4903L8.49 16.1603C9.12 16.5103 9.51 17.1803 9.51 17.9003V20.0003C9.51 21.1003 10.41 22.0003 11.51 22.0003H12.51C13.61 22.0003 14.51 21.1003 14.51 20.0003V17.9003C14.51 17.1803 14.9 16.5103 15.53 16.1603L18.49 14.4903C19.43 13.9603 20.02 12.9603 20.02 11.8803V10.3203C20.02 9.77031 19.57 9.32031 19.02 9.32031H5C4.45 9.32031 4 9.76031 4 10.3203Z"
        fill="#fff"
      />
    </svg>
  );

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 flex items-center"
    >
      <LightDarkIcon />
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ThemeSwitchButton;
