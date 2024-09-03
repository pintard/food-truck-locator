import React, { useRef, useEffect, useState } from "react";
import FoodTruckCard from "./FoodTruckCard";

interface FoodTruckListProps {
  filteredFoodTrucks: any[];
  expandedCards: number[];
  selectedTruck: any;
  handleTruckClick: (truck: any) => void;
  toggleExpandCard: (index: number) => void;
  formatFoodItems: (foodItems: string) => string[];
  isFavorite: (truckId: string) => boolean;
  toggleFavorite: (truckId: string, isFavorite: boolean) => void;
}

const FoodTruckList: React.FC<FoodTruckListProps> = ({
  filteredFoodTrucks,
  expandedCards,
  selectedTruck,
  handleTruckClick,
  toggleExpandCard,
  formatFoodItems,
  isFavorite,
  toggleFavorite,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (listRef.current) {
      setIsScrolled(listRef.current.scrollTop > 0);
    }
  };

  useEffect(() => {
    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (listElement) {
        listElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedTruck && listRef.current) {
      const selectedIndex = filteredFoodTrucks.findIndex(
        (truck) => truck === selectedTruck
      );

      if (selectedIndex !== -1) {
        const selectedCard = listRef.current?.children[
          selectedIndex
        ] as HTMLElement;
        if (selectedCard) {
          selectedCard.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  }, [selectedTruck, filteredFoodTrucks]);

  const handleTruckClickInternal = (truck: any) => {
    handleTruckClick(truck);
  };

  const handleExpandCard = (index: number) => {
    toggleExpandCard(index);
  };

  const handleScrollUp = () => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex-1 overflow-y-auto" ref={listRef}>
        <ul className="space-y-4 p-4">
          {filteredFoodTrucks.map((truck, index) => (
            <FoodTruckCard
              key={index}
              truck={truck}
              index={index}
              expanded={expandedCards.includes(index)}
              selected={selectedTruck === truck}
              handleTruckClick={() => handleTruckClickInternal(truck)}
              toggleExpandCard={() => handleExpandCard(index)}
              formattedFoodItems={formatFoodItems(truck.FoodItems)}
              isFavorite={isFavorite(truck._id)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </ul>
      </div>
      {isScrolled && (
        <button
          onClick={handleScrollUp}
          className="bg-indigo-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-indigo-700 transition duration-200 z-50 absolute bottom-6 left-1/2 transform -translate-x-1/2"
        >
          Scroll Up ↑
        </button>
      )}
    </div>
  );
};

export default FoodTruckList;
