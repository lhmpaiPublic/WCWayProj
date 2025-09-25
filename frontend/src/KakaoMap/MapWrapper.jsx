import { Map } from "react-kakao-maps-sdk";
import styled from "@emotion/styled";
import useKakaoLoader from "./useKakaoLoader";

const MapWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: "100%";
  height: 80vh;
`;

export default function BasicMap() {
  useKakaoLoader();

  return (
    <MapWrapper>
      <Map // 지도를 표시할 Container
        id="map"
        center={{
          // 지도의 중심좌표
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100%",
        }}
        level={3} // 지도의 확대 레벨
      />
    </MapWrapper>
  );
}
