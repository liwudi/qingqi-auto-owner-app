/* @flow */
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React, { Component } from 'react';
import * as C from './constants';
import Grid from './Grid';

const styles = StyleSheet.create({
	default: {
		flex: 1,
		alignItems: 'flex-end',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});

export default class BarChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentIndex : this.props.currentIndex || null
		};
		this.props.highlightColor = this.props.highlightColor || this.props.color || C.BLUE;
	}

	_handlePress = (e , dataPoint , index ) => {
		if (this.props.onDataPointPress) {
			this.setState({
				currentIndex : index
			});
			setTimeout(() => {
				this.props.onDataPointPress(e, dataPoint, index);
			});
		}
	};

	_drawBar = (_dataPoint , index ) => {
		const [_x, dataPoint] = _dataPoint;
		const backgroundColor = this.state.currentIndex === index ? this.props.highlightColor : (this.props.color || C.BLUE);
		const HEIGHT = this.props.height;
		const WIDTH = this.props.width;
		let widthPercent = this.props.widthPercent || 0.5;
		if (widthPercent > 1) widthPercent = 1;
		if (widthPercent < 0) widthPercent = 0;

		let minBound = this.props.minVerticalBound;
		let maxBound = this.props.maxVerticalBound;

		// For all same values, create a range anyway
		if (minBound === maxBound) {
			minBound -= this.props.verticalGridStep;
			maxBound += this.props.verticalGridStep;
		}

		const data = this.props.data || [];
		const width = (WIDTH / data.length * this.props.horizontalScale * 0.5) * widthPercent;
		const divisor = (maxBound - minBound <= 0) ? 0.00001 : (maxBound - minBound);
		const scale = HEIGHT / divisor;
		let height = HEIGHT - ((minBound * scale) + (HEIGHT - (dataPoint * scale)));
		if (height <= 0) height = 20;
		return (
			<TouchableWithoutFeedback
				key={index}
				onPress={(e) => this._handlePress(e, dataPoint, index)}
			>
				<View
					style={{
						borderTopLeftRadius: this.props.cornerRadius || 0,
						borderTopRightRadius: this.props.cornerRadius || 0,
						backgroundColor,
						width,
						height,
						alignItems:'center'
					}}
				><Text style={{color:'#FFF'}}>{dataPoint}</Text></View>
			</TouchableWithoutFeedback>
		);
	};

	render() {
		const data = this.props.data || [];
		return (
			<View ref="container" style={[styles.default]}>
				<Grid {...this.props} />
				{data.map(this._drawBar)}
			</View>
		);
	}
}
