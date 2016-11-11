/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/19
 * Edit by yaocy on 2016/10/31
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	TextInput,
	ToastAndroid,
	StyleSheet,
	Image
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import LabelInput from '../../../components/LabelInput';
import ConfirmButton from '../../../components/ConfirmButton';
import * as Icons from '../../../components/Icons';
import {addDriver} from '../../../services/MyDriverService';
import MyDriver from './MyDriver';
import MyDriverPhoneAdd from './MyDriverPhoneAdd';

const estyle = Env.style;
export default class MyDriverAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name:'',
			phone:''
		};
	}

	static Validate = LabelInput.Validate;
	validate = (isShowTip = true) => this.refs.textInput.validate(isShowTip);

	addDriver() {
		this.props.update();
		if (LabelInput.Validate(this.refs)) {
			addDriver(this.state)
				.then(()=>{
					ToastAndroid.show('添加成功', ToastAndroid.SHORT);
					this.timer=setTimeout(()=>{
						this.props.router.replace(MyDriver);
					},500)
				})
				.catch((e)=>{
					ToastAndroid.show(e.message, ToastAndroid.SHORT);
				})
		}
	}

	phoneAdd () {
		this.props.router.push(MyDriverPhoneAdd);
	}

	/**
	 * 组件销毁时调用
	 */
	componentWillUnmount() {
		clearTimeout(this.timer);
	}
	render() {
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="添加司机"/>
				<View  style={[estyle.fxRowCenter]}>
					<LabelInput
						style = {[estyle.borderBottom]}
						placeholder='请输入司机姓名'
						label="姓名"
						labelSize="3"
						ref="name"
						onChangeText={name => this.setState({name})}
						validates={[{require:true, msg:"请输入司机姓名。"}]}
					/>
					<LabelInput
						style = {[estyle.borderBottom]}
						placeholder='请填写司机手机号'
						label="电话"
						labelSize="3"
						ref="phone"
						onChangeText={phone => this.setState({phone})}
						validates={[{require:true, msg:"请填写司机手机号。"}]}
					/>
					<ConfirmButton style={[estyle.marginVertical]} size="large" onPress={() => this.addDriver()}><Text>保存</Text></ConfirmButton>
					<View style ={[estyle.fxRow,estyle.padding]}>
						<View>
							<Image
								style={{borderRadius:100,width:60,height:60,borderWidth:4 * Env.font.base,
									borderColor:'#85C7E7',}}
								source={require('../../../assets/images/icon-1.png')}
							/>
						</View>
						<View style = {{flex:1}}>
							<View style={{justifyContent:'center',marginLeft:20 * Env.font.base,flex:1}}>
								<Text style={[styles.textBlue,styles.colorFFF]} onPress={() => {this.phoneAdd()}}>手机联系人</Text>
								<Text style={[styles.note,styles.colorFFF]}>添加手机通讯录中的司机</Text>
							</View>
						</View>
						<View style={[estyle.padding,estyle.fxRow]}><Icons.IconUser /><Text style={styles.noteBlue}>推荐</Text></View>
					</View>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	body:{
		flex:1,
		backgroundColor:Env.color.bg
	},
	text:{
		fontSize:Env.font.text,
		color:Env.color.text
	},
	textBlue:{
		fontSize:Env.font.text,
		color:Env.color.main
	},
	note:{
		fontSize:Env.font.note,
		color:Env.color.note
	},
	noteBlue:{
		fontSize:Env.font.note,
		color:Env.color.main
	}
});