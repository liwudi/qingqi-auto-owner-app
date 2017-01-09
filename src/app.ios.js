'use strict';
import React, { Component } from 'react';
import { NativeModules, View, AppState } from 'react-native';
import { Provider } from 'react-redux'

import configureStore from './configure-store';

import Main from './pages/Main';
import Env from './utils/Env';

const estyle = Env.style;



AppState.addEventListener('change', (currentAppState) => {
    global.appIsActive = (currentAppState == 'active');
});

let store = configureStore();
export default class App extends Component {
	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<Provider store={store}>
					<Main />
				</Provider>
			</View>

		);
	}
}
