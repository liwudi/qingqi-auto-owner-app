/**
 * Created by cryst on 2016/10/9.
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import LabelInput from '../LabelInput';
import Env from '../../utils/Env';
const emsg = Env.msg.form;
export default class Password extends Component {
    render() {
        return (
            <LabelInput
                style={[this.props.style]}
                type="password"
                placeholder={emsg.password.placeholder}
                label="密码"
                labelSize={this.props.labelSize}
                onChangeText={this.props.onChangeText}
            />
        );
    }
}