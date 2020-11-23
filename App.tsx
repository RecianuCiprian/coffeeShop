import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from "expo-constants";
import axios from "axios";

export const api = axios.create({
  baseURL: 'https://api.yelp.com/v3',
  headers:{
    Authorization: `Bearer ${Constants.manifest.extra.yelpApiKey}`
  }
})
export const SEARCH_URL = '/businesses/search';

export default function App() {
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

  return (
    <View style={styles.container}>
      <Text>Coffee Shops</Text>
      {data.map((item)=> <Text key={item.id}>{item.name}</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
