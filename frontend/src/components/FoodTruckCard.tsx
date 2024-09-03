import React, { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import axios from "axios";

interface FoodTruckCardProps {
  truck: any;
  index: number;
  expanded: boolean;
  selected: boolean;
  handleTruckClick: () => void;
  toggleExpandCard: () => void;
  formattedFoodItems: string[];
  isFavorite: boolean;
  toggleFavorite: (truckId: string, isFavorite: boolean) => void;
}

const FoodTruckCard: React.FC<FoodTruckCardProps> = ({
  truck,
  index,
  expanded,
  selected,
  isFavorite,
  handleTruckClick,
  toggleExpandCard,
  toggleFavorite,
  formattedFoodItems,
}) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);

    try {
      if (isFavorite) {
        await axios.delete(`http://localhost:5001/api/favorites/${truck._id}`);
      } else {
        await axios.post("http://localhost:5001/api/favorites", {
          truckId: truck._id,
        });
      }
      toggleFavorite(truck._id, !isFavorite);
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    } finally {
      setLoading(false);
    }
  };

  const HeartIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={isFavorite ? "#4F46E5" : theme === "dark" ? "#9CA3AF" : "#DEDFE0"}
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer ${loading ? "opacity-50" : ""}`}
      onClick={handleFavoriteClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.36129 3.46995C6.03579 3.16081 6.76287 3 7.50002 3C8.23718 3 8.96425 3.16081 9.63875 3.46995C10.3129 3.77893 10.9185 4.22861 11.4239 4.78788C11.7322 5.12902 12.2678 5.12902 12.5761 4.78788C13.5979 3.65726 15.0068 3.00001 16.5 3.00001C17.9932 3.00001 19.4021 3.65726 20.4239 4.78788C21.4427 5.91515 22 7.42425 22 8.9792C22 10.5342 21.4427 12.0433 20.4239 13.1705L14.2257 20.0287C13.0346 21.3467 10.9654 21.3467 9.77429 20.0287L3.57613 13.1705C3.07086 12.6115 2.67474 11.9531 2.40602 11.2353C2.13731 10.5175 2 9.75113 2 8.9792C2 8.20728 2.13731 7.44094 2.40602 6.72315C2.67474 6.00531 3.07086 5.34694 3.57613 4.78788C4.08157 4.22861 4.68716 3.77893 5.36129 3.46995Z"
      />
    </svg>
  );

  return (
    <li
      className={`truck-card p-4 rounded-lg shadow-md cursor-pointer relative ${
        selected
          ? theme === "dark"
            ? "bg-indigo-900 border border-indigo-400 text-white"
            : "bg-indigo-100 border border-indigo-500 text-black"
          : theme === "dark"
          ? "bg-gray-800 text-gray-200"
          : "bg-white text-black"
      }`}
      onClick={handleTruckClick}
    >
      <div className="flex justify-between items-center">
        <h3
          className="font-bold text-lg truncate max-w-[80%]"
          title={truck.Applicant}
        >
          {truck.Applicant}
        </h3>
        <HeartIcon />
      </div>
      <p>
        <em>{truck.FacilityType}</em> @{" "}
        {truck.Address}
      </p>
      <div className="flex flex-wrap gap-2 mt-2">
        {(expanded ? formattedFoodItems : formattedFoodItems.slice(0, 8)).map(
          (item, i) => (
            <span
              key={i}
              className={`${
                selected
                  ? "bg-indigo-200 text-indigo-800"
                  : "bg-indigo-100 text-indigo-800"
              } text-xs font-medium px-2.5 py-0.5 rounded-full`}
            >
              {item}
            </span>
          )
        )}
      </div>
      {formattedFoodItems.length > 8 && (
        <button
          className={`mt-2 text-sm hover:underline ${
            theme === "dark" ? "text-indigo-400" : "text-indigo-600"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            toggleExpandCard();
          }}
        >
          {expanded ? "Hide" : "See More"}
        </button>
      )}
    </li>
  );
};

export default FoodTruckCard;
