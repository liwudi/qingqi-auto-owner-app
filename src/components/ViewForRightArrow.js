/**
 * Created by ligj on 2016/9/26.
 */
import React from 'react';

import {
	View,
	StyleSheet,
	Text,
	Image,
	Dimensions,
	TouchableOpacity
} from 'react-native';

import { IconArrowRight } from './Icons';
import Env from '../utils/Env';

export default class ViewForRightArrow extends React.Component{
	render (){
		const _renderRightIcon = () => {
			if(this.props.rightIcon){
				let Icon = this.props.rightIcon;
				return <Icon size={this.props.iconSize||Env.font.navTitle} color={this.props.iconColor||Env.color.text}/>
			} else {
				return <IconArrowRight size={this.props.iconSize||Env.font.navTitle} color={this.props.iconColor||Env.color.text}/>
			}
		}
		return (
			<TouchableOpacity activeOpacity={this.props.activeOpacity || 0.8} style={[styles.container,this.props.style]} onPress={this.props.onPress}>
				<View style={styles.left}>{this.props.children}</View>
				<View style={styles.right}>{_renderRightIcon()}</View>
			</TouchableOpacity>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flexDirection:'row'
	},
	left:{
		flex:1,
		justifyContent:'center'
	},
	right:{
		justifyContent:'center',
		alignItems:'center',
		width:100 * Env.font.base
	}
});