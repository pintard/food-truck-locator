import axios from "axios";
import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";

interface FoodTruck {
  _id?: string;
  Applicant: string;
  Latitude: number;
  Longitude: number;
  Address: string;
  FacilityType: string;
  FoodItems: string;
}

interface FoodTruckContextType {
  foodTrucks: FoodTruck[];
  filteredFoodTrucks: FoodTruck[];
  facilityTypes: string[];
  selectedTruck: FoodTruck | null;
  expandedCards: number[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  handleTruckClick: (truck: FoodTruck | null) => void;
  toggleExpandCard: (index: number) => void;
  formatFoodItems: (foodItems: string) => string[];
}

export const FoodTruckContext = createContext<FoodTruckContextType | undefined>(
  undefined
);

export const FoodTruckProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>([]);
  const [selectedTruck, setSelectedTruck] = useState<FoodTruck | null>(null);
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<string>("All");

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/foodtrucks")
      .then((response) => {
        const data = response.data;
        const filteredTrucks = data.filter((truck: FoodTruck) => {
          if (!truck.FoodItems) return false;
          if (!truck.FacilityType) return false;
          const foodItemsArray = truck.FoodItems.split(":");
          const hasInvalidItem = foodItemsArray.some(
            (item: string) => item.length > 24
          );
          return !hasInvalidItem;
        });

        setFoodTrucks(filteredTrucks);
      })
      .catch((error) => {
        console.error("Error fetching food truck data:", error);
      });
  }, []);

  const handleTruckClick = (truck: FoodTruck | null) => {
    setSelectedTruck(truck);
  };

  const formatFoodItems = useMemo(() => {
    return (foodItems: string) => {
      return foodItems.split(":").map((item) =>
        item
          .trim()
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase())
      );
    };
  }, []);

  const toggleExpandCard = (index: number) => {
    setExpandedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const filteredFoodTrucks = useMemo(() => {
    return activeTab === "All"
      ? foodTrucks
      : foodTrucks.filter((truck) => truck.FacilityType === activeTab);
  }, [activeTab, foodTrucks]);

  const facilityTypes = useMemo(() => {
    return Array.from(
      new Set(
        foodTrucks
          .map((truck) => truck.FacilityType)
          .filter((type) => type && type.trim() !== "")
      )
    );
  }, [foodTrucks]);

  const value = {
    foodTrucks,
    filteredFoodTrucks,
    facilityTypes,
    selectedTruck,
    expandedCards,
    activeTab,
    setActiveTab,
    handleTruckClick,
    toggleExpandCard,
    formatFoodItems,
  };

  return (
    <FoodTruckContext.Provider value={value}>
      {children}
    </FoodTruckContext.Provider>
  );
};
