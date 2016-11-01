'use strict';
import React, { Component } from 'react';
import { Provider } from 'react-redux'

import configureStore from './configure-store';

import Main from './pages/Main.android';

let store = configureStore();

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Main />
			</Provider>
		);
	}
}
