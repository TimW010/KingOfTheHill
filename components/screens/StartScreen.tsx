import React from "react";
import { Image, Text, StyleSheet } from "react-native";
import { Screen } from "../Screen";
import { Container, Wrapper } from "../styled/Components";

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  }
});


export const StartScreen = () => {
  return (
    <Screen>
      <Wrapper>
        <Container>
          <Text style={styles.text}>King Of The Hill</Text>
        </Container>
      </Wrapper>
    </Screen>
  );
};


