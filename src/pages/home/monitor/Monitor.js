/**
 * Created by ligj on 2016/10/9.
 * Edit by yaocy on 2016/11/3
 */
import React, { Component } from 'react';
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

const estyle = Env.style;

export default class Monitor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			key: ''
		};
	}

	goToDetail(){

	}

	render() {
		return (
			<View style={estyle.fx1}>
				<TopBanner {...this.props} title="实时监控"/>
				<ViewForRightArrow rightIcon={IconSearch}>
					<LabelInput
						style = {[estyle.borderBottom]}
						placeholder='请输入司机姓名、VIN或车牌号'
						labelSize="0"
						ref="key"
						onChangeText={key => this.setState({key:key})}/>
				</ViewForRightArrow>
				<PageList
					style={estyle.fx1}
					reInitField={[this.state.key]}
					renderRow={(row) => {
						return <MyCarItem data={row} onPress={() => this.goToDetail(row.carId)}/>
					}}
					fetchData={(pageNumber, pageSize) => {
                        return queryRealTimeCarList(pageNumber,pageSize,this.state.key)
					}}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	noteBlue:{
		fontSize:Env.font.note,
		color:Env.color.main
	}
});