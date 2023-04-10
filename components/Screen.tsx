import React from 'react';
import { StyleSheet, SafeAreaView} from 'react-native';

interface ScreenProps {
    children: React.ReactNode;
}

export const Screen = ({ children }: ScreenProps) => {
    return (
        <SafeAreaView style={styles.screen}>
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    }
});

