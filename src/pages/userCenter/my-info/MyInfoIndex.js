/**
 * Created by linyao on 2017/4/14.
 */
import React, {Component} from 'react';

import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import authentication from '../../../assets/images/authentication.png';
import Authentication2 from '../../../assets/images/Authentication2.png';
import tongyi_icon from '../../../assets/images/tongyi_icon.png';
import MyInfo from './MyInfo';
import MyInfoQuestion from './MyInfoQuestion';
import MyInfoCarGang from './MyInfoCarGang';
import Toast from '../../../components/Toast';
import { getUnifiedUserInfoForGoodsSource } from '../../../services/GoodsService';
import SubmitButton from '../../../components/SubmitButton';
import UnifiedUserInfo from './UnifiedUserInfo';


export default class MyInfoIndex extends Component {
    constructor(props){
        super(props);
        this.state = {
            isFirst : false,
        };
    }
    componentDidMount() {
        this.fetchData();
    }

    fetchData(){
        getUnifiedUserInfoForGoodsSource()
            .then((rs)=>{
                if(rs.initial === 2){
                    this.setState({isFirst:false,data:rs});
                }
            })
            .catch((err)=>{
                Toast.show(err.message,Toast.SHORT);
            })
    }

    goto(page,params){
        if(params){
            this.props.router.push(page,{data:params});
        }else {
            this.props.router.push(page);
        }
    }

    firstView(){
        return(
            <View style={[ estyle.fx1,{marginTop: 100 * basefont}]}>
                <View style={[estyle.fx1,estyle.fxCenter]}>
                    <Image source={tongyi_icon} style={styles.img} />
                    <SubmitButton size="large" style={[estyle.marginTop]} onPress={()=>{this.goto(UnifiedUserInfo,this.state.data)} }>马上去认证</SubmitButton>
                    <Text style={[estyle.note,estyle.marginTop]}>资料会提交给货源信息提供方共同认证</Text>
                </View>
            </View>
        )
    }
    notFirstView(){
        return (
            <View style={[estyle.fxRow,{marginTop: 100 * basefont}]}>
                <View style={[estyle.fx1,estyle.fxCenter]}>
                    <TouchableOpacity style={[estyle.fxCenter]} onPress={()=>{global.umengEvent('personal_lujing','我的_资料认证_陆鲸认证'); this.goto(MyInfo)}}>
                        <Image source={Authentication2} style={styles.img} />
                        <Text style={[estyle.articleTitle,estyle.marginTop]}>陆鲸认证</Text>
                    </TouchableOpacity>
                </View>
                <View style={[estyle.fx1,estyle.fxCenter]}>
                    <TouchableOpacity style={[estyle.fxCenter]} onPress={()=>{global.umengEvent('personal_huochebang','我的_资料认证_货车帮认证'); this.goto(MyInfoCarGang)}}>
                        <Image source={authentication} style={styles.img} onPress={()=>{}} />
                        <Text style={[estyle.articleTitle,estyle.marginTop]}>货车帮认证</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render(){
        return(
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="资料认证"/>
                {
                    this.state.isFirst ? this.firstView() : this.notFirstView()
                }
                <View style={[estyle.fx1,estyle.fxCenter]}>
                    <Text onPress={()=>{this.props.router.push(MyInfoQuestion)}} style={[estyle.text,{color:Env.color.main}]}>认证有什么好处？</Text>
                </View>
            </View>
        )
    }
}
const basefont = Env.font.base;
const estyle = Env.style;
const styles = StyleSheet.create({
    img:{
        width: 120 * basefont,
        height: 120 * basefont
    }
});