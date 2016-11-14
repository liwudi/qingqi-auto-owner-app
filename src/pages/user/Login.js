/**
 * Created by ligj on 2016/9/23.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
    Text,
    View,
    ToastAndroid,
    Image
} from 'react-native';

import {UserActions, TYPES} from '../../actions/index';

import HomeRouter from '../HomeRouter';
import FindPassword from './FindPassword';

import TopBanner from '../../components/TopBanner.android';
import PhoneInput from '../../components/Inputs/Phone';
import PasswordInput from '../../components/Inputs/Password';
import ConfirmButton from '../../components/ConfirmButton';
import LabelInput from '../../components/LabelInput';
import ModifyTrueName from '../userCenter/account-config/ModifyTrueName';

import { getCaptcha, CAPTCHA_TYPE_LOGIN } from '../../services/UserService';

import Env from '../../utils/Env';
const estyle = Env.style,
    emsg = Env.msg.form,
    pattern = Env.pattern;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone:'13466582379',
            password:'123456',
            captchaImg: false,
            haveCaptcha: false
        };

    }

    next = (userInfo) => {
        //this.props.router.replace(HomeRouter);
        this.props.router.resetTo(userInfo.name ? HomeRouter : ModifyTrueName);
    }


    onLogin() {
        if (PhoneInput.Validate(this.refs)) {
            this.state.haveCaptcha && setTimeout(this.getCaptcha,500);
            this.props.dispatch(UserActions.doLogin(this.state, this.next));
        }
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


    getCaptcha = () =>{
        this.imgCapthCache = <Button onPress={() => {this.oldPhone = ''; this.onPhoneChange(this.state.phone);}}><Image
                        style={[Env.vector.captcha.size]}
                        resizeMode={Image.resizeMode.cover}
                        source={{uri: getCaptcha(this.state.phone)}}
                    /></Button>;
                    
    /*    this.imgCapthCache = <Image
            style={{width:120,height:30}}
            resizeMode={Image.resizeMode.cover}
            onPress={this.getCaptcha}
            source={{uri: getCaptcha(this.state.phone, CAPTCHA_TYPE_LOGIN)}}
        />;*/
    }


    render() {
        const captcha = () => {
            if(this.state.captchaImg){
                if(this.oldPhone !== this.state.phone){
                    this.oldPhone = this.state.phone;
                    this.getCaptcha();
                }
                return this.imgCapthCache;
            }else{
                return <View/>
            }
        }

        const _renderCaptcha = ()=>{
            if(this.props.userStore.error && this.props.userStore.error.code === 1017 || this.state.haveCaptcha){
                this.state.haveCaptcha = true;
                return <LabelInput
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
            }
        }

        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="账号密码登录" leftShow={false}/>
                <View style={[estyle.fxRowCenter]}>
                    <PhoneInput
                        ref="phone"
                        defaultValue={this.state.phone}
                        style={[estyle.marginTop, estyle.borderBottom]}
                        onChangeText={phone => this.onPhoneChange(phone)}
                        validates={[
                            {require:true, msg:emsg.phone.require},
                            {pattern:pattern.phone, msg: emsg.phone.pattern}
                        ]}
                    />

                    <PasswordInput
                        ref="password"
                        defaultValue={this.state.password}
                        style={[estyle.borderBottom]}
                        onChangeText={password => this.setState({password})}
                        validates={[
                            {require:true, msg: emsg.password.require},
                            {pattern:pattern.password, msg: emsg.password.pattern}
                        ]}
                    />

                    {_renderCaptcha()}

                    <View style={[estyle.fxRow, estyle.padding]}>
                        <Text style={[estyle.fx1, estyle.text, {textAlign: 'right', color: Env.color.note}]}
                              onPress={() => this.props.router.push(FindPassword)}>忘记密码</Text>
                    </View>
                    <ConfirmButton disabled={this.props.userStore.status === TYPES.LOGGED_DOING} size="large"
                                   onPress={() => this.onLogin()}>登录</ConfirmButton>

                </View>
            </View>
        );
    }
}


export default connect(function (stores) {
    return {userStore: stores.userStore}
})(Login);