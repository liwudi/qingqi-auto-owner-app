/**
 * Created by liwd on 2017/6/13.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Image,
    TouchableOpacity
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import Env from '../../../utils/Env';
import {driverCarList, setCurrentCar} from '../../../services/AppService';
import Button from "../../../components/widgets/Button";
import SignButton from "./components/SignButton";
const estyle = Env.style;
const baseFontSize = Env.font.base;

class TaskItem extends Component{
    constructor(props){
        super(props);
    }
    renderIcon(){
        switch (this.props.title){
            case "每日签到":
                return <Image style={[styles.leftIcon]} source={require('../../../assets/images/task-1.png')}/>;
            case "论坛回帖":
                return <Image style={[styles.leftIcon]} source={require('../../../assets/images/task-2.png')}/>;
            case "论坛发帖":
                return <Image style={[styles.leftIcon]} source={require('../../../assets/images/task-3.png')}/>;
            case "陆鲸认证":
                return <Image style={[styles.leftIcon]} source={require('../../../assets/images/task-4.png')}/>;
            case "添加车辆":
                return <Image style={[styles.leftIcon]} source={require('../../../assets/images/task-5.png')}/>;
            case "服务预约" : case "服务评论":
                return <Image style={[styles.leftIcon]} source={require('../../../assets/images/task-6.png')}/>;
            case "用户注册":
                return <Image style={[styles.leftIcon]} source={require('../../../assets/images/task-7.png')}/>;
            default:
                return null;
        }
    }
    renderButton(param){
        if(this.props.type == "每日任务"){
            if(this.props.signFlg == 1){
                if(this.props.finishNum == this.props.totalNum){
                    return (
                        <View style={[estyle.fx1,estyle.fxCenter]}>
                            <Text style={[estyle.text,{color:'#aaa'}]}>{`(${this.props.finishNum}/${this.props.totalNum})`}</Text>
                            <SignButton style={[styles.signButton,{backgroundColor:"#aaa"}]}>
                                <Text style={[estyle.text,{color:Env.color.navTitle}]}>已完成</Text>
                            </SignButton>
                        </View>)
                }else{
                    return(
                        <View style={[estyle.fx1,estyle.fxCenter]}>
                            <Text style={[estyle.text,{color:Env.color.auxiliary}]}>{`(${this.props.finishNum}/${this.props.totalNum})`}</Text>
                            <SignButton style={[styles.signButton]} onClick={()=>{this.props.onClick(this.props.title)}}>
                                <Text style={[estyle.text,{color:Env.color.navTitle}]}>签到</Text>
                            </SignButton>
                        </View>
                    )
                }
            }else{
                return (
                <View style={[estyle.fx1,estyle.fxCenter]}>
                    <Text style={[estyle.text,{color:Env.color.auxiliary}]}>{`(${this.props.finishNum}/${this.props.totalNum})`}</Text>
                    <SignButton style={[styles.signButton]} onClick={()=>{this.props.onClick(this.props.title)}}>
                        <Text style={[estyle.text,{color:Env.color.navTitle}]}>去完成</Text>
                    </SignButton>
                </View>
                )
            }
        }else{
            if(this.props.title =="陆鲸认证"){
                return (
                    <SignButton style={[styles.signButton]} onClick={()=>{this.props.onClick(this.props.title)}}>
                        <Text style={[estyle.text,{color:Env.color.navTitle}]}>认证</Text>
                    </SignButton>
                )
            }else{
                return (
                    <SignButton style={[styles.signButton]} onClick={()=>{this.props.onClick(this.props.title)}}>
                        <Text style={[estyle.text,{color:Env.color.navTitle}]}>去完成</Text>
                    </SignButton>
                )
            }
        }
    }
    render(){
        let color = this.props.finishNum && this.props.totalNum && this.props.finishNum == this.props.totalNum ? '#aaa' : Env.color.integralButtonBg;
        return(
            <View style={[estyle.cardBackgroundColor,styles.largeHeight,estyle.marginTop,estyle.marginHorizontal,estyle.fxRow]}>
                <View style={[styles.leftIconContainer,estyle.fxCenter]}>
                    {
                        this.renderIcon(this.props.ruleName)
                    }

                </View>
                <View style={[estyle.fx1,estyle.fxColumn]}>
                    <View style={[styles.miniHeight,estyle.fxColumnCenter]}>
                        <Text style={[estyle.articleTitle, {color:Env.color.important}]}>{this.props.title}</Text>
                    </View>

                    <Text style={[estyle.note]}>{this.props.note}</Text>
                    <View style={[estyle.fxRow,estyle.fxRowCenter]}>
                        <Image style={[styles.IntegralIcon]} source={require("../../../assets/images/scoreActive.png")}/>
                        <Text style={[estyle.note,{color:color}]}>：+{this.props.score}</Text>
                        {
                            this.props.vip && this.props.vip.vipFlg == 1 ? <Text style={[estyle.note,{color:color}]}>{'x'+this.props.vip.multiple }</Text> : null
                        }
                    </View>
                </View>

                <View style={[styles.rightButtonContainer, estyle.fxCenter]}>
                        {this.renderButton()}
                </View>
            </View>
        )
    }
}

export default TaskItem;

const styles = StyleSheet.create({
    largeHeight:{
        height:Env.screen.height/7,
    },
    miniHeight:{
        height:Env.screen.height/14,
    },
    leftIconContainer:{
        width:Env.screen.height/7,
        height:Env.screen.height/7,
    },
    leftIcon:{
        width:Env.screen.height/14,
        height:Env.screen.height/14,
    },
    rightButtonContainer:{
        width:Env.screen.height/7,
        height:Env.screen.height/7,
    },
    rightButton:{
        width:Env.screen.height/8,
        height:Env.screen.height/25,
        backgroundColor:Env.color.integralButtonBg,
        borderRadius:5,
    },
    IntegralIcon:{
        width:Env.screen.height/40,
        height:Env.screen.height/40,
    },
    signButton:{
        width: baseFontSize * 160,
        height: baseFontSize * 72,
        borderRadius: baseFontSize * 10,
        backgroundColor:Env.color.auxiliary
    }
});
