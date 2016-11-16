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
import SelectForContacts from '../../contacts/SelectForContacts';

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
		if (LabelInput.Validate(this.refs)) {
			addDriver(this.state)
				.then(()=>{
					ToastAndroid.show('添加成功', ToastAndroid.SHORT);
					this.timer=setTimeout(()=>{
						this.props.refresh();
						this.props.router.pop();
					},500)
				})
				.catch((e)=>{
					ToastAndroid.show(e.message, ToastAndroid.SHORT);
				})
		}
	}

	/**
	 * 组件销毁时调用
	 */
	componentWillUnmount() {
		clearTimeout(this.timer);
	}

    toAddForContacts(){
		this.props.router.push(SelectForContacts, {select: (name, phone) => {
			this.setState({
				name, phone
			})
		}});
    }

	render() {
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="添加司机"/>
                <TouchableOpacity onPress={this.toAddForContacts.bind(this)} style ={[estyle.fxRow,estyle.fxRowCenter,estyle.padding,estyle.cardBackgroundColor]}>
                    <Icons.IconAddressBook color={'#FFB30F'} size={Env.font.base * 60}/>
                    <View style = {estyle.fx1}>
                        <View style={{justifyContent:'center',marginLeft:20 * Env.font.base,flex:1}}>
                            <Text style={[{fontSize:Env.font.text, color:Env.color.main}]}>手机联系人</Text>
                            <Text style={[{fontSize:Env.font.note, color:Env.color.note}]}>添加手机通讯录中的司机</Text>
                        </View>
                    </View>
                    <View style={[estyle.padding,estyle.fxRow]}><Icons.IconFire size={Env.font.base * 30} color="red" /><Text style={{fontSize:Env.font.note, color:Env.color.main}}>推荐</Text></View>
                </TouchableOpacity>
				<View  style={[estyle.fxRowCenter,estyle.marginTop]}>
					<LabelInput
						style = {[estyle.borderBottom]}
						placeholder='请输入司机姓名'
						label="姓名"
						value={this.state.name}
						ref="name"
						onChangeText={name => this.setState({name})}
						validates={[{require:true, msg:"请输入司机姓名。"}]}
					/>
					<LabelInput
						style = {[estyle.borderBottom]}
						placeholder='请填写司机手机号'
						label="电话"
						value={this.state.phone}
						ref="phone"
						onChangeText={phone => this.setState({phone})}
						validates={[{require:true, msg:"请填写司机手机号。"}]}
					/>
					<View style={[estyle.fxRow, estyle.padding]}>
						<Text style={[estyle.text]}>&nbsp;</Text>
					</View>
					<ConfirmButton size="large" onPress={() => this.addDriver()}>保存</ConfirmButton>

				</View>
			</View>
		);
	}
}
