/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/21
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
import PageList from '../../../components/PageList';
import Toast from '../../../components/Toast'
import BorderButton from '../../../components/BorderButton';
import {queryRouteList,setCarRoute} from '../../../services/LineService';
const estyle = Env.style;
export default class BoundLine extends Component {

	carBoundLine(routeId) {
		setCarRoute({carId: this.props.nav.carId, routeId: routeId})
			.then(()=>{
				Toast.show('绑定成功', Toast.SHORT);
                this.props.nav.backFun();
				this.props.doBack();
			})
			.catch((e)=>{
				Toast.show(e.message, Toast.SHORT);
			})
	}
	render() {
		const itemView= (item) => {
			return (
				<View style={[estyle.fxRow,estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
					<View style={[estyle.fx1]}>
						<Text style={styles.textBlue}>{item.stName}-----------------{item.etName}</Text>
						<View style={estyle.paddingTop}>
							<Text>活跃车辆数：{item.acitveCount}辆</Text>
							<Text>承运车辆数：{item.sumCount}辆</Text>
						</View>
					</View>
					<View style={[estyle.paddingRight, estyle.fxCenter]}>
                        <BorderButton onPress={() => this.carBoundLine(item.routeId)}>选择</BorderButton>
					</View>
				</View>
			)
		};
		return (
			<View style={[estyle.fx1,estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="绑定线路"/>
				<PageList
					style={estyle.fx1}
					renderRow={(row) => {
                        return itemView(row);
                        }}
					fetchData={(pageNumber, pageSize) => {
                        return queryRouteList(pageNumber,pageSize)
                        }}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	add: {
		borderRadius: 400,
		backgroundColor: Env.color.main,
	},
	textBlue:{
		fontSize:Env.font.articleTitle,
		color:Env.color.main
	}
});