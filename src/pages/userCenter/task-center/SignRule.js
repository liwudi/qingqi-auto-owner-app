/**
 * Created by liwd on 2017/6/14.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView
} from 'react-native';

import Env from '../../../utils/Env';
const estyle = Env.style;
import TopBanner from '../../../components/TopBanner';
import Circle from "./components/Circle";

import { queryScoreExplain } from "../../../services/AccumulateService";
class SignRule extends Component{
    constructor(props){
        super(props);
        this.state = {
            rules:null
        }
    }
    componentDidMount(){
        this.getQueryScoreExplainData();
    }
    getQueryScoreExplainData(){
        queryScoreExplain(3).then((data)=>{
            this.setState({
                rules:data.scoreExplain
            })
        }).catch(error=>{
            console.log(error)
        })
    }
    render(){
        return (
            <View style={[estyle.fx1,estyle.containerBackgroundColor]}>
                <TopBanner
                    {...this.props}
                    title="签到规则"
                />
                <View style={[estyle.fxRow,estyle.fxRowCenter, estyle.marginHorizontal, styles.circleContainer, {justifyContent:"space-between"}]}>
                    <Circle/>
                    <Circle/>
                </View>
                <View style={[estyle.fxCenter,estyle.marginHorizontal, styles.titleRuleHeight,styles.borderSet,estyle.paddingBottom]}>
                    <Text style={[{color:Env.color.integralButtonBg,fontSize:Env.font.base*40}]}>规则</Text>
                </View>
                <ScrollView style={[estyle.marginHorizontal,estyle.paddingVertical]}>
                    <Text style={[estyle.text]}>{this.state.rules}</Text>
                </ScrollView>

            </View>
        )
    }
}
export default SignRule;
const styles = StyleSheet.create({
    circleContainer:{
        height:Env.font.base * 50
    },
    titleRuleHeight:{
        height:Env.font.base * 70
    },
    borderSet:{
        borderBottomWidth:1,

        borderBottomColor:Env.color.integralButtonBg,
        borderStyle:"dashed",
    },
    myCircle:{
        backgroundColor:Env.color.note,
        width:Env.font.base * 20,
        height:Env.font.base * 20,
        borderRadius:Env.font.base * 10,
        borderColor:Env.color.note,
        borderWidth:Env.font.base,
        marginTop:Env.font.base * 10
    },
});