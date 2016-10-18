/**
 * Created by cryst on 2016/10/16.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import Env from '../../../utils/Env';
import MyInfoId from './MyInfoId';
import MyInfoDriver from './MyInfoDriveType';
export default class MyInfo extends Component {
    goTo(page){
        this.props.router.push(page);
    }
    render() {
        return (
            <View style={styles.body}>
                <TopBanner {...this.props} title="我的资料"/>
                <View>
                    <ViewForRightArrow style={styles.item} onPress = {() => this.goTo(MyInfoId)}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.text,{flex:1}]}>身份证</Text><Text style={styles.text}>130528198809236098</Text>
                        </View>
                    </ViewForRightArrow>
                    <ViewForRightArrow style={styles.item} onPress = {() => this.goTo(MyInfoDriver)}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.text,{flex:1}]}>驾照类别</Text><Text style={styles.text}>未设置</Text>
                        </View>
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