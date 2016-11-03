/**
 * Created by cryst on 2016/10/9.
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import LabelInput from '../LabelInput.android'
import CancelButton from '../../components/CancelButton.android';
import * as TYPES from '../../actions/types';

const reg = /^\d{6}$/;
export default class PhoneChkCode extends Component {

    static Validate = LabelInput.Validate;
    validate = (isShowTip = true) => this.refs.textInput.validate(isShowTip);

    onChangeText(value) {
        let vertify = reg.test(value),
            msg = value ? '短信验证码格式不正确' : null;
        this.props.onChangeText({
            value: value, vertify: vertify, msg: msg
        });
    }

    sendCode(){
        this.props.sendCode();
    }

    render() {
/*        let rightView = () => {
            let disable = this.props.sendCodeStatus.status === TYPES.SEND_CODE_ING || this.props.sendCodeStatus.status === TYPES.SEND_CODE_TIMEOUT;
            let text = this.props.sendCodeStatus.status === TYPES.SEND_CODE_ING ? '正在发送' : this.props.sendCodeStatus.status === TYPES.SEND_CODE_TIMEOUT ? `重新获取${this.props.sendCodeStatus.second}` : '获取验证码';
            return (<CancelButton size="small" disabled={disable} onPress={this.sendCode.bind(this)}>{text}</CancelButton>);
        };*/
        return (
            <LabelInput {...this.props} ref="textInput"
                        style={[this.props.style]}
                        keyboardType="numeric"
                        placeholder='请输入短信验证码'
                        label="验证码"
                        labelSize={this.props.labelSize || 3}
                        onChangeText={this.onChangeText.bind(this)}
            />
        );
    }
}
// export default connect(function(stores) {
//     return { sendCodeStatus: stores.modifyMobilesendCodeStatus }
// })(PhoneChkCode);