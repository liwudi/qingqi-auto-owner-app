/**
 * Created by ligj on 2016/10/09.
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';
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
const estyle = Env.style;

import AccountHome from './account-config/AccountHome';
import MyCar from '../home/my-car/MyCar';
import AboutUs from './AboutUs';
import MyInfo from './my-info/MyInfo';

import { userPic } from '../../services/UserService';

class UserCenterHome extends Component {

    constructor(props){
        super(props);
        this.userInfo = props.userStore.userInfo;
    }

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
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<View>
					<View style={[estyle.padding,estyle.fxRowCenter, {backgroundColor:Env.color.main}]}>
                        <Text style={[estyle.navTitle]}>我的</Text>
                    </View>
                    <ViewForRightArrow
                        activeOpacity={1}
                        style={[{backgroundColor:Env.color.main}]}
                        onPress = {() => this.goTo(AccountHome)}
                        iconColor='#FFF'
                    >
                        <View style={[estyle.fxRow]}>
                            <Image
                                style={{borderRadius:100,width:60,height:60,borderWidth:4 * Env.font.base,
                                    borderColor:Env.color.main}}
                                source={require('../../assets/images/driver.png')}
                            />
                            {/*<Image
                                style={{borderRadius:100,width:60,height:60,borderWidth:4 * Env.font.base,
                                    borderColor:'#85C7E7',}}
                                source={{uri: userPic()}}
                            />*/}
                            <View style={{justifyContent:'center',marginLeft:20 * Env.font.base}}>
                                <Text style={[estyle.articleTitle,styles.colorFFF]}>{this.userInfo.nickname || '未设置姓名'}</Text>
                                <Text style={[estyle.articleTitle,styles.colorFFF]}>{this.userInfo.mobile}</Text>
                            </View>
                        </View>
                    </ViewForRightArrow>
                    <ViewForRightArrow style={[estyle.marginTop]} onPress = {() => this.goTo(MyCar)}>
                        <Text style={estyle.text}>我的车辆</Text>
                    </ViewForRightArrow>
                    <ViewForRightArrow onPress = {() => this.goTo(MyInfo)}>
                        <Text style={estyle.text}>我的资料</Text>
                    </ViewForRightArrow>

                    <ViewForRightArrow style={[estyle.marginTop]}  onPress={this.checkUpdate}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={estyle.text}>版本更新</Text><
                            Text style={[estyle.text,{color:'red'}]}> new</Text>
                            <Text style={[estyle.text,estyle.fx1, {textAlign:'right'}]}>V1.0.1</Text>
                        </View>
                    </ViewForRightArrow>
                    <ViewForRightArrow onPress={this.clearCache}>
                        <Text style={estyle.text}>清除缓存</Text>
                    </ViewForRightArrow>
                    <ViewForRightArrow onPress = {() => this.goTo(AboutUs)}>
                        <Text style={estyle.text}>关于我们</Text>
                    </ViewForRightArrow>
				</View>
			</View>
		);
	}
}

export default connect(function (stores) {
    return {userStore: stores.userStore}
})(UserCenterHome);

const styles = StyleSheet.create({
    colorFFF :{
        color:'#FFF'
    }
	/*body:{
		flex:1,
		backgroundColor:Env.color.bg
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
    }*/
});