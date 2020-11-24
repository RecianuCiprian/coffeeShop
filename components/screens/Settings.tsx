import React from 'react';
import {StyleSheet, View} from "react-native";
import {Text} from "react-native-elements";

const Settings = () => {
    return (
        <View style={styles.container}>
            <Text>This is the setting page</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 70,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Settings;
