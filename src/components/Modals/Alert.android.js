/**
 * Created by cryst on 2016/10/11.
 */
import React, {Component} from 'react';
import {TouchableHighlight, View, Text, StyleSheet, Modal} from 'react-native';

import Env from '../../utils/Env';
import ModalBox from '../widgets/Modal.android';
import ConfirmButton from '../ConfirmButton.android'
import CancelButton from '../CancelButton.android';
const estyle = Env.style;
export default class ColorButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ModalBox visible={this.props.visible} onClose={this.props.onCancel} title="alert弹窗" style={[estyle.fxCenter]}>
                <View style={[estyle.cardBackgroundColor, {width:Env.font.base * 540, borderRadius: Env.font.base * 10}]}>
                    <Text style={[estyle.articleTitle, estyle.borderBottom, estyle.paddingVertical, {color:Env.color.auxiliary, textAlign:'center'}]}>{this.props.title || '温馨提示'}</Text>
                    <Text style={[estyle.text, estyle.marginHorizontal]}>{this.props.children}</Text>
                    <View style={[estyle.fxRow, estyle.fxCenter]}>
                        <ConfirmButton size="small" style={[estyle.margin]} onPress={this.props.onConfirm}>{this.props.confirmTitle || '确定'}</ConfirmButton>
                        <CancelButton size="small" style={[estyle.margin]} onPress={this.props.onCancel} >{this.props.cancelTitle||'取消'}</CancelButton>
                    </View>
                </View>
            </ModalBox>
        );
    }
}