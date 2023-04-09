import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ScreenProps {
    children: React.ReactNode;
}

export const Screen = ({ children }: ScreenProps) => {
    return (
        <View style={styles.screen}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});