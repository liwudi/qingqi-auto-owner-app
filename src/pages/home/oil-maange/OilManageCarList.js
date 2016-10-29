/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/25 油耗管理 车辆列表
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
const estyle = Env.style;
import * as Icons from '../../../components/Icons';
import {IconUser} from '../../../components/Icons'
import ConfirmButton from '../../../components/ConfirmButton';
export default class OilManageCarList extends Component {
	render() {
		return (
			<View style={[estyle.fx1,estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="车辆列表"/>
				<View style={estyle.fx1}>
					<View style={[estyle.fxRow,estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
						<View style={estyle.fx1}>
							<View style={estyle.fxRow}>
								<Icons.IconFlag style={{color: 'red'}}/>
								<Text style={[estyle.articleTitle]}>陕A1456</Text>
							</View>
							<View style={[estyle.fxRow, estyle.fxRowCenter,estyle.paddingTop]}>
								<IconUser color={Env.color.main}/>
								<Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
								<IconUser style={[estyle.marginLeft]}/>
								<Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
							</View>
							<View style={[estyle.fxRow,estyle.paddingTop]}>
								<Text style={[estyle.note]}>平均油耗：<Text style={{color: Env.color.main}}>59</Text>L/100Km </Text>
								<Text style={[estyle.note,estyle.paddingLeft]}>平均速度：<Text style={{color: Env.color.main}}>70.2</Text>Km</Text>
							</View>

						</View>
					</View>
					<View style={[estyle.fxRow,estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
						<View style={estyle.fx1}>
							<Text style={[estyle.articleTitle]}>陕A1456</Text>
							<View style={[estyle.fxRow, estyle.fxRowCenter,estyle.paddingTop]}>
								<IconUser color={Env.color.main}/>
								<Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
								<IconUser style={[estyle.marginLeft]}/>
								<Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
							</View>
							<View style={[estyle.fxRow,estyle.paddingTop]}>
								<Text style={[estyle.note]}>平均油耗：<Text style={{color: Env.color.main}}>59</Text>L/100Km </Text>
								<Text style={[estyle.note,estyle.paddingLeft]}>平均速度：<Text style={{color: Env.color.main}}>70.2</Text>Km</Text>
							</View>
						</View>
					</View>
					<View style={[estyle.fxRow,estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
						<View style={estyle.fx1}>
							<Text style={[estyle.articleTitle]}>陕A1456</Text>
							<View style={[estyle.fxRow, estyle.fxRowCenter,estyle.paddingTop]}>
								<IconUser color={Env.color.main}/>
								<Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
								<IconUser style={[estyle.marginLeft]}/>
								<Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
							</View>
							<View style={[estyle.fxRow,estyle.paddingTop]}>
								<Text style={[estyle.note]}>平均油耗：<Text style={{color: Env.color.main}}>59</Text>L/100Km </Text>
								<Text style={[estyle.note,estyle.paddingLeft]}>平均速度：<Text style={{color: Env.color.main}}>70.2</Text>Km</Text>
							</View>
						</View>
					</View>
				</View>
				<View style={[estyle.fxRow,estyle.cardBackgroundColor,estyle.fxCenter]}>
					<View style={estyle.padding}>
						<ConfirmButton size="small">设定标杆</ConfirmButton>
					</View>
					<View style={estyle.padding}>
						<ConfirmButton size="small">查看标杆</ConfirmButton>
					</View>
				</View>
			</View>
		);
	}
}