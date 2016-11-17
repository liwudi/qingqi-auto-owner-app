/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import MapLine from '../../../components/MapLine';
import { IconArrowDown, IconQuestion } from '../../../components/Icons';
import BorderButton from '../../../components/BorderButton';

import OilManageSelectCar from './OilManageSelectCar';

import Env from '../../../utils/Env';
const estyle = Env.style;


export default class OilManageSetMark extends Component {
	constructor(props){
		super(props);
		console.log(props);
	}

    selectCar(){
		this.props.router.push(OilManageSelectCar, {
			routeId: this.props.routeId,
            date: this.props.date
		})
	}

	render() {
		return (
			<View style={[estyle.containerBackgroundColor,estyle.fx1]}>
				<TopBanner
					{...this.props}
					//title={this.props.carInfo.carCode}
					titleView={
						<TouchableOpacity onPress={this.selectCar.bind(this)} style={[estyle.fx1,estyle.fxRow,estyle.fxRowCenter,{backgroundColor:'transparent'}]}>
							<Text style={[estyle.articleTitle, {color:'#FFF'}]}>{this.props.carInfo.carCode}</Text><IconArrowDown color="#FFF"/>
						</TouchableOpacity>
					}
				/>
				<MapLine
					style={[estyle.fx1]}
					topView={<View>
						<View style={[
							estyle.padding,
							estyle.borderTop,
							estyle.borderBottom,
							estyle.fxRow
						]}>
							<Text style={[estyle.text, estyle.fx1]}>设定时间：</Text>
							<BorderButton style={{marginRight:Env.font.base*6}}>前一天</BorderButton>
							<BorderButton style={{marginRight:Env.font.base*6}}>前三天</BorderButton>
							<BorderButton style={{marginRight:Env.font.base*6}}>前七天</BorderButton>
							<BorderButton>自定义</BorderButton>
						</View>
						<View style={[
                            estyle.padding,
                            estyle.borderBottom,
                            estyle.fxRow,
							estyle.fxRowCenter
                        ]}>
							<Text style={estyle.fx1}> </Text>
							<Text style={[estyle.text, {color:Env.color.main}]}>设为标杆 </Text>
							<IconQuestion color={Env.color.main} size={Env.font.text * 1.5}/>
						</View>
					</View>}
				/>
			</View>
		);
	}
}