import React, { useState } from "react";

function LocationPermission() {
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          alert("Location access denied");
        },
      );
    } else {
      alert("Geolocation not supported");
    }
  };

  return (
    <div>
      <button onClick={getLocation}>📍 Use My Location</button>
      {location && (
        <p>
          Lat: {location.lat} | Lng: {location.lng}
        </p>
      )}
    </div>
  );
}

export default LocationPermission;
