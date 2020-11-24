import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import ShopList from "../ShopList/List";

const Main: React.FC<any> = () => {
    return (
        <View style={styles.container}>
            <Text>Coffee Shops</Text>
            <ShopList/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 70,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
});

export default Main;
