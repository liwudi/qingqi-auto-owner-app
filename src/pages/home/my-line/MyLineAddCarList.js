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
import ConfirmButton from '../../../components/ConfirmButton';
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
			searchKey: '',
			renovate: false
		};
	}

	save() {
		this.props.router.pop({
			carList: true
		});
	}

	onRenovate(){
		this.setState({renovate:!this.state.renovate});
	}

	lineAddCar(carId) {
		setCarRoute({carId: carId, routeId: this.props.routeId})
			.then(()=>{
				Toast.show('添加成功', Toast.SHORT);
				this.onRenovate();
			})
			.catch((e)=>{
				Toast.show(e.message, Toast.SHORT);
			})
	}
	isAdd(item) {
		console.log(item + "=========="+ item.routeId);
		if (typeof item.routeId == 'undefined' || item.routeId =='') {
			return <TouchableOpacity onPress={() => this.lineAddCar(item.carId)}>
				<Text>添加</Text>
			</TouchableOpacity>;
		} else {
			return <Text>已添加</Text>;
		}
	}
	render() {

		const lineView= (item) => {
			if (typeof item.routeId == 'undefined' || item.routeId =='') {
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
						<View style={[styles.add,estyle.paddingHorizontal]}>{this.isAdd(item)}</View>
					</View>
				</View>
			)
		};
		return (
			<View>
				<TopBanner {...this.props} title="添加车辆"/>
				<PageList
					style={estyle.fx1}
					reInitField={[this.state.searchKey,this.state.renovate]}
					renderRow={(row) => {
                        return itemView(row);
                        }}
					fetchData={(pageNumber, pageSize) => {
                        return queryRouteAddCarList(pageNumber,pageSize,this.state.searchKey)
                        }}
				/>
				<View style={[estyle.fxRow,estyle.cardBackgroundColor,estyle.fxCenter]}>
					<View style={estyle.padding}>
						<ConfirmButton size="small" onPress={this.save.bind(this)}>保存</ConfirmButton>
					</View>
				</View>
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