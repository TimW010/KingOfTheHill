import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Screen } from '../Screen';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Location from "expo-location";
import { generateRandomGeofencingArea } from '../Utils';
import { checkGeofencingArea } from '../Utils';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "King of the Hill",
    body: "You are inside the hill. Stay here to capture it!",
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export const GameScreen = () => {
  //variables for push notifications
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  
  //variables for game logic
  const [player, setPlayer] = useState("Player 1");
  const [playerScore, setPlayerScore] = useState(0);

  const [playerLocation, setPlayerLocation] = useState(null);
  const [geofenceArea, setGeofenceArea] = useState(null);

  useEffect(() => {
    //set up push notifications
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(`Notification response: ${response}`);
    });

    //set up geofencing
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if(location){
        setPlayerLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        if (!geofenceArea) { // if there is no geofence area stored in AsyncStorage, generate one
          setGeofenceArea(
            generateRandomGeofencingArea(
              location.coords.latitude,
              location.coords.longitude
            )
          );
        }
      }
    };

    // load previous game state from AsyncStorage
    const loadState = async () => {
      const savedState = await AsyncStorage.getItem("gameState");
      if (savedState) {
        const { player, playerScore, geofenceArea } = JSON.parse(savedState);
        setPlayer(player);
        setPlayerScore(playerScore);
        console.log(`Geofencing Area from AsyncStorage ${Object.values(geofenceArea)}`)
        setGeofenceArea(geofenceArea);
      }
    };

    loadState();
    getLocation();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    // save game state to AsyncStorage whenever it changes
    const saveState = async () => {
      const gameState = { player, playerScore, geofenceArea };
      await AsyncStorage.setItem("gameState", JSON.stringify(gameState));
    };

    saveState();
  }, [player, playerScore, geofenceArea]);

  const handleRegionChange = async (latitude, longitude) => {
    if(checkGeofencingArea(geofenceArea, playerLocation)){
      setPlayerScore(playerScore + 1);
      setGeofenceArea(
        generateRandomGeofencingArea(
          latitude,
          longitude
        )
      );
      sendPushNotification(expoPushToken);
    }
  };


  return (
    <Screen>
      {playerLocation && geofenceArea && (
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: playerLocation.latitude,
            longitude: playerLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          onRegionChange={() => handleRegionChange(playerLocation.latitude, playerLocation.longitude)}
        >
          <Circle
            center={{
              latitude: geofenceArea.latitude,
              longitude: geofenceArea.longitude,
            }}
            radius={geofenceArea.radius}
            fillColor="rgba(255, 0, 0, 0.5)"
            strokeColor="rgba(255, 0, 0, 0.2)"
          />
        </MapView>
      )}
    </Screen>
  );
}
