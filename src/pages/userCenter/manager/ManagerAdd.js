/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou 2016/10/18
 * Edit by wangyang 2016/10/31
 *
 * 车队管理员添加
 */
import React, {Component} from "react";
import {Text, View, TextInput, ToastAndroid, Image, Alert, TouchableOpacity} from "react-native";
import Env from "../../../utils/Env";
import TopBanner from "../../../components/TopBanner";
import LabelInput from "../../../components/LabelInput";
import ConfirmButton from "../../../components/ConfirmButton";
import PhoneInput from "../../../components/Inputs/Phone";
import ManagerList from "./ManagerList";
import {addManager} from "../../../services/MotorcadeManagerService";
import ManagerAddForContacts from './ManagerAddForContacts';
import { IconAddressBook, IconFire } from '../../../components/Icons';


const estyle = Env.style;

export default class ManagerAdd extends Component {

	/**
	 * 跳转到列表页面
	 */
	toListPage() {
		this.props.router.replace(ManagerList);
	}

	toManagerAddForContacts(){
		this.props.router.push(ManagerAddForContacts);
	}

	submit() {
		if (!PhoneInput.Validate(this.refs)) {
			return;
		}
		Alert.alert('提示',
			'是否添加这个管理员？',
			[
				{text: '确定',
					onPress: () => {
						addManager(this.state)
							.then(() => {
								ToastAndroid.show('添加成功', ToastAndroid.SHORT);
								setTimeout(() => {
									this.toListPage();
								},1000);
							})
							.catch((reason) => {
								ToastAndroid.show(reason.message, ToastAndroid.SHORT);
							})
					}
				},
				{text: '取消'}
			]);
	}

	render() {
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="新增管理员"/>
				<TouchableOpacity onPress={this.toManagerAddForContacts.bind(this)} style ={[estyle.fxRow,estyle.fxRowCenter,estyle.padding,estyle.cardBackgroundColor]}>
					<IconAddressBook color={'#FFB30F'} size={Env.font.base * 60}/>
					<View style = {estyle.fx1}>
						<View style={{justifyContent:'center',marginLeft:20 * Env.font.base,flex:1}}>
							<Text style={[{fontSize:Env.font.text, color:Env.color.main}]}>手机联系人</Text>
							<Text style={[{fontSize:Env.font.note, color:Env.color.note}]}>添加手机通讯录中的司机</Text>
						</View>
					</View>
					<View style={[estyle.padding,estyle.fxRow]}><IconFire size={Env.font.base * 30} color="red" /><Text style={{fontSize:Env.font.note, color:Env.color.main}}>推荐</Text></View>
				</TouchableOpacity>
				<View style={[estyle.fxRowCenter,estyle.marginTop]}>
					<LabelInput
						ref="name"
						onChangeText={(name) => this.setState({name})}
						style = {[estyle.borderBottom]}
						placeholder={Env.msg.form.truename.placeholder}
						label="姓名"
						labelSize="3"
						validates={[
							{require:true, msg:Env.msg.form.truename.require},
						]}
					/>
					<LabelInput
						ref="phone"
						onChangeText={(phone) => this.setState({phone})}
						style = {[estyle.borderBottom]}
						placeholder={Env.msg.form.phone.placeholder}
						label="电话"
						labelSize="3"
						validates={[
							{require:true, msg:Env.msg.form.phone.require},
							{pattern:Env.pattern.phone, msg: Env.msg.form.phone.pattern}
						]}
					/>
					<ConfirmButton style={[estyle.marginVertical]} size="large" onPress={() => this.submit()}><Text>添加</Text></ConfirmButton>
				</View>
			</View>
		);
	}
}