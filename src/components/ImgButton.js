import React, {Component} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';

import Env from '../utils/Env';
const estyle = Env.style;
export default class ImgButton extends Component {
    _onPress() {
        this.props.onPress();
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={this._onPress.bind(this)}
                style={[estyle.fxCenter, estyle.cardBackgroundColor, estyle.fx1, estyle.borderRight, estyle.borderTop,{...this.props.style}]}>
                <View style={{alignItems: 'center'}}>
                    <Image source={this.props.src}
                           style={styles.image}/>
                    <View style={[{paddingTop:0}]}>
                        <Text style={[estyle.articleTitle]}>{this.props.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const size = Env.screen.width * .3333333333333 * .4;
const styles = StyleSheet.create({
    image: {
        width: size,
        height: size
    }
});

