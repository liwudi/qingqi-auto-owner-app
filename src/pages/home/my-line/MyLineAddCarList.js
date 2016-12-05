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
    TextInput,
    Alert
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import ConfirmButton from '../../../components/ConfirmButton';
import Env from '../../../utils/Env';
const estyle = Env.style;
import {IconUser, IconSearch} from '../../../components/Icons';
import PageList from '../../../components/PageList';
import Toast from '../../../components/Toast'
import {queryRouteAddCarList} from '../../../services/LineService';
import {setCarRoute} from '../../../services/LineService';
import BorderButton from '../../../components/BorderButton';
import LabelInput from '../../../components/LabelInput';


export default class MyLineAddCarList extends Component {
	constructor(props) {
		super(props);
		this.state = {
            searchKey: ''
		};
	}

	save() {
		this.props.router.pop({
			carList: true
		});
	}

	lineAddCar(carId, routeId) {

	    let _update = () => {
            setCarRoute({carId: carId, routeId: this.props.routeId})
                .then(()=>{
                    Toast.show('添加成功', Toast.SHORT);
                    this.props.update();
                    this.props.router.pop();
                })
                .catch((e)=>{
                    Toast.show(e.message, Toast.SHORT);
                })
        }

	    if(routeId){
            this.props.alert('提示',
                `该车已安排运营线路是否更新？`,
                [
                    {text: '更新', onPress: _update},
                    {text: '取消'}
                ]
            );
        }else{
            _update();
        }

	}
	isAdd(item) {
		if (!item.routeId || item.routeId != this.props.routeId) {
			return <BorderButton onPress={() => this.lineAddCar(item.carId, item.routeId)}>添加</BorderButton>;
		} else {
			return <Text>已添加</Text>;
		}
	}
	render() {

		const lineView= (item) => {
			if (!item.routeId) {
				return '无';
			} else {
				return <Text style={[estyle.note, {color: Env.color.main}]}>{item.startPointName}----{item.endPointName}</Text>
			}
		}

		const itemView= (item) => {
			return (
				<View style={[estyle.fxRow,estyle.fxRowCenter, estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
					<View style={estyle.fx1}>
						<Text style={[estyle.articleTitle]}>{item.carCode}</Text>
						<View style={[estyle.fxRow, estyle.fxRowCenter,estyle.paddingTop]}>
                            <IconUser color='#FEBEBE'/><Text> </Text>
                            <Text style={[estyle.note, estyle.marginRight,{color: Env.color.text}]}>{item.mainDriverName || '无'}</Text>
                            <IconUser color='#C4DFFE'/><Text> </Text>
                            <Text style={[estyle.note, {color: Env.color.text}]}>{item.subDriverName || '无'}</Text>
						</View>
						<Text style={[estyle.note,estyle.paddingTop]}>线路: {lineView(item)}</Text>
					</View>
                    {this.isAdd(item)}
				</View>
			)
		};
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="添加车辆"/>
				<LabelInput
					style = {[estyle.borderBottom,  estyle.marginBottom]}
					placeholder='请输入车牌号'
					labelSize="0"
					ref="key"
					rightView={<IconSearch color={Env.color.note}/>}
					onChangeText={(searchKey) => {this.setState({searchKey})}}/>
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