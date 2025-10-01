/* global kakao */
import { useEffect, useRef } from "react"

export function KakaoMap({ toilets, focused, onSelectMarker }) {
  const mapRef = useRef(null)
  const mapObj = useRef(null)
  const markersRef = useRef([])
  const infoWindowRef = useRef(null)

  useEffect(() => {
    if (!mapRef.current) return
    const ensureScript = () =>
      new Promise((resolve, reject) => {
        if (window.kakao && window.kakao.maps) return resolve()

        const key = import.meta.env.VITE_KAKAO_MAP_KEY
        const script = document.createElement("script")
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`
        script.async = true
        script.onload = () => {
          window.kakao.maps.load(() => resolve())
        }
        script.onerror = () => reject(new Error("kakao map load failed"))
        document.head.appendChild(script)
      })

    ensureScript().then(() => {
      const center = new window.kakao.maps.LatLng(37.498095, 127.02761)
      mapObj.current = new window.kakao.maps.Map(mapRef.current, {
        center,
        level: 5,
      })
      infoWindowRef.current = new window.kakao.maps.InfoWindow({
        removable: true,
      })
    })
  }, [])

  useEffect(() => {
    if (!mapObj.current || !window.kakao) return
    markersRef.current.forEach((m) => m.setMap(null))
    markersRef.current = []

    const bounds = new window.kakao.maps.LatLngBounds()
    for (const t of toilets) {
      if (t.latitude == null || t.longitude == null) continue
      const pos = new window.kakao.maps.LatLng(t.latitude, t.longitude)
      const marker = new window.kakao.maps.Marker({ position: pos })

      //  여기에 마커 클릭 이벤트를 추가합니다.
      window.kakao.maps.event.addListener(marker, "click", () => {
        // 클릭된 마커의 화장실 정보(t)를 부모 컴포넌트로 전달
        onSelectMarker(t)
        const content = `
          <div style="padding:5px; font-size:11px; min-width:300px; max-width:300px; overflow-wrap: break-word;">
            <strong>${t.name}</strong>
            <br>${t.roadAddress}<br>
            <span style="color:gray;">${"운영시간:\n"}${t.open_time}</span>
            <span style="color:gray;">${"비상벨:\n"}${t.emergency_bell}</span>
            <span style="color:gray;">${"기저귀 교환대:\n"}${
          t.diaper_table
        }</span>
          </div>
          `
        infoWindowRef.current.setContent(content)

        //  인포윈도우를 현재 클릭된 마커 위에 표시
        infoWindowRef.current.open(mapObj.current, marker)
      })
      marker.setMap(mapObj.current)
      markersRef.current.push(marker)
      bounds.extend(pos)
    }
    if (!bounds.isEmpty()) {
      mapObj.current.setBounds(bounds)
    }
  }, [toilets, onSelectMarker])

  useEffect(() => {
    if (!mapObj.current || !focused || !window.kakao) return
    if (focused.latitude == null || focused.longitude == null) return
    const pos = new window.kakao.maps.LatLng(
      focused.latitude,
      focused.longitude
    )
    mapObj.current.setLevel(3)
    mapObj.current.setCenter(pos)
  }, [focused])

  return <div ref={mapRef} className="map" />
}
