import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useTheme } from "../hooks/useTheme";

interface TabNavigationProps {
  activeTab: string;
  facilityTypes: string[];
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchResultsCount: number;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  facilityTypes,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  searchResultsCount,
}) => {
  const { theme } = useTheme();
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(debouncedSearch);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSearch, setSearchQuery]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDebouncedSearch(e.target.value);
    },
    []
  );

  const tabs = useMemo(() => ["All", ...facilityTypes], [facilityTypes]);

  return (
    <div
      className={`sticky top-0 z-10 p-4 rounded-t-lg shadow ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-50 text-black"
      }`}
    >
      <ul className="flex space-x-2 mb-2">
        {tabs.map((type) => (
          <li key={type}>
            <button
              onClick={() => setActiveTab(type)}
              className={`inline-block py-2 px-6 font-semibold rounded-full transition-all duration-100 truncate ${
                activeTab === type
                  ? "bg-indigo-600 text-white"
                  : theme === "dark"
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-white text-indigo-600 hover:bg-indigo-100"
              }`}
              title={type}
            >
              {type}
            </button>
          </li>
        ))}
      </ul>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search Truck or Food"
          value={debouncedSearch}
          onChange={handleSearchChange}
          className={`px-4 py-2 w-full rounded-full ${
            theme === "dark" ? "bg-gray-700 text-white" : "border"
          }`}
        />
        <span
          className={`ml-2 py-2 px-4 rounded-full ${
            theme === "dark"
              ? "text-gray-300 bg-gray-600"
              : "text-indigo-600 bg-indigo-200"
          }`}
        >
          {searchResultsCount}
        </span>
      </div>
    </div>
  );
};

export default TabNavigation;
