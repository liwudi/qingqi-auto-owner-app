/**
 * Created by cryst on 2016/10/11.
 */
/**
 * Created by cryst on 2016/10/11.
 */
import React, {Component} from 'react';
import {TouchableHighlight, View, Text, StyleSheet} from 'react-native';
import Modal from './Modal2';

import Env from '../../utils/Env';
const estyle = Env.style;

const color = Env.button.color.confirm;
export default class ModalAndroid extends Component {
    render() {
        return <Modal
            animationType={"fade"}
            transparent={true}
            isOpen={this.props.visible}
            onRequestClose={this.props.onClose}
            animationDuration={0}
            swipeToClose={false}
            style={[estyle.fxCenter]}
        >
                {this.props.children}
        </Modal>
    }
}