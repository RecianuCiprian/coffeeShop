import axios from "axios";
import Constants from "expo-constants";

export const api = axios.create({
    baseURL: 'https://api.yelp.com/v3',
    headers:{
        Authorization: `Bearer ${Constants.manifest.extra.yelpApiKey}`
    }
})
