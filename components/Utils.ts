// Calculate distance between two points using Haversine formula
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) *
        Math.cos(φ2) *
        Math.sin(Δλ / 2) *
        Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return d;
};

// Check if player is in geofencing area
export const checkGeofencingArea = (geofenceArea: {latitude: number, longitude: number, radius: number}, playerLocation: {latitude: number, longitude: number}) => {

        const checkIfInArea = (geofencingArea, playerLocation) => {
            const distance = calculateDistance(geofencingArea.latitude, geofencingArea.longitude, playerLocation.latitude, playerLocation.longitude);
            return distance < geofencingArea.radius;
        };

        const isInArea = checkIfInArea(geofenceArea, playerLocation);
        if (isInArea) {
          return true;
        }
};

// Generate random geofencing area
export const generateRandomGeofencingArea = (latitude, longitude) => {
    const randomRadius = Math.floor(Math.random() * 200) + 100;
    const randomLatitude =
      Math.random() * 0.01 + latitude - Math.random() * 0.005;
    const randomLongitude =
      Math.random() * 0.01 + longitude - Math.random() * 0.005;
    return {
      latitude: randomLatitude,
      longitude: randomLongitude,
      radius: randomRadius,
    };
};



