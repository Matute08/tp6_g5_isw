import React, { useEffect, useRef } from "react";

function MapaTrayecto({ inicio, destino }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();
    const mapOptions = {
      zoom: 15,
    };

    const map = new window.google.maps.Map(mapRef.current, mapOptions);

    const request = {
      origin: inicio,
      destination: destino,
      travelMode: window.google.maps.TravelMode.DRIVING, // Puedes cambiar el modo según tus necesidades
    };

    directionsService.route(request, (result, status) => {
      if (status === "OK") {
        new window.google.maps.DirectionsRenderer({
          map,
          directions: result,
        });
      } else {
        console.error("No se pudo calcular el trayecto");
      }
    });
  }, [inicio, destino]);

  return (
    <div className="map-container">
      <div ref={mapRef} style={{ width: "100%", height: "300px" }}></div>
    </div>
  );
}

export default MapaTrayecto;
