/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou 2016/10/24 车辆消息详情
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	Image
} from 'react-native';

import TopBanner from '../../components/TopBanner';
import Env from '../../utils/Env';
import {IconUser} from '../../components/Icons';
import ConfirmButton from '../../components/ConfirmButton';
const estyle = Env.style;
export default class MessageListCar extends Component {
	render() {
		return (
			<View style={[estyle.fx1,estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="京N25994"/>
				<View style={estyle.fx1}>
					<ScrollView>
						{/*list一行开始*/}
						<View style={[estyle.padding,estyle.fxRow,estyle.borderBottom,estyle.cardBackgroundColor]}>
							<View style={estyle.fxCenter}>
								<Image
									style={{borderRadius:100,width:50,height:50,borderWidth:4 * Env.font.base,
										borderColor:'#85C7E7',}}
									source={require('../../assets/images/icon-1.png')}
								/>
							</View>
							<View style={[estyle.marginLeft,estyle.fx1]}>
								<View style={[estyle.fxRow]}>
									<View style={estyle.fx1}>
										<Text style={[estyle.articleTitle]}>引擎熄火</Text>
									</View>
									<Text style={[estyle.text,estyle.marginLeft]}>19.06</Text>
								</View>
								<View style={[estyle.fxRow, estyle.fxRowCenter]}>
									<IconUser/>
									<Text style={[estyle.note, {color: Env.color.text}]}>张</Text>
									<IconUser color={Env.color.main} style ={estyle.marginLeft}/>
									<Text style={[estyle.note, {color: Env.color.text}]}>李四</Text>
								</View>
								<View>
									<Text>在北京市东城区东直门南大街停车熄火</Text>
								</View>
							</View>
						</View>
						{/*list一行结束*/}
						<View style={[estyle.padding,estyle.fxRow,estyle.borderBottom,estyle.cardBackgroundColor]}>
							<View style={estyle.fxCenter}>
								<Image
									style={{borderRadius:100,width:50,height:50,borderWidth:4 * Env.font.base,
										borderColor:'#85C7E7',}}
									source={require('../../assets/images/icon-1.png')}
								/>
							</View>
							<View style={[estyle.marginLeft,estyle.fx1]}>
								<View style={[estyle.fxRow]}>
									<View style={estyle.fx1}>
										<Text style={[estyle.articleTitle]}>引擎熄火</Text>
									</View>
									<Text style={[estyle.text,estyle.marginLeft]}>19.06</Text>
								</View>
								<View style={[estyle.fxRow, estyle.fxRowCenter]}>
									<IconUser/>
									<Text style={[estyle.note, {color: Env.color.text}]}>张</Text>
									<IconUser color={Env.color.main} style ={estyle.marginLeft}/>
									<Text style={[estyle.note, {color: Env.color.text}]}>李四</Text>
								</View>
								<View>
									<Text>在北京市东城区东直门南大街停车熄火</Text>
								</View>
							</View>
						</View>
						<View style={[estyle.padding,estyle.fxRow,estyle.borderBottom,estyle.cardBackgroundColor]}>
							<View style={estyle.fxCenter}>
								<Image
									style={{borderRadius:100,width:50,height:50,borderWidth:4 * Env.font.base,
										borderColor:'#85C7E7',}}
									source={require('../../assets/images/icon-1.png')}
								/>
							</View>
							<View style={[estyle.marginLeft,estyle.fx1]}>
								<View style={[estyle.fxRow]}>
									<View style={estyle.fx1}>
										<Text style={[estyle.articleTitle]}>引擎点火</Text>
									</View>
									<Text style={[estyle.text]}>2016-09-04</Text>
									<Text style={[estyle.text,estyle.marginLeft]}>19.06</Text>
								</View>
								<View style={[estyle.fxRow, estyle.fxRowCenter]}>
									<IconUser/>
									<Text style={[estyle.note, {color: Env.color.text}]}>张</Text>
									<IconUser color={Env.color.main} style ={estyle.marginLeft}/>
									<Text style={[estyle.note, {color: Env.color.text}]}>李四</Text>
								</View>
								<View>
									<Text>在北京市东城区东直门南大街停车熄火</Text>
								</View>
							</View>
						</View>
					</ScrollView>
				</View>
				<View style={[estyle.fxRow,estyle.cardBackgroundColor,estyle.fxCenter]}>
					<View style={estyle.padding}>
						<ConfirmButton size="small">联系司机</ConfirmButton>
					</View>
				</View>
			</View>
		);
	}
}