import React, { useRef, useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";

interface IMap {
    mapType: google.maps.MapTypeId,
    mapTypeControl?: boolean;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;

const Map: React.FC<IMap> = ({ mapType, mapTypeControl = false }) => {
  const classes = useStyles();
  const ref = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<GoogleMap>();

  const startMap = (): void => {
    if (!map) {
      defaultMapStart();
    }
  };
  useEffect(startMap, [map]);
  

  const defaultMapStart = (): void => { 
    const defaultAddress = new google.maps.LatLng(65.166, 13.369);
    initMap(5, defaultAddress);
  };

  const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
    if (ref.current) {
      setMap(
        new google.maps.Map(ref.current, {
          zoom: zoomLevel,
          center: address,
          mapTypeControl: mapTypeControl,
          streetViewControl: false,
          zoomControl: true,
          mapTypeId:mapType
        })
      );
    }
  };

  return (
    <div className={classes.mapContainer}>
      <div ref={ref} className={classes.mapContainerMap}></div>
    </div>
  )
}


const useStyles = makeStyles({
    mapContainer: {
    display: 'flex',
    justifyContent: 'center',
},
mapContainerMap: {
  height: "60vh",
  width: "80%", 
}
});

export default Map