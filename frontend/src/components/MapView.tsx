import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface MapViewProps {
  selectedTruck: {
    Latitude: number;
    Longitude: number;
  } | null;
}

const MapView: React.FC<MapViewProps> = ({ selectedTruck }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedTruck) {
      map.setView([selectedTruck.Latitude, selectedTruck.Longitude], 20, {
        animate: true,
      });
    }
  }, [selectedTruck, map]);

  return null;
};

export default MapView;
