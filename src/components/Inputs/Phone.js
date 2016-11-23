/**
 * Created by cryst on 2016/10/9.
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import LabelInput from '../LabelInput.android';
import Env from '../../utils/Env';
const emsg = Env.msg.form,
    pattern = Env.pattern;


export default class Phone extends Component {

    static Validate = LabelInput.Validate;
    validate = (isShowTip = true) => this.refs.textInput.validate(isShowTip);


    static defaultProps = {
        require: false
    };

    render() {

        let validates = [
            {pattern:pattern.phone, msg: emsg.phone.pattern}
        ];

        this.props.require && validates.unshift({require:true, msg:emsg.phone.require});

        return (
            <LabelInput  {...this.props} ref="textInput"
                         style={[this.props.style]}
                         keyboardType="phone-pad"
                         maxLength={11}
                         label="手机"
                         placeholder={this.props.placeholder || emsg.phone.placeholder}
                         validates={this.props.validates || validates}
            />
        );
    }
}