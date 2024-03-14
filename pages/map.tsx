// pages/map.tsx
import React, { useCallback, useState } from 'react';
import SearchBar from '../components/SearchBar';
import MapComponent from '../components/MapComponent';

const MapPage: React.FC = () => {
  const [center, setCenter] = useState<[number, number]>([139.6917, 35.6895]); // 初期値は東京

  const handleSearch = useCallback(async (query: string) => {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${accessToken}&limit=1`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center;
        setCenter([longitude, latitude]);
      }
    } catch (error) {
      console.error("Failed to fetch location data", error);
    }
  }, []);

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <MapComponent center={center} />
    </div>
  );
};

export default MapPage;