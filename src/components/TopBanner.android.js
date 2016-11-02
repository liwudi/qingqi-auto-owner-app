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
	TouchableOpacity,
	PixelRatio,
	StatusBar
} from 'react-native';

import * as Icons from './Icons';

import Env from '../utils/Env';

export default class TopBanner extends React.Component{
	static defaultProps = {
		leftShow: true,
		titleShow:true
	};
	constructor(props){
		super(props);
	}

	// componentWillReceiveProps(nextProps){
	// 	console.log(nextProps)
	// 	this.setState({});
	// }


	render (){
		const _renderLeft = () => {
			if(this.props.leftView){
				return this.props.leftView;
			}else if(this.props.leftShow){
				return (
					<TouchableOpacity onPress={() => this.props.doBack()}>
						<Text style={styles.text}><Icons.IconArrowLeft color="#FFF" /></Text>
					</TouchableOpacity>
				)
			} else {
				return (<Text></Text>);
			}
		}
		const _renderTitle = () => {
			if(this.props.titleView){
				return <View style={styles.textView}>
						{this.props.titleView}
					</View>
			}else if(this.props.titleShow){
				return (
					<View style={styles.textView}>
						<Text style={styles.titleText}>{this.props.title}</Text>
					</View>
				)
			} else {
				return null;
			}
		}
		return (
			<View style={[styles.topBanner,{backgroundColor: this.props.color || Env.color.main}]}>
				<StatusBar backgroundColor={ this.props.color || Env.color.main} />
				<View style = {styles.backButton}>
					{_renderLeft()}
				</View>
				{_renderTitle()}
				<View style = {styles.nextButton} >
					{this.props.rightView}
				</View>
			</View>
		);
	}
}

// TopBanner.defaultProps = {
// 	leftShow: true
// };

const styles = StyleSheet.create({
	topBanner: {
		height: 84 * Env.font.base,

		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	},
	textView:{
		flex:1,
		alignItems:'center',
		justifyContent:'center',
	},
	text: {
		fontSize: Env.font.navTitle,
		color:'#FFF'
	},
	titleText: {
		fontSize: Env.font.navTitle,
		color:'#FFF',
		textAlign: 'center'
	},
	backButton: {
		flex:1,
		paddingLeft: Env.font.base * 20
	},
	nextButton: {
		flex:1,
		paddingRight: Env.font.base * 20,
		justifyContent: 'flex-end',
		flexDirection:'row'
	},
	nextButtonText:{
		fontSize: Env.font.navTitle,
		color:'#FFF',
		textAlign:'right',
	}
});