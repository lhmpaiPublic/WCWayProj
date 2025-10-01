/* global kakao */
import { useEffect, useRef, useState } from "react";

export function KakaoMap({ toilets, focused }) {
  const mapRef = useRef(null);
  const mapObj = useRef(null);
  const markersRef = useRef([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;
    const ensureScript = () =>
      new Promise((resolve, reject) => {
        if (window.kakao && window.kakao.maps) return resolve();
        const key = import.meta.env.VITE_KAKAO_MAP_KEY;
        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`;
        script.async = true;
        script.onload = () => {
          window.kakao.maps.load(() => resolve());
        };
        script.onerror = () => reject(new Error("kakao map load failed"));
        document.head.appendChild(script);
      });

    ensureScript().then(() => {
      const center = new window.kakao.maps.LatLng(37.498095, 127.02761);
      mapObj.current = new window.kakao.maps.Map(mapRef.current, {
        center,
        level: 5,
      });
      setMapLoaded(true); // ✅ 지도가 준비된 시점
    });
  }, []);

  useEffect(() => {
    if (!mapLoaded || !mapObj.current || !window.kakao) return;
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    const bounds = new window.kakao.maps.LatLngBounds();
    for (const t of toilets) {
      if (t.latitude == null || t.longitude == null) continue;
      const pos = new window.kakao.maps.LatLng(t.latitude, t.longitude);
      const marker = new window.kakao.maps.Marker({ position: pos });
      marker.setMap(mapObj.current);
      markersRef.current.push(marker);
      bounds.extend(pos);
    }
    if (!bounds.isEmpty()) {
      mapObj.current.setBounds(bounds);
    }
  }, [toilets, mapLoaded]);

  useEffect(() => {
    if (!mapObj.current || !focused || !window.kakao) return;
    if (focused.latitude == null || focused.longitude == null) return;
    const pos = new window.kakao.maps.LatLng(
      focused.latitude,
      focused.longitude
    );
    mapObj.current.setLevel(3);
    mapObj.current.setCenter(pos);
  }, [focused]);

  return <div ref={mapRef} className="map" />;
}
