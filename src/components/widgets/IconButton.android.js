import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Env from '../../utils/Env';

export default class IconButton extends Component {
  render() {
  	const _size = this.props.size || Env.font.note;
    const _color = this.props.color || Env.color.text;
    return (
        <View style={[styles.container]} >
	        <Icon name={this.props.iconName} size={_size + 20} color={_color} />
	        <Text style={{fontSize:_size , color:_color, marginTop:-6 * Env.font.base}} >{this.props.title}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
