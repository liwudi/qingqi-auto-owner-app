/**
 * Created by cryst on 2016/10/11.
 */
import React, {Component} from 'react';
import {TouchableHighlight, View, Text, StyleSheet, Modal} from 'react-native';

import Env from '../../utils/Env';
import ModalBox from '../widgets/Modal';
import ConfirmButton from '../ConfirmButton'
import CancelButton from '../CancelButton';
const estyle = Env.style;
export default class ColorButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ModalBox visible={this.props.visible} onClose={this.props.onClose} title="alert弹窗" style={[estyle.padding]}>
                <Text style={[estyle.text]}>{this.props.children}</Text>
                <View style={[estyle.fxRow, estyle.fxCenter, estyle.paddingTop]}>
                    <ConfirmButton size="small" onPress={this.props.onClose}>确定</ConfirmButton>
                    <View style={[estyle.paddingRight]}/>
                    <CancelButton size="small" onPress={this.props.onClose} >取消</CancelButton>
                </View>
            </ModalBox>
        );
    }
}