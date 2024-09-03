import { useContext } from "react";
import { FoodTruckContext } from "../context/FoodTruckContext";

export const useFoodTruckContext = () => {
  const context = useContext(FoodTruckContext);
  if (!context) {
    throw new Error(
      "useFoodTruckContext must be used within a FoodTruckProvider"
    );
  }
  return context;
};
