/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	ScrollView
} from 'react-native';

import ViewForRightArrow from '../../../components/ViewForRightArrow';
import { IconCall } from '../../../components/Icons';
import Env from '../../../utils/Env';
const estyle = Env.style;


import TopBanner from '../../../components/TopBanner';

export default class CarDetail extends Component {
	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="车辆详情"/>
				<ScrollView style={[estyle.fx1]}>
					<Text style={[estyle.paddingTop, estyle.paddingLeft, estyle.marginFontBottom, estyle.text]}>车辆详情</Text>
					<View style={[estyle.cardBackgroundColor]}>
						<ViewForRightArrow
							style={[estyle.padding, estyle.borderBottom]}
						>
							<View style={[estyle.fxRow]}>
								<Text style={[estyle.text, {textAlign: 'left'}]}>车牌号</Text>
								<Text style={[estyle.fx1,estyle.text, {color:Env.color.auxiliary, textAlign: 'right'}]}>京123456</Text>
							</View>
						</ViewForRightArrow>
						<ViewForRightArrow
							style={[estyle.padding, estyle.borderBottom]}
						>
							<View style={[estyle.fxRow]}>
								<Text style={[estyle.text, {textAlign: 'left'}]}>车辆参数</Text>
							</View>
						</ViewForRightArrow>
					</View>

					<Text style={[estyle.paddingTop, estyle.paddingLeft, estyle.marginFontBottom, estyle.text]}>车主信息</Text>
					<View style={[estyle.cardBackgroundColor]}>
						<ViewForRightArrow
							style={[estyle.padding, estyle.borderBottom]}
							iconColor={Env.color.main}
							rightIcon={IconCall}
						>
							<View style={[estyle.fxRow]}>
								<Text style={[estyle.text, {textAlign: 'left'}]}>车主</Text>
								<Text style={[estyle.fx1,estyle.text, {color:Env.color.note, textAlign: 'right'}]}>小明</Text>
							</View>
						</ViewForRightArrow>
						<ViewForRightArrow
							style={[estyle.padding, estyle.borderBottom]}
							iconColor={Env.color.main}
							rightIcon={IconCall}
						>
							<View style={[estyle.fxRow]}>
								<Text style={[estyle.text, {textAlign: 'left'}]}>管理员</Text>
								<Text style={[estyle.fx1,estyle.text, {color:Env.color.note, textAlign: 'right'}]}>大毛</Text>

							</View>
						</ViewForRightArrow>
					</View>

					<Text style={[estyle.paddingTop, estyle.paddingLeft, estyle.marginFontBottom, estyle.text]}>驾驶司机</Text>
					<View style={[estyle.cardBackgroundColor]}>
						<ViewForRightArrow
							style={[estyle.padding, estyle.borderBottom]}
							iconColor={Env.color.main}
							rightIcon={IconCall}
						>
							<View style={[estyle.fxRow]}>
								<Text style={[estyle.text, {textAlign: 'left'}]}>主驾驶</Text>
								<Text style={[estyle.fx1,estyle.text, {color:Env.color.note, textAlign: 'right'}]}>小明</Text>
							</View>
						</ViewForRightArrow>
						<ViewForRightArrow
							style={[estyle.padding, estyle.borderBottom]}
							iconColor={Env.color.main}
							rightIcon={IconCall}
						>
							<View style={[estyle.fxRow]}>
								<Text style={[estyle.text, {textAlign: 'left'}]}>副驾驶</Text>
								<Text style={[estyle.fx1,estyle.text, {color:Env.color.note, textAlign: 'right'}]}>大毛</Text>
							</View>
						</ViewForRightArrow>
					</View>
					<Text style={[estyle.paddingTop, estyle.paddingLeft, estyle.marginFontBottom, estyle.text]}>行驶线路</Text>
					<View style={[estyle.cardBackgroundColor]}>
						<ViewForRightArrow
							style={[estyle.padding, estyle.borderBottom]}
						>
							<View style={[estyle.fxRow]}>
								<Text style={[estyle.text, {textAlign: 'left'}]}>北京-上海-美国-上海-北京</Text>
							</View>
						</ViewForRightArrow>
					</View>
				</ScrollView>
			</View>
		);
	}
}