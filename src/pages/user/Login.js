/**
 * Created by ligj on 2016/9/23.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
    Text,
    View,
    ToastAndroid
} from 'react-native';

import {UserActions} from '../../actions/index';

import HomeRouter from '../HomeRouter';
import FindPassword from './FindPassword';

import TopBanner from '../../components/TopBanner';
import PhoneInput from '../../components/Inputs/Phone';
import PasswordInput from '../../components/Inputs/Password';
import ConfirmButton from '../../components/ConfirmButton';
import formValidator from '../../actions/formValidator';

import Env from '../../utils/Env';
const estyle = Env.style,
    emsg = Env.msg.form,
    pattern = Env.pattern;
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.vdata = {
            phone: {   //手机
                value: this.state.phone,
                require: emsg.phone.require,
                pattern: {
                    value: pattern.phone,
                    msg: emsg.phone.pattern
                }
            },
            password: {
                //密码
                value: this.state.password,
                require: emsg.password.require,
                pattern: {
                    value: pattern.password,
                    msg: emsg.password.pattern
                }

            }
        }
    }


    next = () => {
        this.props.router.replace(HomeRouter);
    };

    onLogin() {
        let result = formValidator.vd(this.vdata);
        if (result) {
            this.props.dispatch(UserActions.doLogin(this.formData, this.next));
        }
    }

    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="账号密码登录"/>
                <View style={[estyle.fxRowCenter]}>
                    <PhoneInput
                        style={[estyle.marginTop, estyle.borderBottom]}
                        onChangeText={phone => {
                            this.setState({phone});
                            this.vdata.phone.value = phone;
                        }}
                    />

                    <PasswordInput
                        style={[estyle.borderBottom]}
                        onChangeText={password => {
                            this.setState({password});
                            this.vdata.password.value = password;
                        }}
                    />

                    <View style={[estyle.fxRow, estyle.padding]}>
                        <Text style={[estyle.fx1, estyle.text, {textAlign: 'right'}]}
                              onPress={() => this.props.router.push(FindPassword)}>忘记密码</Text>
                    </View>
                    <ConfirmButton disabled={this.props.userStore.status === 'doing'} size="large"
                                   onPress={() => this.onLogin()}>登录</ConfirmButton>

                </View>
            </View>
        );
    }
}


export default connect(function (stores) {
    return {userStore: stores.userStore}
})(Login);