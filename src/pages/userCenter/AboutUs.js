/**
 * Created by cryst on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
Image
} from 'react-native';

import TopBanner from '../../components/TopBanner';
import ListItem from '../../components/ListItem';
import Env from '../../utils/Env';
const estyle = Env.style;
export default class AboutUs extends Component {
	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="关于我们"/>
					<View style={[estyle.fx1, estyle.fxCenter]}>
						<Image style={[{width:Env.font.base * 167,height:Env.font.base * 102}]}
							   source={require('../../assets/images/fawjiefang.png')}
						/>
					</View>
					<View style={[estyle.fx1]}>
						<ListItem left="官方网址" right="www.fawjiefang.com.cn"/>
						<ListItem left="客服电话" right="400-1234-123"/>
						<ListItem left="版本信息" right="V1.0.0"/>
					</View>
					<View style={[estyle.fx1, estyle.fxRowCenter, {justifyContent: 'flex-end'}]}>
						<Text style={[{fontSize: Env.font.mini, color: Env.color.main}, estyle.paddingBottom]}>服务条款和隐私政策</Text>
						<Text style={[{fontSize: Env.font.mini, color: Env.color.note}, estyle.paddingTop]}>中国一汽集团青岛汽车厂</Text>
						<Text style={[{fontSize: Env.font.mini, color: Env.color.note}]}>Copyright © 2016 FAW Group Corporation</Text>
						<Text style={[{fontSize: Env.font.mini, color: Env.color.note}, estyle.marginBottom]}>All Rights Reserved.</Text>
					</View>

			</View>
		);
	}
}

