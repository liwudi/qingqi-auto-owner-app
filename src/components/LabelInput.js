/**
 * Created by cryst on 2016/10/9.
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

import Env from '../utils/Env';
const estyle = Env.style;
import {IconEye, IconEyeOff} from './Icons';


export default class LabelInput extends Component {

    static Types = {
        PASSWORD: 'password',
        NUMBER: 'number'
    };

    constructor(props) {
        super(props);
        this.state = {
            eyeOff: true
        }
    }

    getLabelSize(){
        let size = +this.props.labelSize || 2;
        return Env.font.text * (size + 1);
    }
    render() {

        let _renderRightView = () => {

            let rightView = [];

            if (this.props.type === LabelInput.Types.PASSWORD) {
                rightView.push(
                    <View key={0} style={[estyle.paddingHorizontal]}>
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
        }

        return (
            <View style={[estyle.fx1, estyle.fxRow, estyle.fxCenter,
                estyle.cardBackgroundColor,
                estyle.paddingHorizontal,
                this.props.style]}>
                <View style={[{width: this.getLabelSize(), paddingVertical:Env.font.base * 30}]}>
                    <Text style={[estyle.text, {color: Env.color.important}]}>{this.props.label}</Text>
                </View>
                <TextInput
                    keyboardType={this.props.keyboardType}
                    underlineColorAndroid="transparent"
                    autoFocus={this.props.autoFocus}
                    style={[estyle.fx1, estyle.text, {padding: 0}]}
                    secureTextEntry={this.props.type === 'password' && this.state.eyeOff === true}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={Env.color.note}
                    onChangeText={this.props.onChangeText}
                />
                {_renderRightView().map((view) => view)}
            </View>
        );
    }
}