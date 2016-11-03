/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/19
 * Edit by wangyang  on 2016/10/31
 *
 * 车队管理员编辑
 */
import React, {Component} from "react";
import {Text, View, TextInput, ToastAndroid, Alert} from "react-native";
import Env from "../../../utils/Env";
import TopBanner from "../../../components/TopBanner";
import LabelInput from "../../../components/LabelInput";
import ConfirmButton from "../../../components/ConfirmButton";
import PhoneInput from "../../../components/Inputs/Phone";
import ManagerList from "./ManagerList";
import {modifyManager, deleteManager} from "../../../services/MotorcadeManagerService";

const estyle = Env.style;

export default class ManagerEdit extends Component {

	componentWillMount() {
		this.setState({...this.props, newPhone:this.props.phone});
	}

	/**
	 * 跳转到列表页面
	 */
	toListPage () {
		this.props.router.replace(ManagerList);
	}

	/**
	 * 根据是否已注册为app用户，渲染视图
	 */
	renderView () {
		if (this.state.registerStatus === 1) {//如果:已注册为app用户
			return this.renderView4Immutable();//不可修改视图
		} else {
			return this.renderView4Mutable();//可修改视图
		}
	}

	/**
	 * 如果:已注册为app用户,渲染不可修改视图
	 * @returns {XML}
	 */
	renderView4Immutable () {
		const topRightView= () => {
			return (
				<View style={estyle.fxRow}>
					<Text onPress={() => this.delete()}>删除</Text>
				</View>
			)
		};
		return (
			<View style = {estyle.fx1}>
				<TopBanner {...this.props} title="编辑管理员" rightView={ topRightView()}/>
				<View  style={[estyle.fxRowCenter]}>
					<LabelInput
						style = {[estyle.borderBottom]}
						label="姓名"
						labelSize="3"
						value={this.state.name}
					/>
					<LabelInput
						style = {[estyle.borderBottom]}
						label="电话"
						labelSize="3"
						value={this.state.phone}
					/>
					<View style={[estyle.fxRow,estyle.fxCenter,estyle.padding]}>
						<View style = {estyle.padding}>
							<ConfirmButton size="middle" onPress={() => this.call()}><Text>呼叫</Text></ConfirmButton>
						</View>
					</View>
				</View>
			</View>
		);
	}

	/**
	 * 如果:已注册为app用户,渲染可修改视图
	 * @returns {XML}
	 */
	renderView4Mutable () {
		return (
			<View style = {estyle.fx1}>
				<TopBanner {...this.props} title="编辑管理员" />
			<View  style={[estyle.fxRowCenter]}>
				<LabelInput
					style = {[estyle.borderBottom]}
					label="姓名"
					labelSize="3"
					value={this.state.name}
					ref="name"
					onChangeText={(name) => this.setState({name})}
					validates={[
						{require:true, msg:Env.msg.form.truename.require},
					]}
				/>
				<LabelInput
					style = {[estyle.borderBottom]}
					label="电话"
					labelSize="3"
					value={this.state.newPhone}
					ref="phone"
					onChangeText={(newPhone) => this.setState({newPhone:newPhone})}
					validates={[
						{require:true, msg:Env.msg.form.phone.require},
						{pattern:Env.pattern.phone, msg: Env.msg.form.phone.pattern}
					]}
				/>
				<View style={[estyle.fxRow,estyle.fxCenter,estyle.padding]}>
					<View style = {estyle.padding}>
						<ConfirmButton size="middle" onPress={() => this.call()}><Text>呼叫</Text></ConfirmButton>
					</View>
					<View style = {estyle.padding}>
						<ConfirmButton size="middle" onPress={() => this.modify()}><Text>保存</Text></ConfirmButton>
					</View>
				</View>
			</View>
				</View>
		);
	}

	/**
	 * 移除xxx的管理员权限
	 */
	delete () {
		Alert.alert('提示',
			`是否移除${this.props.name}的管理员权限？`,
			[
				{text: '确定', onPress: () => {
					deleteManager(this.state)
						.then(
							() => {
								ToastAndroid.show('删除成功', ToastAndroid.SHORT);
								setTimeout(() => {
									this.toListPage();
								},1000);
							}
						)
						.catch(
							(reason) => {
								ToastAndroid.show(reason.message, ToastAndroid.SHORT);
							}
						);
					}
				},
				{text: '取消'}
			]
		);
	}

	call () {
		Alert.alert("提示", `todo呼叫${this.state.phone}`);
	}

	/**
	 * 修改xxx的管理员权限
	 */
	modify () {
		if (!PhoneInput.Validate(this.refs)) {
			return;
		}
		Alert.alert('提示',
			`是否保存？`,
			[
				{text: '确定',
					onPress: () => {
						modifyManager(this.state)
							.then(() => {
								ToastAndroid.show('保存成功', ToastAndroid.SHORT);
								setTimeout(() => {
									this.toListPage();
								},1000);
							})
							.catch((reason) => {
								ToastAndroid.show(reason.message, ToastAndroid.SHORT);
							});
					}
				},
				{text: '取消'}
			]
		);
	}

	render() {
		return (
			<View>
				{this.renderView()}
			</View>
		);
	}
}
