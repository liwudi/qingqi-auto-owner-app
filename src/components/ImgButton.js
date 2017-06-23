import React, {Component} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';

import Env from '../utils/Env';
const estyle = Env.style;
const basefont = Env.font.base;
export default class ImgButton extends Component {
    _onPress() {
        this.props.onPress();
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={this._onPress.bind(this)}
                style={[styles.box,estyle.fxCenter, estyle.cardBackgroundColor,estyle.borderRight, estyle.borderTop,{...this.props.style}]}>
                <View style={{alignItems: 'center'}}>
                    <Image source={this.props.src}
                           style={styles.image}/>
                    <View style={[estyle.paddingTop]}>
                        <Text style={[estyle.articleTitle,{color:this.props.gray?'#ccc':'#666'}]}>{this.props.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

//const size = Env.screen.width * .3333333333333 * .4;
const styles = StyleSheet.create({
    box:{
        width:180 * basefont,
        height:180 * basefont
    },
    image: {
        width: 80 * basefont,
        height: 80 * basefont
    }
});

