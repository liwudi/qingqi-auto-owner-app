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
import Alert from '../../components/Modals/Alert';
import TopBanner from '../../components/TopBanner';
import LabelInput from '../../components/LabelInput';
import ConfirmButton from '../../components/ConfirmButton.android';
import PhoneInput from '../../components/Inputs/Phone';
import PasswordInput from '../../components/Inputs/Password';

import RegCheckCode from './RegCheckCode';
import QuickLogin from './QuickLogin';

import Env from '../../utils/Env';
const estyle = Env.style,
	emsg = Env.msg.form,
	pattern = Env.pattern;
import Button from '../../components/widgets/Button';
import Agreement from './Agreement';

class Reg extends Component {
	constructor(props){
		super(props);
		this.state = {
			phone:'15010053708',
            trueName:'刘小花',
			password:'123456',
            captcha:'',
            captchaImg: false,
			alertActive: false
		};
	}

	onChange(input){
		this.setState(input);
	}

	next = (regInfo) => {
		console.info(regInfo)
		this.props.router.replace(RegCheckCode, {regInfo});
    }

    phoneIsExist = () => {
		this.setState({alertActive: true});
	}

	toQuick() {
		console.info(this.props)
		this.setState({alertActive:false});
		this.props.router.replace(QuickLogin, {nav: {phone: this.state.phone}})
	}

	onReg(){
	    PhoneInput.Validate(this.refs) &&
        this.props.dispatch(UserActions.doRegCheckCaptcha(
	        this.state.phone,
            this.state.trueName,
            this.state.password,
            this.state.captcha,
            this.next,
			this.phoneIsExist
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

	    /*let captcha = () => {
	        if(this.state.captchaImg){
	            if(this.oldPhone !== this.state.phone){
                    this.oldPhone = this.state.phone;
                    this.imgCapthCache = <Image
                        style={[Env.vector.captcha.size]}
                        resizeMode={Image.resizeMode.cover}
                        source={{uri: getCaptcha(this.state.phone)}}
                    />;
                }

                return this.imgCapthCache;
            }else{
                return <View/>
            }
        }*/
		let captcha = () => {
			if(this.state.captchaImg){
				if(this.oldPhone !== this.state.phone){
					this.oldPhone = this.state.phone;
					/*this.imgCapthCache = <Image
						style={[Env.vector.captcha.size]}
						resizeMode={Image.resizeMode.cover}
						source={{uri: getCaptcha(this.state.phone)}}
					/>;*/
					this.oldPhone = this.state.phone;
					this.imgCapthCache = <Button onPress={() => {this.oldPhone = ''; this.onPhoneChange(this.state.phone);}}><Image
						style={[Env.vector.captcha.size]}
						resizeMode={Image.resizeMode.cover}
						source={{uri: getCaptcha(this.state.phone)}}
					/></Button>;
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
                        size="large"
                        onPress={() => this.onReg()}
                        disabled={this.props.regStore.status === TYPES.REG_STEP1_DOING}
                    >下一步
                    </ConfirmButton>
					<View style={[estyle.fxRow, {alignItems:'flex-start'}, estyle.paddingTop]}>
						<Text style={[estyle.note, {fontSize: Env.font.mini}]}>注册视为同意</Text>
						<Button onPress={()=>{this.props.router.push(Agreement)}}>
							<Text style={[{color:Env.color.main, fontSize: Env.font.mini}]}>服务条款和隐私政策</Text>
						</Button>
					</View>
				</View>
				<Alert visible={this.state.alertActive}
					   title="提示"
					   confirmTitle="快捷登录"
					   cancelTitle="取消"
					   onConfirm={(()=>{this.toQuick()})}
					   onCancel={(()=>{this.setState({alertActive:false})})}>
					该手机已被注册，您可以手机快捷登录！
				</Alert>
			</View>
		);
	}
}


export default connect(function(stores) {
	return { regStore: stores.regStore }
})(Reg);