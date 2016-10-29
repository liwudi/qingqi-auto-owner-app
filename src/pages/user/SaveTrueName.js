/**
 * Created by ligj on 2016/9/23.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
	Text,
	TextInput,
	View,
	TouchableOpacity,
	ToastAndroid,
	StyleSheet
} from 'react-native';

import { UserActions } from '../../actions/index';
import HomeRouter from '../HomeRouter';
import TopBanner from '../../components/TopBanner';
import LabelInput from '../../components/LabelInput';
import ConfirmButton from '../../components/ConfirmButton.android';

import Env from '../../utils/Env';
const estyle = Env.style;
class SaveTrueName extends Component {
	constructor(props){
		super(props);
		this.formData = {username: {}};
	}
	next = () => {
		this.props.router.replace(HomeRouter);
	}
	onChange(input){
		this.setState(input);
	}

	onLogin() {
		if(this.vertify()) {
			this.props.dispatch(UserActions.doLogin(this.formData, this.next));
		}
	}
	vertify() {
		let data = this.formData;
		for(let k in data) {
			let v = data[k];
			if (!v.vertify) {
				v.msg && ToastAndroid.show(v.msg, ToastAndroid.SHORT);
				return false;
			}
		}
		return true;
	}

	setFromData(name, value) {
		this.formData[name] = {
			value: value,
			vertify: !!value
		};
	}

	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="手机快捷登录"/>
				<View style={[estyle.fxRowCenter]}>
					<LabelInput
						style={[estyle.marginTop, estyle.borderBottom]}
						label="姓名"
						placeholder="请输入真实改名"
						onChangeText={value => this.setFromData('username', value)}
					/>
					<View style={[estyle.marginBottom, estyle.fxRow, estyle.paddingHorizontal]}>
						<Text style={[estyle.note, estyle.fx1, {textAlign:'left'}]}>最长7个汉字，或14个字节</Text>
					</View>
					<ConfirmButton disabled={this.props.userStore.status === 'doing'}
								   size="large" onPress={() => this.onLogin()}>登录</ConfirmButton>
				</View>
			</View>
		);
	}
}

export default connect(function(stores) {
	return { userStore: stores.userStore }
})(SaveTrueName);