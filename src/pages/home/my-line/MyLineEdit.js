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
	ScrollView
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import * as Icons from '../../../components/Icons';
import Toast from '../../../components/Toast'
const estyle = Env.style;
import Env from '../../../utils/Env';
import {IconUser} from '../../../components/Icons'
import {IconTrash} from '../../../components/Icons'
import PageList from '../../../components/PageList';
import Alert from '../../../components/Modals/Alert';
import {routeInfo, routeCarList ,delCarRoute, deleteRoute, modifyRoute} from '../../../services/LineService';
import MyLineSetStart from './MyLineSetStart';
import MyLineSetEnd from './MyLineSetEnd';
import MyLineSetMaxSpeed from './MyLineSetMaxSpeed';
import MyLineSetOilwearLimit from './MyLineSetOilwearLimit';
import MyLineAddCarList from './MyLineAddCarList';
import MyLineSetPass from './MyLineSetPass';
export default class MyLineEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isPass:false,
			carList: false,
			renovate: false,
			alertCActive: false,
			passbyPoints:[]
		};
	}

	fetchData () {
		routeInfo(this.props.nav.routeId)
			.then((data)=>{
				this.setState(data);
				console.log(this.state)
			})
	};

	delCarRoute(carId) {
		delCarRoute(carId)
			.then(()=>{
				this.onRenovate();
			})
	}
	componentWillMount() {
		this.fetchData();
	}

	delPass(pass) {
		let opts={};
		routeInfo(this.props.nav.routeId)
			.then((data)=>{
				opts = data;
				opts.routeId = this.props.nav.routeId;
				opts.passbyPoints = JSON.stringify(pass);
				modifyRoute(opts)
					.then(()=>{
						Toast.show('删除途经点成功', Toast.SHORT);
						this.setState({passbyPoints: pass});
					})
					.catch((e)=>{
						Toast.show(e.message, Toast.SHORT);
					})
			})
			.catch((e)=>{
				Toast.show(e.message, Toast.SHORT);
			})
	}

	passVia(pass) {
		this.state.passbyPoints = pass;
		return pass.map((item, idx) => {
			return <View style={[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
				<View style={estyle.fx1}><Text>{item.pointName}</Text></View>
				<IconTrash onPress={()=>{
                        this.props.pass = pass.splice(idx,1);
                        this.delPass(this.props.pass);
                        this.forceUpdate();
                    }}/>
			</View>
		})
	}

	carList(){
		return <PageList
			style={estyle.fx1}
			reInitField={[this.state.renovate]}
			renderRow={(row) => {
                        return <View style={[estyle.fxRow,estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
                    <View style={estyle.fx1}>
                        <Text style={[estyle.articleTitle]}>{row.carCode}</Text>
                        <View style={[estyle.fxRow, estyle.fxRowCenter,estyle.paddingTop]}>
                            <IconUser color={Env.color.main}/>
                            <Text style={[estyle.note, estyle.marginLeft]}>主：</Text>
                            <Text style={[estyle.note, {color: Env.color.text}]}>{row.mainDriverName}</Text>
                            <Text style={[estyle.marginLeft]}>副：</Text>
                            <Text style={[estyle.note, {color: Env.color.text}]}>{row.subDriverName}</Text>
                        </View>
                    </View>
                    <View style={[estyle.paddingRight, estyle.fxCenter]}>
                        <IconTrash onPress={()=>{
                        this.delCarRoute(row.carId);
                    }}/>
                    </View>
                </View>;
                        }}
			fetchData={(pageNumber, pageSize) => {
                        return routeCarList(pageNumber,pageSize,this.props.nav.routeId)
                        }}
		/>
	}

	render() {
		const topRightView= () => {
			return (
				<View style={estyle.fxRow}>
					<Text onPress={()=>{this.setState({alertCActive:true})}}>删除</Text>
				</View>
			)
		};
		return (
			<View style={estyle.fx1}>
				<TopBanner {...this.props} title="编辑线路" rightView={ topRightView()}/>
				<ScrollView style={estyle.fx1}>
					<View style={[estyle.padding]}>
						<View style={estyle.paddingTop}><Text>起终点</Text></View>
						<View style={[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
							<View style={estyle.fx1}><Text>起点</Text></View>
							<Text style={[styles.noteBlue,estyle.paddingRight]}>{this.props.startPointName || this.state.startPointName}</Text>
							<Text style={styles.noteBlue} onPress={() => {
                                this.props.router.push(MyLineSetStart,{edit:true,routeId: this.state.routeid});
                            }}>点击设置</Text>
						</View>
						<View style={[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
							<Text style={estyle.fx1}>终点</Text>
							<Text style={[styles.noteBlue,estyle.paddingRight]}>{this.props.endPointName || this.state.endPointName}</Text>
							<Text style={styles.noteBlue} onPress={() => {
                                this.props.router.push(MyLineSetEnd,{edit:true,routeId: this.state.routeid,start:{}});
                            }}>点击设置</Text>
						</View>
						<View style={[estyle.paddingTop,estyle.fxRow]}>
							<View style={estyle.fx1}><Text>途径点</Text></View>
							<View style={estyle.paddingRight}><Icons.IconPlus onPress={() => {//this.state.passbyPoints
                            this.props.router.push(MyLineSetPass,{routeId:this.state.routeid, pass:this.state.passbyPoints});
                        }}/></View>
						</View>
						{this.passVia(this.props.pass || this.state.passbyPoints)}

						<View style={estyle.paddingTop}><Text>驾驶规定</Text></View>
						<View style={[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
							<View style={estyle.fx1}><Text>最高时速</Text></View>
							<Text style={[styles.noteBlue,estyle.paddingRight]}>{this.props.maxSpeed || this.state.maxSpeed + 'Km/h'}</Text>
							<Text style={styles.noteBlue} onPress={() => {
                                this.props.router.push(MyLineSetMaxSpeed,{routeId:this.state.routeid});
                            }}>点击设置</Text>
						</View>
						<View style={[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
							<View style={estyle.fx1}><Text>总油耗限制</Text></View>
							<Text style={[styles.noteBlue,estyle.paddingRight]}>{this.props.oilwearLimit || this.state.oilwearLimit + 'L'}</Text>
							<Text style={styles.noteBlue} onPress={() => {
                                this.props.router.push(MyLineSetOilwearLimit,{routeId:this.state.routeid});
                            }}>点击设置</Text>
						</View>
					</View>
					<View style={[estyle.padding,estyle.fxRow]}>
						<View style={estyle.fx1}><Text>设置车辆</Text></View>
						<View style={estyle.paddingRight}><Icons.IconPlus onPress={() => {
                            this.props.router.push(MyLineAddCarList,{routeId:this.state.routeid});
                        }}/></View>
					</View>
					{this.carList()}
				</ScrollView>
				<Alert visible={this.state.alertCActive}
					   title="删除线路"
					   confirmTitle="删除"
					   cancelTitle="再想想"
					   onConfirm={(()=>{
					       this.setState({alertCActive:false});
					       deleteRoute(this.props.nav.routeId)
					       .then(()=>{
					           Toast.show('删除成功', Toast.SHORT);
					           this.props.router.pop();
					       })
					       .catch((e)=>{
					           Toast.show(e.message, Toast.SHORT);
					       })
					   })}
					   onCancel={(()=>{this.setState({alertCActive:false})})}>
					删除线路，会将线路关联车辆信息一起删除，是否删除？
				</Alert>
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