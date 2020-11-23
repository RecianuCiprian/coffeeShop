import React, {useEffect, useState} from 'react';
import {Animated, FlatList, StyleSheet, View, Dimensions} from "react-native";

import {api} from "../../api";
import {SEARCH_URL} from "../../api/rest_api";
import Item from "./Item";
import Deck from "../Deck";

const width = Dimensions.get('window').width; //full width
const currentLocation = {
    latitude: "51.5265",
    longitude: "-0.0825"
};

const Shops: React.FC<any> = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await api.get(SEARCH_URL, {
                params: {
                    categories: 'coffee,coffeeroasteries,coffeeshops',
                    ...currentLocation,
                }
            })
            setData(result.data.businesses)
        }

        fetchData();
    }, [])

    const onChange = () => {
        setData((prevData) => prevData.slice(1))
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({item, index}) => {
                    if (index === 0) return <Deck key={item.id} onChange={onChange}><Item {...item}/></Deck>
                    return <Animated.View key={item.id} ><Item {...item}/></Animated.View>
                }}
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
