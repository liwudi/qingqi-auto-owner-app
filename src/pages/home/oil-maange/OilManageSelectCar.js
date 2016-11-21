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
import PageList from '../../../components/PageList';
import Env from '../../../utils/Env';
const estyle = Env.style;
import ListItem from '../../../components/ListItem';
import {statisOilwearForOneRoute} from '../../../services/AppService';
import BorderButton from '../../../components/BorderButton';

export default class OilManageCarList extends Component {
	constructor(props) {
		super(props);
		this.state={
			statisDate: '20161011', //this.props.date.format('YYYYMMDD'),// todo
			routeId: this.props.routeId
		}
	}

    select(carInfo){
		this.props.setCar(carInfo);
		this.props.router.pop();
	}

	render() {
		return (
			<View style={[estyle.fx1,estyle.containerBackgroundColor]}>
				<TopBanner
					{...this.props}
					title="选择车辆"
				/>
				<View style={estyle.fx1}>
					<PageList
						style={[estyle.cardBackgroundColor, estyle.fx1]}
						renderRow={(row) => {
							return (
								<ListItem left={row.carCode} right={<BorderButton onPress={() => this.select(row)}>选择</BorderButton>} />
							)
						}}
						fetchData={(pageNumber, pageSize) => {
							return statisOilwearForOneRoute(pageNumber, pageSize,this.state.routeId,this.state.statisDate)
						}}
					/>
				</View>
			</View>
		);
	}
}
