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
import Env from '../../../utils/Env';
const estyle = Env.style;
import IntegralImage from "../../../components/IntegralImage";
import { queryScoreInfoList } from "../../../services/AccumulateService";
class IntegralDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            getScore:'0',
            userScore:'0',
            scoreList:[]
        }
    }
    componentDidMount(){
        this.getQueryScoreInfoListData();
    }
    getQueryScoreInfoListData(){
        queryScoreInfoList().then((data)=>{
            console.log(data);
            this.setState({
                getScore:data.scoreTotal,
                userScore:data.scoreUse,
                scoreList:data.list
            })
        })
    }
    render(){
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner
                    {...this.props}
                    title="积分详情"
                />
                <IntegralImage />
                <View style={[estyle.margin,estyle.cardBackgroundColor,estyle.fxRow,estyle.paddingVertical]}>
                    <View style={[estyle.fx1,estyle.fxColumnCenter]}>
                        <Text style={[estyle.marginLeft,estyle.articleTitle]}>本月</Text>
                    </View>
                    <View style={[estyle.fxRow,estyle.fx1]}>
                        <View><Text>获取：<Text style={[estyle.redText]}>{this.state.getScore}</Text></Text></View>
                        <View style={[estyle.marginLeft]}><Text>使用：<Text>{this.state.userScore}</Text></Text></View>
                    </View>
                </View>
                <ScrollView style={[estyle.cardBackgroundColor,estyle.marginHorizontal]}>

                    {
                        this.state.scoreList.map((item,index)=>{
                            return (
                                <View key={index} style={[estyle.marginHorizontal,estyle.fxRow,estyle.borderBottom, estyle.paddingVertical]}>
                                    <View style={[estyle.fx1]}>
                                        <Text style={[estyle.articleTitle]}>{item.taskName}</Text>
                                        <Text style={[estyle.note]}>{item.taskTime}</Text>
                                    </View>
                                    <View><Text style={[estyle.redText]}>{item.score > 0 ? '+'+item.score : item.score}</Text></View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}
export default IntegralDetail;

const styles = StyleSheet.create()