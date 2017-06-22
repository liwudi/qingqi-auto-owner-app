/**
 * Created by liwd on 2017/6/21.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

import Env from '../../../../utils/Env';
const estyle = Env.style;
const basefont = Env.font.base;

class SignIcon extends Component{
    renderImage(){
        if(this.props.signFlg === 1){
            return <Image style={[{width:Env.screen.width * 0.15,height:Env.screen.width * 0.15}]} source={require("../../../../assets/images/signImageCompleted.png")}/>;
        }else if(this.props.signFlg === 2){
            return <Image style={[{width:Env.screen.width * 0.15,height:Env.screen.width * 0.15}]} source={require("../../../../assets/images/signImageActive.png")}/>
        }
    }
    render(){
        return (
            <View style={[styles.signItem]}>
                <View style={[estyle.fxCenter,estyle.fx1,{position:"relative"}]}>
                    { this.renderImage() }
                    {/*<Image style={[{width:Env.screen.width * 0.15,height:Env.screen.width * 0.15}]} source={require("../../../../assets/images/signImageActive.png")}/>*/}
                    <View style={[{position:"absolute",top:Env.font.base*60,zIndex:100},estyle.fxCenter]}>
                        <Text style={[{color:Env.color.navTitle,fontSize:Env.font.mini}]}>{this.props.score}积分</Text>
                        {
                            this.props.signFlg === 2 && this.props.multiple ? <Text style={[{color:'red',fontSize:Env.font.mini}]}>{'x'+this.props.multiple}</Text> : null
                        }
                    </View>
                    {
                        this.props.signFlg === 2 && this.props.vipFlag === 1 ? <Image style={[{position:"absolute",top: 8 *basefont,width:150 * basefont ,height: 100 * basefont}]} source={require("../../../../assets/images/member.png")}/> : null
                    }
                </View>

                <View style={[{height:Env.font.base * 50},estyle.fxCenter]}>
                    <Text>{'第'+this.props.days+'天'}</Text>
                </View>
            </View>
        )
    }
}
export default SignIcon;
const styles = StyleSheet.create({

    signItem:{
        width:Env.screen.width * 0.23,
        height:Env.screen.width * 0.23,
    },
});