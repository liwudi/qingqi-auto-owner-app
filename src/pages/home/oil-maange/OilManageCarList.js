/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/25 油耗管理 车辆列表
 *  Edit by zhaidongyou on 2016/11/7 添加逻辑
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
import PageList from '../../../components/PageList';
import {statisOilwearForOneRoute} from '../../../services/AppService';
import OilManageSetMark from './OilManageSetMark';
import OilManageShowMark from './OilManageShowMark';
import BorderButton from '../../../components/BorderButton';

export default class OilManageCarList extends Component {
	constructor(props) {
		super(props);
		this.state={
			statisDate: '20161011', //this.props.date.format('YYYYMMDD'),// todo
			routeId: this.props.routeId
		}
	}

    toPage = (component, props = {}) => {
        this.props.router.push(component, {
			...props,
            routeId: this.props.routeId,
            date: this.props.date
		});
    }

	render() {
		return (
			<View style={[estyle.fx1,estyle.containerBackgroundColor]}>
				<TopBanner
					{...this.props}
					title="车辆列表"
					rightView={
						<View><BorderButton color="#FFF" onPress = {() => this.toPage(OilManageSetMark, {carInfo:this.carList[0]})}>设定标杆</BorderButton>
							<BorderButton color="#FFF" onPress = {() => this.toPage(OilManageShowMark)}>查看标杆</BorderButton>
						</View>
						}
				/>
				<View style={estyle.fx1}>
					<PageList
						style={[estyle.cardBackgroundColor, estyle.fx1]}
						renderRow={(list) => {
							return (
								<View style={[estyle.fxRow,estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
									<View style={estyle.fx1}>
										<View style={[estyle.fxRow,estyle.fxRowCenter]}>
											<Text style={[estyle.articleTitle]}>{list.carCode}</Text>
											<Text> </Text>
											{list.isStandard == 1 && <Icons.IconFlag style={{color: 'red'}} size={Env.font.base * 30}/>}
										</View>
										<View style={[estyle.fxRow, estyle.fxRowCenter,estyle.paddingTop]}>
											<IconUser color='#FEBEBE'/><Text> </Text>
											<Text style={[estyle.note, estyle.marginRight,{color: Env.color.text}]}>{list.mainDriver || '无'}</Text>
											<IconUser color='#C4DFFE'/><Text> </Text>
											<Text style={[estyle.note, {color: Env.color.text}]}>{list.subDriver || '无'}</Text>
										</View>
										<View style={[estyle.fxRow,estyle.paddingTop]}>
											<Text style={[estyle.note]}>平均油耗：<Text style={{color: Env.color.main}}>{list.avgOilwear || 0}</Text>L/100km </Text>
											<Text style={[estyle.note,estyle.paddingLeft]}>平均速度：<Text style={{color: Env.color.main}}>{list.avgSpeed || 0}</Text>km/h</Text>
										</View>

									</View>
								</View>
							)
						}}
						fetchData={(pageNumber, pageSize) => {
							return statisOilwearForOneRoute(pageNumber, pageSize,this.state.routeId,this.state.statisDate)
								.then(rs => {
									this.carList = rs.list;
									return rs;
								})
						}}
					/>
				</View>
			</View>
		);
	}
}
