/**
 * Created by ligj on 2016/9/26.
 */
import React from 'react';

import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	Navigator
} from 'react-native';

import Env from '../utils/Env';
const estyle = Env.style;


export default class ListItem extends React.Component{
	render (){
		return (
			<View style={[estyle.fxRow, estyle.padding, estyle.borderBottom, estyle.borderBottom, estyle.cardBackgroundColor, this.props.style]}>
				<Text style={[estyle.text, {textAlign: 'left'}]}>{this.props.left}</Text>
				<Text style={[estyle.fx1,estyle.text,{textAlign: 'right'}]}>{this.props.right}</Text>
			</View>
		);
	}
}