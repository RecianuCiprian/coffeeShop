import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions} from "react-native";
import { AppLoading } from 'expo';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Marker, Callout} from 'react-native-maps';
import {Card, Text} from "react-native-elements";
import * as Location from 'expo-location';

import {api} from "../../api";
import {SEARCH_URL} from "../../api/rest_api";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const oldStreet = {
    latitude: 51.52653,
    longitude: -0.08246,
}
let currentLocation = {
    latitude: 51.52653,
    longitude: -0.08246,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

const Maps = () => {
    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [data, setData] = useState([])

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
        if(location){
            fetchData();
        }
    }, [location])

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync()
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied')
            }

            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            })
            setLocation(location)
        })()
    }, [])

    if(!location) return <AppLoading style={{width, height}}/>;

    currentLocation = {
        ...currentLocation,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
    }

    return (
        <SafeAreaView style={styles.container}>
            <MapView initialRegion={currentLocation} style={styles.mapStyle} >
                {data.map(({id, coordinates, name, image_url}) => (
                    <Marker
                        key={id}
                        coordinate={coordinates}
                        title={name}
                        // icon={({color, size}) => <Ionicons name="coffee" size={size} color={color} />}
                        image={require('../../assets/marker.png')}
                    >
                        <Callout>
                            <View style={styles.plainView}>
                                <Text>{name}</Text>
                                <Card.Image source={{uri: image_url}}/>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mapStyle:{
        width,
        height
    },
    plainView:{
        flex: 1,
    },
    marker:{
        flex:1,
        width: 5,
        height: 5
    }
});

export default Maps;
