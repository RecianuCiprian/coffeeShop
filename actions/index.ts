import * as types from './types'
import {api} from "../api";
import {SEARCH_URL} from "../api/rest_api";

const currentLocation = {
    latitude: "51.5265",
    longitude: "-0.0825"
};

export const fetchData = () => {
    return async (dispatch) => {
        try{
            dispatch({
                type: types.REQUEST_COFFEESHOPS
            })
            const result = await api.get(SEARCH_URL, {
                params: {
                    categories: 'coffee,coffeeroasteries,coffeeshops',
                    ...currentLocation,
                }
            })
            dispatch({
                type: types.REQUEST_COFFEESHOPS_SUCCESS,
                payload: result.data.businesses
            })
        }catch(e){
            dispatch({
                type: types.REQUEST_COFFEESHOPS_FAIL,
                payload: e.message
            })
        }
    }
}
