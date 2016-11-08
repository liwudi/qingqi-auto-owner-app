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
	 * 移除xxx的管理员权限
	 */
	delete () {
		if (this.state.registerStatus===0) {
			Alert.alert("提示", `用户【${this.state.name}】没有注册为APP用户，不能删除`);
			return;
		}
		Alert.alert('提示',
			`是否移除用户【${this.props.name}】的管理员权限？`,
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
		Alert.alert("提示", `【todo】呼叫${this.state.phone}`);
	}

	/**
	 * 修改xxx的管理员权限
	 */
	modify () {
		if (this.state.registerStatus===1) {
			Alert.alert("提示", `用户【${this.state.name}】已经注册为APP用户，不可以编辑`);
			return;
		}
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
		const topRightView= () => {
			return (
				<View style={estyle.fxRow}>
					<Text onPress={() => this.delete()}>删除</Text>
				</View>
			)
		};
		return (
			<View style = {estyle.fx1}>
				<TopBanner {...this.props} title="编辑管理员" rightView={ topRightView()} />
				<View  style={[estyle.fxRowCenter]}>
					<LabelInput
						style = {[estyle.borderBottom]}
						label="姓名"
						labelSize="3"
						defaultValue={this.state.name}
						ref="name"
						onChangeText={(name) => this.setState({name})}
						validates={[
							{require:true, msg:Env.msg.form.truename.require},
						]}
						editable={this.state.registerStatus===0}//如果:未注册为app用户，可以编辑
					/>
					<LabelInput
						style = {[estyle.borderBottom]}
						label="电话"
						labelSize="3"
						defaultValue={this.state.newPhone}
						ref="phone"
						onChangeText={(newPhone) => this.setState({newPhone:newPhone})}
						validates={[
							{require:true, msg:Env.msg.form.phone.require},
							{pattern:Env.pattern.phone, msg: Env.msg.form.phone.pattern}
						]}
						editable={this.state.registerStatus===0}//如果:未注册为app用户，可以编辑
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
}
