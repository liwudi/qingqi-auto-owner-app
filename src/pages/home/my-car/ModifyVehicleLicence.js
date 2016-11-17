import React, { Component } from 'react';
import {modifyCar} from '../../../services/AppService';

import {
	Text,
	TextInput,
	View,
	TouchableOpacity,
	ToastAndroid,
	StyleSheet
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import LabelInput from '../../../components/LabelInput';
import ConfirmButton from '../../../components/ConfirmButton';

import Env from '../../../utils/Env';
const estyle = Env.style,
	emsg = Env.msg.form,
	pattern = Env.pattern;
export default class ModifyVehicleLicence extends Component {
	constructor(props){
		super(props);
		this.carCode = this.props.nav.carCode;
	}
	static Validate = LabelInput.Validate;
	validate = (isShowTip = true) => this.refs.textInput.validate(isShowTip);


	save() {
		// if(this.props.nav.carCode === this.carCode) {
		// 	this.goBack();
		// 	return;
		// }
		if (LabelInput.Validate(this.refs)) {
			modifyCar(this.props.nav.carId,this.carCode, this.props.nav.carCode) //参数旧车牌号也要传递
				.then(this.success.bind(this));
		}

	}
	goBack() {
		this.props.nav.backFuns.forEach((item)=>{
            item();
        });
		this.props.doBack();
	}
	setFromData(value) {
		this.carCode = value;
	}
	success() {
		console.info(arguments)
		this.goBack();
	}
	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="修改车牌号"/>
				<View style={[estyle.fxRowCenter]}>
					<LabelInput
						ref="carCode"
						style={[estyle.marginTop, estyle.borderBottom]}
						label="车牌号"
						labelSize={3}
						placeholder={emsg.carCode.placeholder}
						onChangeText={value => this.setFromData(value)}
						defaultValue={this.props.nav.carCode}
						validates={[
							{require:true, msg:emsg.carCode.require},
							{pattern:pattern.carCode, msg: emsg.carCode.pattern}
						]}
					/>
					<View style={[estyle.fxRow, estyle.padding]}>
						<Text style={[estyle.text]}>&nbsp;</Text>
					</View>
					<ConfirmButton size="large" onPress={this.save.bind(this)}>确定</ConfirmButton>
				</View>
			</View>
		);
	}
}