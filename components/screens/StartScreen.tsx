import React from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Screen } from "../Screen";
import { Container, Wrapper } from "../styled/Components";
import { addPlayer, getPlayers } from "../FirebaseUtils";

export const StartScreen = () => {
  const [text, setText] = React.useState("");
  const [players, setPlayers] = React.useState([]);

  React.useEffect(() => {
    getPlayers().then((players) => setPlayers(players));
  }, []);

  return (
    <Screen>
      <Wrapper>
        <Container>
          <Text style={styles.title}>King Of The Hill</Text>
          <Text style={styles.content}>
            On first use, define your player name.
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setText(text)}
            value={text}
            placeholder="Enter your name"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => addPlayer({ name: text, score: 0 })}
          >
            <Text style={{ fontWeight: "bold" }}>Add Player</Text>
          </TouchableOpacity>
          {players.length > 0 && (
            <View style={styles.leaderboard}>
              <Text style={styles.title}>Players:</Text>
              {players.map((player) => (
                <Text key={player.id} style={styles.content}>
                  {player.name} : {player.score}
                </Text>
              ))}
            </View>
          )}
        </Container>
      </Wrapper>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    fontSize: 16,
  },
  input: {
    height: 50,
    width: 300,
    backgroundColor: "#FFF",
    borderRadius: 12.5,
    padding: 16,
  },
  button: {
    height: "auto",
    width: "auto",
    backgroundColor: "rgba(255, 0, 0, 0.5)",
    borderRadius: 12.5,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  leaderboard: {
    height: "auto",
    width: 300,
    backgroundColor: "#FFF",
    borderRadius: 12.5,
    padding: 16,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 16,
  },
});
