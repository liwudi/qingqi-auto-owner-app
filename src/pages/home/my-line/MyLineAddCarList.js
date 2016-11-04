/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/20
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
    TextInput
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import * as Icons from '../../../components/Icons';
import Env from '../../../utils/Env';
const estyle = Env.style;
import {IconUser} from '../../../components/Icons';
import PageList from '../../../components/PageList';
import Toast from '../../../components/Toast'
import {queryRouteAddCarList} from '../../../services/LineService';
import {setCarRoute} from '../../../services/LineService';
export default class MyLineAddCarList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchKey: ''
		};
	}

	lineAddCar(carId) {
		setCarRoute({carId: carId, routeId: this.props.routeId})
			.then(()=>{
				Toast.show('添加成功', Toast.SHORT);
			})
			.catch((e)=>{
				Toast.show(e.message, Toast.SHORT);
			})
	}
	render() {
		const isAdd= (item) => {
			if (item.routeId =='') {
				return <Text onPress={this.lineAddCar(item.carId)}>添加</Text>;
			} else {
				return <Text>已添加</Text>;
			}
		}

		const lineView= (item) => {
			if (item.routeId =='') {
				return '无';
			} else {
				return <Text style={[estyle.note, {color: Env.color.main}]}>{item.startPointName}----{item.endPointName}</Text>
			}
		}

		const itemView= (item) => {
			return (
				<View style={[estyle.fxRow,estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
					<View style={estyle.fx1}>
						<Text style={[estyle.articleTitle]}>{item.carCode}</Text>
						<View style={[estyle.fxRow, estyle.fxRowCenter,estyle.paddingTop]}>
							<IconUser color={Env.color.main}/>
							<Text style={[estyle.note, estyle.marginLeft]}>主：</Text>
							<Text style={[estyle.note, {color: Env.color.text}]}>{item.mainDriverName}</Text>
							<Text style={[estyle.marginLeft]}>副：</Text>
							<Text style={[estyle.note, {color: Env.color.text}]}>{item.subDriverName}</Text>
						</View>
						<Text style={[estyle.note,estyle.paddingTop]}>线路:{lineView(item)}</Text>
					</View>
					<View style={[estyle.paddingRight, estyle.fxCenter]}>
						<View style={[styles.add,estyle.paddingHorizontal]}>{isAdd(item.routeId)}</View>
					</View>
				</View>
			)
		};
		return (
			<View>
				<TopBanner {...this.props} title="添加车辆"/>
				<PageList
					style={estyle.fx1}
					reInitField={[this.state.searchKey]}
					renderRow={(row) => {
                        return itemView(row);
                        }}
					fetchData={(pageNumber, pageSize) => {
                        return queryRouteAddCarList(pageNumber,pageSize,this.state.searchKey)
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
	}
});