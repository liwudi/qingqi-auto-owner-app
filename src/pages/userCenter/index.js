/**
 * Created by ligj on 2016/10/09.
 */

import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
    Image,
    ToastAndroid,
    Alert
} from 'react-native';

import ViewForRightArrow from '../../components/ViewForRightArrow';

import Env from '../../utils/Env';


import AccountHome from './account-config/AccountHome';
import MyCar from './my-car/MyCar';
import AppointmentList from './my-appointment/AppointmentList';
import AboutUs from './AboutUs';

export default class UserCenterHome extends Component {

    goTo(page){
        this.props.router.push(page);
    }

    checkUpdate(){
        ToastAndroid.show('暂无更新', ToastAndroid.SHORT);
    }

    clearCache(){
        Alert.alert(
            '提示',
            '是否要清除应用缓存？',
            [
                {text: '确定', onPress: () => {
                    ToastAndroid.show('缓存清除成功', ToastAndroid.SHORT);
                }},
                {text: '取消'}
            ]
        )
    }

	render() {
		return (
			<View style={styles.body}>
				<View>
					<View style={[styles.item,{backgroundColor:Env.color.main,alignItems:'center',borderBottomWidth:0,marginBottom:0}]}>
                        <Text style={[styles.text,styles.colorFFF,{fontSize:Env.font.articleTitle}]}>我的</Text>
                    </View>
                    <ViewForRightArrow
                        activeOpacity={1}
                        onPress = {() => this.goTo(AccountHome)}
                        style={[styles.item,{flexDirection:'row',backgroundColor:Env.color.main,paddingTop:0}]}
                        iconColor='#FFF'
                    >
                        <View style={[{flexDirection:'row'}]}>
                            <Image
                                style={{borderRadius:100,width:60,height:60,borderWidth:4 * Env.font.base,
                                    borderColor:'#85C7E7',}}
                                source={require('../../assets/images/icon-1.png')}
                            />
                            <View style={{justifyContent:'center',marginLeft:20 * Env.font.base}}>
                                <Text style={[styles.text,styles.colorFFF]}>孟非</Text>
                                <Text style={[styles.text,styles.colorFFF]}>1801010202303</Text>
                            </View>
                        </View>
                    </ViewForRightArrow>
                    <Text></Text>
                    <ViewForRightArrow style={styles.item} onPress = {() => this.goTo(MyCar)}>
                        <Text style={styles.text}>我的车辆</Text>
                    </ViewForRightArrow>
                    <ViewForRightArrow style={styles.item} onPress = {() => this.goTo(AppointmentList)}>
                        <Text style={styles.text}>我的预约</Text>
                    </ViewForRightArrow>
                    <Text></Text>
                    <ViewForRightArrow style={[styles.item,{flexDirection:'row'}]} onPress={this.checkUpdate}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.text}>版本更新</Text><
                            Text style={[styles.text,{color:'red'}]}> new</Text>
                            <Text style={[styles.text,{flex:1,textAlign:'right'}]}>V1.0.1</Text>
                        </View>
                    </ViewForRightArrow>
                    <ViewForRightArrow style={styles.item} onPress={this.clearCache}>
                        <Text style={styles.text}>清除缓存</Text>
                    </ViewForRightArrow>
                    <ViewForRightArrow style={styles.item} onPress = {() => this.goTo(AboutUs)}>
                        <Text style={styles.text}>关于我们</Text>
                    </ViewForRightArrow>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	body:{
		flex:1,
		backgroundColor:Env.color.bg
	},
    colorFFF :{
	    color:'#FFF'
    },
    item:{
	    paddingTop:20 * Env.font.base,
        paddingBottom:20 * Env.font.base,
        paddingLeft:30 * Env.font.base,
        // paddingBottom:30 * Env.font.base,
        borderBottomWidth:1 * Env.font.base,
        borderColor:'#e5e5e5',
        backgroundColor:'#FFF'
    },
    text:{
        fontSize:Env.font.text,
        color:Env.color.text
    }
});