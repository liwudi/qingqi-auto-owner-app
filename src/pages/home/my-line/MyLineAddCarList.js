/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/20
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import * as Icons from '../../../components/Icons';
import Env from '../../../utils/Env';
const estyle = Env.style;
import {IconUser} from '../../../components/Icons'
export default class MyLineAddCarList extends Component {
	render() {
		return (
			<View>
				<TopBanner {...this.props} title="添加车辆"/>
				<View style={[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
					<View style={estyle.fx1}>
						<Text style={[estyle.articleTitle]}>陕A1456</Text>
						<View style={[estyle.fxRow, estyle.fxRowCenter,estyle.paddingTop]}>
							<IconUser color={Env.color.main}/>
							<Text style={[estyle.note, estyle.marginLeft]}>主：</Text>
							<Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
							<Text style={[estyle.marginLeft]}>副：</Text>
							<Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
						</View>
					</View>
					<View style={estyle.paddingRight}><Text style={estyle.note}>线路:无</Text></View>
					<View style={[estyle.paddingRight, estyle.fxCenter]}>
						<View style={[styles.add,estyle.paddingHorizontal]}><Text>添加</Text></View>
					</View>
				</View>
				<View style={[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
					<View style={estyle.fx1}>
						<Text style={[estyle.articleTitle]}>陕A1456</Text>
						<View style={[estyle.fxRow, estyle.fxRowCenter,estyle.paddingTop]}>
							<IconUser color={Env.color.main}/>
							<Text style={[estyle.note, estyle.marginLeft]}>主：</Text>
							<Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
							<Text style={[estyle.marginLeft]}>副：</Text>
							<Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
						</View>
					</View>
					<View style={estyle.paddingRight}><Text style={estyle.note}>线路:无</Text></View>
					<View style={[estyle.paddingRight, estyle.fxCenter]}>
						<View style={[styles.add,estyle.paddingHorizontal]}><Text>添加</Text></View>
					</View>
				</View>
				<View style={[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
					<View style={estyle.fx1}>
						<Text style={[estyle.articleTitle]}>陕A1456</Text>
						<View style={[estyle.fxRow, estyle.fxRowCenter,estyle.paddingTop]}>
							<IconUser color={Env.color.main}/>
							<Text style={[estyle.note, estyle.marginLeft]}>主：</Text>
							<Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
							<Text style={[estyle.marginLeft]}>副：</Text>
							<Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
						</View>
					</View>
					<View style={estyle.paddingRight}><Text style={estyle.note}>线路:无</Text></View>
					<View style={[estyle.paddingRight, estyle.fxCenter]}>
						<View style={[styles.add,estyle.paddingHorizontal]}><Text>添加</Text></View>
					</View>
				</View>
				<View style={[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
					<View style={estyle.fx1}>
						<Text style={[estyle.articleTitle]}>陕A1456</Text>
						<View style={[estyle.fxRow, estyle.fxRowCenter,estyle.paddingTop]}>
							<IconUser color={Env.color.main}/>
							<Text style={[estyle.note, estyle.marginLeft]}>主：</Text>
							<Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
							<Text style={[estyle.marginLeft]}>副：</Text>
							<Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
						</View>
					</View>
					<View style={estyle.paddingRight}><Text style={estyle.note}>线路:北京-青岛</Text></View>
					<View style={[estyle.paddingRight, estyle.fxCenter]}>
						<View style={[styles.add,estyle.paddingHorizontal]}><Text>添加</Text></View>
					</View>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	add: {
		borderRadius: 400,
		backgroundColor: Env.color.main,
	}
});