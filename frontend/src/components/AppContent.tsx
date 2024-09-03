import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useFoodTruckContext } from "../hooks/useFoodTruckContext";
import TabNavigation from "./TabNavigation";
import FoodTruckList from "./FoodTruckList";
import MapContainer from "./MapContainer";
import FavoriteButton from "./FavoriteButton";
import ThemeSwitchButton from "./ThemeSwitchButton";
import axios from "axios";
import { useTheme } from "../hooks/useTheme";

const AppContent = () => {
  const {
    filteredFoodTrucks,
    selectedTruck,
    expandedCards,
    activeTab,
    facilityTypes,
    handleTruckClick,
    setActiveTab,
    toggleExpandCard,
    formatFoodItems,
  } = useFoodTruckContext();

  const { theme } = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [favoriteTrucks, setFavoriteTrucks] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/favorites");
        const favorites = response.data.reduce((acc: any, truck: any) => {
          acc[truck._id] = true;
          return acc;
        }, {});
        setFavoriteTrucks(favorites);
      } catch (error) {
        console.error("Error fetching favorite food trucks:", error);
      }
    };
    fetchFavorites();
  }, []);

  const toggleFavorite = (truckId: string, isFavorite: boolean) => {
    setFavoriteTrucks((prev) => ({
      ...prev,
      [truckId]: isFavorite,
    }));
  };

  const filteredSearchResults = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return filteredFoodTrucks.filter((truck) => {
      const applicantMatch = truck.Applicant.toLowerCase().includes(query);
      const foodItemsMatch = truck.FoodItems.toLowerCase().includes(query);
      return applicantMatch || foodItemsMatch;
    });
  }, [searchQuery, filteredFoodTrucks]);

  const scrollToSelectedTruck = useCallback(() => {
    if (selectedTruck && listRef.current) {
      const selectedIndex = filteredSearchResults.findIndex(
        (truck) => truck._id === selectedTruck._id
      );

      if (selectedIndex !== -1) {
        const selectedCard = listRef.current?.children[
          selectedIndex
        ] as HTMLElement;
        if (selectedCard) {
          listRef.current.scrollTo({
            top: selectedCard.offsetTop - listRef.current.offsetTop,
            behavior: "smooth",
          });
        }
      }
    }
  }, [selectedTruck, filteredSearchResults]);

  const handleTruckClickInternal = useCallback(
    (truck: any) => {
      if (
        activeTab !== "All" &&
        !filteredFoodTrucks.some((t) => t._id === truck._id)
      ) {
        setActiveTab("All");
      }
      handleTruckClick(truck);
    },
    [activeTab, filteredFoodTrucks, handleTruckClick, setActiveTab]
  );

  useEffect(() => {
    scrollToSelectedTruck();
  }, [selectedTruck, filteredSearchResults, scrollToSelectedTruck]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        handleTruckClick(null);
      }
    },
    [handleTruckClick]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div
      ref={contentRef}
      className={`flex flex-col items-center h-screen p-6 ${
        theme === "dark" ? "bg-gray-950 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <header className="flex justify-between w-full max-w-7xl mb-4">
        <h1
          className="text-4xl font-bold text-indigo-600"
          style={{ fontFamily: "'Jaro', sans-serif" }}
        >
          Food Truck Locator
        </h1>
        <div className="flex space-x-4">
          <FavoriteButton />
          <ThemeSwitchButton />
        </div>
      </header>
      <div
        className={`flex flex-1 w-full max-w-7xl rounded-lg shadow-lg ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        } overflow-hidden`}
      >
        <div className="flex-3 w-3/4 p-4 relative">
          <div className="absolute inset-0 rounded-lg pointer-events-none" />
          <MapContainer />
        </div>
        <div className="flex-1 w-1/4 flex flex-col rounded-r-lg overflow-hidden">
          <TabNavigation
            activeTab={activeTab}
            facilityTypes={facilityTypes}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResultsCount={filteredSearchResults.length}
          />
          <div
            ref={listRef}
            className={`relative overflow-y-scroll ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-50"
            } flex-1`}
          >
            <FoodTruckList
              filteredFoodTrucks={filteredSearchResults}
              expandedCards={expandedCards}
              selectedTruck={selectedTruck}
              handleTruckClick={handleTruckClickInternal}
              toggleExpandCard={toggleExpandCard}
              formatFoodItems={formatFoodItems}
              isFavorite={(truckId: string) => !!favoriteTrucks[truckId]}
              toggleFavorite={toggleFavorite}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppContent;
