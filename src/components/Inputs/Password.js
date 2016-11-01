/**
 * Created by cryst on 2016/10/9.
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import LabelInput from '../LabelInput.android';
import Env from '../../utils/Env';

const emsg = Env.msg.form;

export default class Password extends Component {

    static Validate = LabelInput.Validate;
    validate = (isShowTip = true) => this.refs.textInput.validate(isShowTip);

    render() {
        return (
            <LabelInput {...this.props} ref="textInput"
                style={[this.props.style]}
                type="password"
                placeholder={this.props.placeholder || emsg.password.placeholder}
                label={this.props.label || "密码"}
                labelSize={this.props.labelSize}
                onChangeText={this.props.onChangeText}
                defaultValue={this.props.defaultValue}
            />
        );
    }
}