import React, {Component} from 'react';
import {TouchableHighlight, TouchableOpacity, StyleSheet} from 'react-native';

export default class Button extends Component {
    render() {
        return (
            <TouchableOpacity activeOpacity={1} onPress={this._onPress.bind(this)} style={[styles.container, this.props.style]}>
                {this.props.children}
            </TouchableOpacity>
        );
    }

    _onPress() {
        (!this.props.disabled) && this.props.onPress && this.props.onPress();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
});
