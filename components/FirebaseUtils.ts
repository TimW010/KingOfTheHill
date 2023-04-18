import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
    apiKey: (process.env.REACT_APP_FIREBASE_API_KEY),
  
    authDomain: (process.env.REACT_APP_FIREBASE_AUTH_DOMAIN),
  
    projectId: (process.env.REACT_APP_FIREBASE_PROJECT_ID),
  
    storageBucket: (process.env.REACT_APP_FIREBASE_STORAGE_BUCKET),
  
    messagingSenderId: (process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID),
  
    appId: (process.env.REACT_APP_FIREBASE_APP_ID),
  
    measurementId: (process.env.REACT_APP_FIREBASE_MEASUREMENT_ID)
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addPlayer = async (player: {name: string, score: number}) => {
    try {
        const playersCol = collection(db, 'players');
        const docRef = await addDoc(playersCol, player);
        const gameState = { player: player.name, playerScore: player.score}
        await AsyncStorage.setItem("gameState", JSON.stringify(gameState));
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// create a function to update a player's score in the database
export const updatePlayer = async (player: {name: string, score: number}) => {
    try {
        console.log(player.name)
        const playersCol = collection(db, 'players');
        const docRef = doc(playersCol, player.name);
        // await updateDoc(docRef, player);
        await updateDoc(doc(db, 'players', 'YtFGQPC0K80x8q8XAQcA'), player);
        console.log("Document updated with ID: ", docRef.id);
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}

// create a function to get all players from the database
export const getPlayers = async () => {
    try {
        const playersCol = collection(db, 'players');
        const playersSnapshot = await getDocs(playersCol);
        const playersList = playersSnapshot.docs.map(doc => doc.data());
        return playersList;
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
}

