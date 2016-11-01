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
const estyle = Env.style;
export default class ViewForRightArrow extends React.Component{
	render (){
		const _renderRightIcon = () => {
			if(this.props.rightIcon){
				let Icon = this.props.rightIcon;
				return <Icon size={this.props.iconSize||Env.font.navTitle} color={this.props.iconColor||Env.color.text}/>
			} else if(this.props.rightIcon === null){
				return null;
			}else {
				return <IconArrowRight size={this.props.iconSize||Env.font.navTitle} color={this.props.iconColor||Env.color.text}/>
			}
		}
		return (
			<TouchableOpacity activeOpacity={this.props.activeOpacity || 0.8} style={[estyle.fxRow, estyle.fxRowCenter, estyle.cardBackgroundColor, estyle.paddingHorizontal, estyle.borderBottom,this.props.style]} onPress={this.props.onPress}>
				<View style={[estyle.fx1, estyle.paddingVertical]}>{this.props.children}</View>
				<View style={[estyle.fxColumnCenter, estyle.paddingLeft]}>{_renderRightIcon()}</View>
			</TouchableOpacity>
		);
	}
}
