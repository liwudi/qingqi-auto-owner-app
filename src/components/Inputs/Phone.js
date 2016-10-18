/**
 * Created by cryst on 2016/10/9.
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import LabelInput from '../LabelInput';
import Env from '../../utils/Env';
const emsg = Env.msg.form;
export default class Phone extends Component {
    render() {
        return (
            <LabelInput
                style={[this.props.style]}
                keyboardType="numeric"
                label="手机"
                labelSize={this.props.labelSize}
                placeholder={emsg.phone.placeholder}
                onChangeText={this.props.onChangeText}
            />
        );
    }
}