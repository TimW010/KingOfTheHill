import PushNotification from 'react-native-push-notification';

export const noticeUserIfInArea = (geofencingArea: {latitude: number, longitude: number, radius: number}, playerLocation: {latitude: number, longitude: number}) => {
    // Calculate distance between two points using Haversine formula
        const calculateDistance = (lat1, lon1, lat2, lon2) => {
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

        const checkIfInArea = (geofencingArea, playerLocation) => {
            const distance = calculateDistance(geofencingArea.latitude, geofencingArea.longitude, playerLocation.latitude, playerLocation.longitude);
            return distance < geofencingArea.radius;
        };

        const isInArea = checkIfInArea(geofencingArea, playerLocation);

        if (isInArea) {
            PushNotification.localNotification({
                title: "King Of The Hill",
                message: 'You are inside the hill. Stay here to capture it!',
            });
            return true;
        } else {
            return false;
        }
};