import React, { useEffect, useRef } from "react";

function Mapa({ tipoDireccion, direccion, altura, ciudad }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const geocoder = new window.google.maps.Geocoder();
    const mapOptions = {
      zoom: 15,
    };

    const map = new window.google.maps.Map(mapRef.current, mapOptions);

    const direccionCompleta = `${direccion}, ${altura}, ${ciudad}`;

    geocoder.geocode({ address: direccionCompleta }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;

        map.setCenter(location);

        new window.google.maps.Marker({
          position: location,
          map: map,
          title: `Ubicación de ${tipoDireccion}`,
        });
      } else {
        console.error(`No se pudo geocodificar la dirección de ${tipoDireccion}`);
      }
    });
  }, [tipoDireccion, direccion, altura, ciudad]);

  return (
    <div className="map-container">
      <div ref={mapRef} style={{ width: "100%", height: "300px" }}></div>
    </div>
  );
}

export default Mapa;
