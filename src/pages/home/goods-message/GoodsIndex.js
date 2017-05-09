/**
 * Created by linyao on 2017/5/4.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import GoodsMessage from './GoodsMessage';
import GoodsFollow from './GoodsFollow';
const estyle = Env.style;
const basefont = Env.font.base;

export  default class CountIndex extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currntPage : this.props.index || 1
        }
    }
    select(idx){
        this.setState({currntPage:idx});
    }
    renderView(){
        return (
            <View style={[estyle.fxCenter,estyle.fx1]}>
                <View style={[estyle.fxRow,estyle.fxCenter]}>
                    <TouchableOpacity onPress={()=>{this.select(1)}} style={[estyle.fxCenter,styles.box,styles.leftBox,{backgroundColor: this.state.currntPage === 1 ? '#fff' : Env.color.main}]}>
                        <Text style={[estyle.articleTitle,{color: this.state.currntPage === 1 ? Env.color.main : '#fff' }]} >找货</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.select(2)}} style={[estyle.fxCenter,styles.box,styles.rightBox,{backgroundColor: this.state.currntPage === 1 ? Env.color.main : '#fff'}]}>
                        <Text style={[estyle.articleTitle,{color: this.state.currntPage === 1 ? '#fff' : Env.color.main}]} >配货</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    renderMain(){
        let Comp = this.state.currntPage === 1 ? GoodsMessage : GoodsFollow;
        return <Comp {...this.props} />
    }
    render(){
        return(
            <View style={[estyle.containerBackgroundColor,estyle.fx1]}>
                <TopBanner {...this.props} titleView={
                    this.renderView()
                }/>
                {this.renderMain()}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    box:{
        borderWidth : 2 * basefont,
        borderColor: '#fff',
        paddingHorizontal: 30 * basefont,
        paddingVertical : 5 * basefont
    },
    leftBox: {
        borderTopLeftRadius: 5 * basefont,
        borderBottomLeftRadius : 5 * basefont
    },
    rightBox : {
        borderTopRightRadius: 5 * basefont,
        borderBottomRightRadius : 5 * basefont
    }
});