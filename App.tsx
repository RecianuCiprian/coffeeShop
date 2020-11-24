import React from 'react';
import Navigation from './Navigation';
import {Provider} from 'react-redux';
import createStore from './components/store';

const {store} = createStore();

export default function App() {
    return (
        <Provider store={store}>
            <Navigation />
        </Provider>
    );
}
