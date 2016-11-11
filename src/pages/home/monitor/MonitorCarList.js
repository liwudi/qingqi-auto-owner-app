/**
 * Created by ligj on 2016/10/9.
 * Edit by yaocy on 2016/11/3
 */
import React, { Component,PropTypes } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity
} from 'react-native';
import Env from '../../../utils/Env';
import TopBanner from '../../../components/TopBanner';
import LabelInput from '../../../components/LabelInput';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import PageList from '../../../components/PageList';
import {IconSearch} from '../../../components/Icons';
import {queryRealTimeCarList} from '../../../services/MonitorService';
import MyCarItem from '../my-car/components/MyCarItem';
import MonitorMap from './MonitorMap';
import {IconMap} from '../../../components/Icons';
import Button from '../../../components/widgets/Button';
const estyle = Env.style;

export default class MonitorCarList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			key: ''
		};
	}

	goToMap(){
		this.props.toMap();
		///this.props.router.push(MonitorMap)
	}

	render() {
		return (
			<View style={estyle.fx1}>
				<TopBanner {...this.props} title="实时监控"/>
				<LabelInput
					style = {[estyle.borderBottom, estyle.marginBottom]}
					placeholder='请输入司机姓名、VIN或车牌号'
					labelSize="0"
					ref="key"
					rightView={<IconSearch color={Env.color.note}/>}
					onChangeText={key => this.setState({key:key})}/>
				<PageList
					style={estyle.fx1}
					reInitField={[this.state.key]}
					renderRow={(row) => {
						return <MyCarItem data={row} onPress={() => this.goToMap(row.carId)}/>
					}}
					fetchData={(pageNumber, pageSize) => {
						return queryRealTimeCarList(pageNumber,pageSize,this.state.key)
					}}
				/>
			</View>
		);
	}
}

MonitorCarList.PropTypes = {
	toMap: PropTypes.func.isRequired
};