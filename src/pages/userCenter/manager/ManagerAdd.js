/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou 2016/10/18
 * Edit by wangyang 2016/10/31
 *
 * 车队管理员添加
 */
import React, {Component} from "react";
import {Text, View, TextInput, Image, Alert, TouchableOpacity} from "react-native";
import Env from "../../../utils/Env";
import TopBanner from "../../../components/TopBanner";
import LabelInput from "../../../components/LabelInput";
import SubmitButton from "../../../components/SubmitButton";
import PhoneInput from "../../../components/Inputs/Phone";
import {addManager} from "../../../services/MotorcadeManagerService";
import SelectForContacts from '../../contacts/SelectForContacts';
import { IconAddressBook, IconFire } from '../../../components/Icons';
import Toast from '../../../components/Toast';


const estyle = Env.style;

const getBLen = function(str) {
    if (str == null) return 0;
    if (typeof str != "string"){
        str += "";
    }
    return str.replace(/[^\x00-\xff]/g,"01").length;
}

export default class ManagerAdd extends Component {

	// static propTypes = {
	// 	refresh: React.PropTypes.func.isRequired
	// }

	constructor(props){
		super(props);
		this.state = {
			name : '',
			phone : ''
		}
	}
	/**
	 * 跳转到列表页面
	 */
	toListPage() {
        this.props.refresh();
        this.props.router.pop();
	}

	toManagerAddForContacts(){
		this.props.router.push(SelectForContacts, {select: (name, phone) => {
			this.setState({
				name, phone
			})
		}});
	}

	_add(){
		addManager(this.state)
			.then(() => {
				Toast.show('添加成功', Toast.SHORT);
				setTimeout(this.toListPage.bind(this), 1000);
			})
			.catch((reason) => {
				Toast.show(reason.message, Toast.SHORT);
			})
	}

	submit() {
		if (!PhoneInput.Validate(this.refs)) {
			return;
		}
        if(getBLen(this.state.name) > 14){
            Toast.show('姓名不能超过7个汉字或14个字符', Toast.SHORT);
            return;
        }
		this.props.alert('提示',
			'是否添加这个管理员？',
			[
				{text: '确定', onPress: this._add.bind(this)},
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
						value={this.state.name}
						style = {[estyle.borderBottom]}
						placeholder={Env.msg.form.truename.placeholder}
						label="姓名"
						maxLength={14}
						validates={[
							{require:true, msg:Env.msg.form.truename.require},
						]}
					/>
					<PhoneInput
						ref="phone"
						value={this.state.phone}
						onChangeText={(phone) => this.setState({phone})}
						style = {[estyle.borderBottom]}
						placeholder={Env.msg.form.phone.placeholder}
						label="电话"
					/>
					<View style={[estyle.paddingVertical]} >
						<SubmitButton size="large" onPress={() => this.submit()}>添加</SubmitButton>
					</View>
				</View>
			</View>
		);
	}
}