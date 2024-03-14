// components/MapComponent.tsx
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

interface MapComponentProps {
  center: [number, number]; // [経度, 緯度]
}

const MapComponent: React.FC<MapComponentProps> = ({ center }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';
    const initializedMap = new mapboxgl.Map({
      container: mapContainerRef.current!, // '!'は非nullアサーションオペレーターです
      style: 'mapbox://styles/stellamaris347/cldp1pp2p003m01rawmfmjyne',
      center: center,
      zoom: 15
    });

    setMap(initializedMap);

    // クリーンアップ関数
    return () => initializedMap.remove();
  }, []); // 空の依存配列はマウント時にのみ実行されることを意味します

  // centerプロパティが変更された場合、マップの中心を更新
  useEffect(() => {
    if (map) {
      map.flyTo({
        center: center,
        essential: true
      });
    }
  }, [center]); // centerが変更されたときにのみ実行されます

  return <div id='map' ref={mapContainerRef} style={{ width: '100vw', height: '90vh' }} />;
};

export default MapComponent;
