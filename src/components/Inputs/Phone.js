/**
 * Created by cryst on 2016/10/9.
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import LabelInput from '../LabelInput.android';
import Env from '../../utils/Env';
const emsg = Env.msg.form;
export default class Phone extends Component {

    static Validate = LabelInput.Validate;
    validate = (isShowTip = true) => this.refs.textInput.validate(isShowTip);

    render() {
        return (
            <LabelInput  {...this.props} ref="textInput"
                style={[this.props.style]}
                keyboardType="numeric"
                label="手机"
                placeholder={this.props.placeholder || emsg.phone.placeholder}
            />
        );
    }
}