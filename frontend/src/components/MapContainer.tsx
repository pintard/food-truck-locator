import React from "react";
import {
  MapContainer as LeafletMapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import { customIcon, selectedCustomIcon } from "../icons/LeafletIcons";
import MapView from "./MapView";
import { useFoodTruckContext } from "../hooks/useFoodTruckContext";
import { useTheme } from "../hooks/useTheme";

const MapContainer: React.FC = () => {
  const { filteredFoodTrucks, selectedTruck, handleTruckClick } =
    useFoodTruckContext();

  const { theme } = useTheme();

  return (
    <LeafletMapContainer
      center={[37.7749, -122.4194]}
      zoom={13}
      style={{ height: "100%", width: "100%", borderRadius: "0.375rem" }}
      className="border-indigo-600"
    >
      {theme === "dark" ? (
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
      ) : (
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
      )}
      <MapView selectedTruck={selectedTruck} />
      {filteredFoodTrucks.map((truck, index) => (
        <Marker
          key={index}
          position={[truck.Latitude, truck.Longitude]}
          icon={selectedTruck === truck ? selectedCustomIcon : customIcon}
          eventHandlers={{
            click: () => {
              handleTruckClick(truck);
            },
          }}
        >
          {selectedTruck === truck && (
            <Popup
              offset={[0, -selectedCustomIcon.options.iconSize[1] + 10]}
              autoPan={false}
            >
              <strong>{truck.Applicant}</strong>
              <br />
              <em>{truck.Address}</em>
            </Popup>
          )}
        </Marker>
      ))}
    </LeafletMapContainer>
  );
};

export default MapContainer;
