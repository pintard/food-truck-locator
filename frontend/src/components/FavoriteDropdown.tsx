import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../hooks/useTheme";

interface FavoriteDropdownProps {
  closeDropdown: () => void;
}

const FavoriteDropdown: React.FC<FavoriteDropdownProps> = ({
  closeDropdown,
}) => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/favorites");
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorite food trucks:", error);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (truckId: string) => {
    try {
      await axios.delete(`http://localhost:5001/api/favorites/${truckId}`);
      setFavorites(favorites.filter((truck) => truck._id !== truckId));
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };

  return (
    <div
      className={`absolute right-0 mt-4 w-64 rounded-xl overflow-hidden border z-[1000] shadow-lg ${
        theme === "dark"
          ? "bg-gray-800 text-white border-gray-700"
          : "bg-white text-black border-gray-300"
      }`}
    >
      <div className="flex flex-col">
        <div className="w-full bg-indigo-600 flex justify-center py-2">
          <h2 className="text-lg font-bold text-white">Favorite Food Trucks</h2>
        </div>

        <div className="p-4 max-h-72 overflow-y-scroll">
          <ul className="space-y-4">
            {favorites.length > 0 ? (
              favorites.map((truck) => (
                <li
                  key={truck._id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">{truck.Applicant}</h3>
                    <p className="text-sm">
                      <em>{truck.Address}</em>
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveFavorite(truck._id)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Remove
                  </button>
                </li>
              ))
            ) : (
              <p>No favorites added yet.</p>
            )}
          </ul>
        </div>
        <div className="p-4">
          <button
            onClick={closeDropdown}
            className="w-full px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteDropdown;
