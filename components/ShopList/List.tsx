import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, Dimensions} from "react-native";
//@ts-ignore
import {useDispatch, useSelector} from 'react-redux';

import Item from "./Item";
import Deck from "../Deck";
import {fetchData} from '../../actions';

const width = Dimensions.get('window').width; //full width
const currentLocation = {
    latitude: "51.5265",
    longitude: "-0.0825"
};

type TData = {
    id: string;
    name: string;
    image_url: string;
}

const Shops: React.FC<any> = () => {
    const dispatch = useDispatch();
    const coffeeShops = useSelector((reduxState) => reduxState.coffeeShops);

    useEffect(() => {
        dispatch(fetchData());
    }, [])

    const onChange = () => {
        // setData((prevData) => prevData.slice(1))
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={coffeeShops}
                renderItem={({item, index}) => <Deck shouldAnimate={index === 0} onChange={onChange}><Item {...item}/></Deck>}
                keyExtractor={({id}) => id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        width: width
    },
});

export default Shops;
