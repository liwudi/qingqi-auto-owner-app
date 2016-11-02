import React, {Component} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';

import Env from '../utils/Env';
export default class ImgButton extends Component {
    _onPress() {
        this.props.onPress();
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={this._onPress.bind(this)}
                style={styles.container}>
                <View style={{alignItems: 'center'}}>
                    <Image source={this.props.src}
                           style={styles.image}/>
                    <Text style={styles.text}/>
                    <Text style={styles.text}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const width = Env.screen.width * .3333333333333,
    height = Env.screen.width * .3333333333333;
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        flex: 1,
        borderWidth: 0.5,
        borderColor: Env.color.line
    },
    image: {
        width: width * .4,
        height: height * .4
    },
    text: {
        fontSize: Env.font.articleTitle,
        color: Env.color.text,
        textAlign: 'center'
    }
});

