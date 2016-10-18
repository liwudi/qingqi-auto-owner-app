/**
 * Created by cryst on 2016/10/9.
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import LabelInput from '../LabelInput'
import CancelButton from '../../components/CancelButton';
import { connect } from 'react-redux'
import { UserActions } from '../../actions/index';

const reg = /^\d{6}$/;
class PhoneChkCode extends Component {
    onChangeText(value) {
        let vertify = reg.test(value),
            msg = value ? '短信验证码格式不正确' : null;
        this.props.onChangeText({
           value: value, vertify: vertify, msg: msg
        });
    }
    sendCode(){
        this.props.dispatch(UserActions.sendModifyMobileCode());
    }
    render() {
        let rightView = () => {
            let disable = this.props.sendCodeStore.status === 'doing' || this.props.sendCodeStore.status === 'timeout';
            let text = this.props.sendCodeStore.status === 'doing' ? '正在发送' : this.props.sendCodeStore.status === 'timeout' ? `重新获取${this.props.sendCodeStore.second}` : '获取验证码';
            return (<CancelButton size="small" disabled={disable} onPress={this.sendCode.bind(this)}>{text}</CancelButton>);
        };
        return (
            <LabelInput style={[this.props.style]}
                        keyboardType="numeric"
                        placeholder='请输入短信验证码'
                        label="验证码"
                        labelSize={this.props.labelSize}
                        onChangeText={this.onChangeText.bind(this)}
                        rightView = { rightView() }
            />
        );
    }
}
export default connect(function(stores) {
    return { sendCodeStore: stores.modifyMobileSendCodeStore }
})(PhoneChkCode);