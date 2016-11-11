/**
 * Created by cryst on 2016/10/9.
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

import Env from '../utils/Env';
const estyle = Env.style;
import {IconEye, IconEyeOff} from './Icons';
import Toast from '../components/Toast';

export default class LabelInput extends Component {

    static Types = {
        PASSWORD: 'password',
        NUMBER: 'number'
    };

    static Validate(refs){
        return Object.keys(refs).every((ref) => {
            return refs[ref].validate ? refs[ref].validate() : true;
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            eyeOff: true,
            value: this.props.defaultValue || ''
        }
    }

    validate(isShowTip = true){
        if(this.props.validates){
            return this.props.validates.every((validate) => {
                let isValidate = true;
                if(validate.require){
                    isValidate = !!this.state.value.trim();
                } else if(validate.pattern) {
                    isValidate = (new RegExp(validate.pattern).test(this.state.value));
                }
                !isValidate && isShowTip && Toast.show(validate.msg, Toast.SHORT);
                return isValidate;
            })
        }
        return true;
    }

    onChangeText(text){
        this.setState({value:text});
        this.props.onChangeText && this.props.onChangeText(text);
    }

    getLabelSize(){
        let size = +this.props.labelSize || 2;
        return this.props.label ? Env.font.text * (size + 1) : 0;
    }

    render() {

        let _renderRightView = () => {

            let rightView = [];

            if (this.props.type === LabelInput.Types.PASSWORD) {
                rightView.push(
                    <View key={0} style={[estyle.paddingLeft]}>
                        <Text onPress={() => this.setState({eyeOff: !this.state.eyeOff})}>
                            {this.state.eyeOff ? <IconEyeOff size={Env.font.articleTitle * 1.5}/> :
                                <IconEye size={Env.font.articleTitle * 1.5}/>}
                        </Text>
                    </View>
                )
            }

            if (this.props.rightView) {
                rightView.push(
                    <View key={1}>
                        {this.props.rightView}
                    </View>
                )
            }
            return rightView;
        };
        let _renderLeftView = () => {
            let leftView = [];
            if(this.props.label){
                leftView=
                    <View style={[{width: this.getLabelSize()}]}>
                        <Text style={[estyle.text,estyle.paddingVertical, {color: Env.color.important}]}>{this.props.label}</Text>
                    </View>
            }
            
            return leftView
        };

        return (
            <View style={[estyle.fxRow, estyle.fxCenter,
                estyle.cardBackgroundColor,
                estyle.paddingHorizontal,
                this.props.style]}>
                { _renderLeftView() }
                <TextInput
                    {...this.props}
                    underlineColorAndroid="transparent"
                    style={[estyle.fx1, estyle.text]}
                    secureTextEntry={this.props.type === 'password' && this.state.eyeOff === true}
                    placeholderTextColor={Env.color.note}
                    onChangeText={this.onChangeText.bind(this)}
                    defaultValue={this.state.value}
                />
                {_renderRightView().map((view) => view)}
            </View>
        );
    }
}