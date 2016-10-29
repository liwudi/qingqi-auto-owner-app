/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou 2016/10/21
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet
} from 'react-native';

import TopBanner from '../../components/TopBanner';
import CarListMessage from './CarListMessage';
import PersonalMessage from './PersonalMessage';
import TabNavigator from '../../components/TabNavigator';
import Env from '../../utils/Env';
const tabs = [
	{
		title:'车队信息',
		component: CarListMessage
	},
	{
		title:'个人信息',
		component: PersonalMessage
	}
];
export default class Message extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<View  style ={styles.body}>
				<TopBanner {...this.props} title="消息中心"/>
				<TabNavigator {...this.props} tabs={tabs}/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	body:{
		flex:1,
		backgroundColor:Env.color.bg
	}
});