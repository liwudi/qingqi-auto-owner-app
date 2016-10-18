/**
 * Created by cryst on 2016/10/11.
 */
/**
 * Created by cryst on 2016/10/11.
 */
import React, {Component} from 'react';
import {TouchableHighlight, View, Text, StyleSheet, Modal} from 'react-native';

import Env from '../../utils/Env';
const estyle = Env.style;

const color = Env.button.color.confirm;
export default class ColorButton extends Component {
    render() {
        return <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.props.visible}
            onRequestClose={this.props.onClose}
        >
            <View style={[estyle.fx1, estyle.fxCenter, {backgroundColor: Env.color.modalBg}]}>
                <View style={[estyle.cardBackgroundColor, this.props.style]}>
                    {this.props.children}
                </View>
            </View>
        </Modal>
    }


}