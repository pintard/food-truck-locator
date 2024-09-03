import React from "react";
import "leaflet/dist/leaflet.css";
import { FoodTruckProvider } from "./context/FoodTruckContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppContent from "./components/AppContent";

const App = () => {
  return (
    <ThemeProvider>
      <FoodTruckProvider>
        <AppContent />
      </FoodTruckProvider>
    </ThemeProvider>
  );
};

export default App;
