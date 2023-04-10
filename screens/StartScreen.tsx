import React from "react";
import { Text, StyleSheet } from "react-native";
import { Screen } from "../components/Screen";
import { Container, Wrapper } from "../components/Components";

export const StartScreen = () => {
  return (
    <Screen>
      <Wrapper>
        <Container>
          <Text>Start Screen</Text>
        </Container>
      </Wrapper>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
