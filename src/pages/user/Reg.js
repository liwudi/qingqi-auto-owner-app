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
	StyleSheet,
    Image
} from 'react-native';

import {UserActions, TYPES} from '../../actions/index';

import { getCaptcha } from '../../services/UserService';

import TopBanner from '../../components/TopBanner';
import LabelInput from '../../components/LabelInput';
import ConfirmButton from '../../components/ConfirmButton.android';
import PhoneInput from '../../components/Inputs/Phone';
import PasswordInput from '../../components/Inputs/Password';

import RegCheckCode from './RegCheckCode';

import Env from '../../utils/Env';
const estyle = Env.style,
	emsg = Env.msg.form,
	pattern = Env.pattern;

class Reg extends Component {
	constructor(props){
		super(props);
		this.state = {
			phone:'13123222333',
            trueName:'哈哈哈哈',
			password:'123456',
            captcha:'',
            captchaImg: false
		};
	}

	onChange(input){
		this.setState(input);
	}

	next = (regInfo) => {
        this.props.router.replace(RegCheckCode, {regInfo});
        // console.log('jump to step2')
    }

	onReg(){
	    PhoneInput.Validate(this.refs) &&
        this.props.dispatch(UserActions.doRegCheckCaptcha(
	        this.state.phone,
            this.state.trueName,
            this.state.password,
            this.state.captcha,
            this.next
        ));
	}

	onPhoneChange(phone){
        phone && this.setState({phone});
        setTimeout(() => {
            if(this.refs.phone && this.refs.phone.validate(false)){
                this.setState({captchaImg:true});
            }else{
                this.setState({captchaImg:false});
            }
        },100);
    }

    componentDidMount(){
        this.onPhoneChange()
    }

    imgCapthCache = null;
    oldPhone = null;

	render() {

	    let captcha = () => {
	        if(this.state.captchaImg){
	            if(this.oldPhone !== this.state.phone){
                    this.oldPhone = this.state.phone;
                    this.imgCapthCache = <Image
                        style={{width:120,height:30}}
                        resizeMode={Image.resizeMode.cover}
                        source={{uri: getCaptcha(this.state.phone)}}
                    />;
                }

                return this.imgCapthCache;
            }else{
                return <View/>
            }
        }

		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="注册"/>
				<View  style={[estyle.fxRowCenter]}>
					<PhoneInput
						ref="phone"
                        defaultValue={this.state.phone}
						style={[estyle.marginVertical, estyle.borderBottom]}
						onChangeText={phone => this.onPhoneChange(phone)}
						validates={[
							{require:true, msg:emsg.phone.require},
							{pattern:pattern.phone, msg: emsg.phone.pattern}
						]}
						labelSize="3"
					/>

					<LabelInput
                        ref="trueName"
                        defaultValue={this.state.trueName}
						style = {[estyle.borderBottom]}
						onChangeText={trueName => this.setState({trueName})}
						placeholder='请输入真实姓名'
						label="姓名"
						labelSize="3"
						validates={[
							{require:true, msg:'请输入真实姓名'},
						]}
					/>


					<PasswordInput
						ref="password"
						defaultValue={this.state.password}
						style={[estyle.marginVertical, estyle.borderBottom]}
						onChangeText={password => this.setState({password})}
						validates={[
							{require:true, msg: emsg.password.require},
							{pattern:pattern.password, msg: emsg.password.pattern}
						]}
						labelSize="3"
					/>

					<LabelInput
                        ref="captcha"
						style = {[estyle.borderBottom]}
                        onChangeText={captcha => this.setState({captcha})}
						secureTextEntry={true}
						placeholder='图形验证码'
						label="验证码"
						labelSize="3"
						rightView={captcha()}
                        validates={[
                            {require:true, msg: '请填写图形验证码'}
                        ]}
					/>
					<View style={[estyle.fxRow, estyle.padding]}>
						<Text style={[estyle.text]}>&nbsp;</Text>
					</View>
					<ConfirmButton
                        style={[estyle.marginBottom]}
                        size="large"
                        onPress={() => this.onReg()}
                        disabled={this.props.regStore.status === TYPES.REG_STEP1_DOING}
                    >
                        <Text>下一步</Text>
                    </ConfirmButton>
					<View style={[estyle.fxRow, {alignItems:'flex-start'}]}>
						<Text style={[estyle.note]}>注册视为同意</Text>
						<Text style={[estyle.note, {color:Env.color.main}]}>服务条款和隐私政策</Text>
					</View>
				</View>
			</View>
		);
	}
}


export default connect(function(stores) {
	return { regStore: stores.regStore }
})(Reg);