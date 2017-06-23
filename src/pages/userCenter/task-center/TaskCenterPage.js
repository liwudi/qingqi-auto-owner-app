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
    TouchableOpacity,
    Modal
} from 'react-native';
import Swiper from 'react-native-swiper';

import TopBanner from '../../../components/TopBanner';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import Env from '../../../utils/Env';
import TaskNew from "./TaskNew";
import TaskEveryDay from "./TaskEveryDay";
import TaskLong from "./TaskLong";
import IntegralImage from "../../../components/IntegralImage";
import IntegralDetail from "../integral-detail/IntegralDetail";
import SignButton from "./components/SignButton";
import SignRule from "./SignRule";
import CloseTag from "./components/CloseTag";

const estyle = Env.style;
import SignIcon from "./components/SignIcon";
import IntegralMallPage from "../integral-mall/IntegralMallPage"
import { queryUnfinishScoreTaskNum, querySignList, sign,queryScoreLogoList,queryIsVipDate} from "../../../services/AccumulateService";
import AddCar from "../add-car/AddCar";
import  ServiceStation from "../../home/service-station/ServiceStation";
import MyInfoIndex from '../my-info/MyInfoIndex';
import { AccumulateAction, TYPES } from '../../../actions';
import ServiceStationAppointmentList from '../../home/service-station/ServiceStationAppointmentList';
import bbs from '../../home/bbs/index';

/**
 * 签到组件
 */
class IntegralSign extends Component{
    constructor(props) {
        super(props);
        this.state = {
            iconList:[],
            signDays:0,
            nextScore:2
        };
    }
    componentDidMount(){
        this.getQuerySignListData();
    }

    getQuerySignListData(){
        querySignList(1).then((data)=>{
            this.setState({
                iconList:data.list,
                signDays:data.signDays,
                nextScore:data.nextScore
            })
        }).catch(error=>{
            console.log(error);
        })
    }
    goTo(page) {
        this.props.router.push(page);
    }
    signEvent(){
        sign(1).then((data)=>{
            this.props.onClick();
        })
    }
    render(){
        return (
            <View style={[estyle.fx1,styles.modalViewContainer]}>
                <Image style={[styles.imageView]} source={require("../../../assets/images/signImage.png")}></Image>
                <View style={[styles.modalView,estyle.cardBackgroundColor]}>

                    <View style={[estyle.marginHorizontal, styles.signContainer, estyle.fx1 ,estyle.fxRow,{flexWrap:"wrap",justifyContent:"space-around",alignContent:"space-around"}]}>
                        {
                            this.state.iconList.map((item,index)=>{
                                return <SignIcon vipFlg={item.vipFlg} multiple={item.multiple}  key={index} days={item.days} score={item.score} signFlg={item.signFlg} />
                            })
                        }
                    </View>

                    <View style={[estyle.marginHorizontal, styles.signButtonContainer,estyle.fxCenter]}>
                        <SignButton onClick={ ()=>{this.signEvent()} }  style={[Env.button.size.middle,{backgroundColor:Env.color.integralButtonBg}
                        ]}>
                            {
                            <Text style={[estyle.articleTitle,{color:Env.color.navTitle}]}>签到</Text>
                            }
                        </SignButton>
                    </View>
                    <View  style={[estyle.marginHorizontal, styles.signLinkContainer]}>
                        <TouchableOpacity onPress={() =>{
                            this.props.goToRulePage()
                        } }>
                            <Text style={[estyle.borderBottom,{ color: Env.color.note}]}>签到规则>></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
/**
 * 签到成功
 */
class IntegralSignSucess extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Integral: 0,
            signDays:0,
            nextScore:2
        };
    }
    componentDidMount(){
        this.getQuerySignListData();
        this.getQueryUnfinishScoreTaskNumData();
    }
    getQueryUnfinishScoreTaskNumData(){
        queryUnfinishScoreTaskNum(1).then((data)=>{
            this.setState({
                Integral:data.scoreTotal
            })
        })
    }
    getQuerySignListData(){
        querySignList(1).then((data)=>{
            this.setState({
                iconList:data.list,
                signDays:data.signDays,
                nextScore:data.nextScore
            })
        }).catch(error=>{
            console.log(error);
        })
    }

    render(){
        return (
            <View style={[estyle.fx1,styles.modalViewContainer]}>
                <View style={[styles.modalView,estyle.cardBackgroundColor,{position:"relative"}]}>
                    <View style={[{position:"absolute",width:Env.font.base*100,height:Env.font.base*100,right:0,top:0},estyle.fxCenter]}>
                        <CloseTag onClick={()=>this.props.onHide()}/>

                    </View>
                    <View style={[estyle.fx1,estyle.fxCenter]}>
                        <Image style={[styles.signSucessImage]} source={require("../../../assets/images/signSuccess.png")}/>
                    </View>
                    <View style={[estyle.fxCenter]}>
                        <Text style={[estyle.note]}>连续签到{this.state.signDays}天，下次签到积分<Text style={[{color:Env.color.integralButtonBg}]}>+{this.state.nextScore}</Text></Text>
                        <Text style={estyle.articleTitle}>我的积分：{this.state.Integral}</Text>
                    </View>
                    <View style={[estyle.marginHorizontal, styles.signButtonContainer,estyle.fxCenter]}>
                        <SignButton style={[Env.button.size.middle,{backgroundColor:Env.color.integralButtonBg}]} onClick={()=>this.props.onClick()}>
                            <Text style={[estyle.articleTitle,{color:Env.color.navTitle}]}>去积分商城</Text>
                        </SignButton>
                    </View>
                </View>
            </View>
        )
    }
}
/**
 * 积分任务中心
 */
class TaskCenterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalTag: 1,
            isShowModal:false,
            Integral: 2371,
            arrayList:[],
            iconList:[],
            signDays:0,
            nextScore:2,
            txtIndex:0,
            isRefreshing: false,
        };
        this.ridx = null;
        this.stopRequest = true;
    }
    componentDidMount(){
        setTimeout(()=>{
            this.getQueryIsVipDate();
            this.getQueryScoreLogoListData();
            this.props.dispatch(AccumulateAction.requestScore());
        },800);
    }
    // ----------------获取数据-----------------------
    getQueryIsVipDate(){
        queryIsVipDate().then((data)=>{
            this.setState({vip:data});
        }).catch((err)=>{
            console.log(err)
        })
    }
    getQueryScoreLogoListData(){
        queryScoreLogoList(1).then((data)=>{
            this.setState({
                arrayList:data
            },()=>{this.scrollText()})
        })
    }
    //-----------------------------------------------
    goTo(page) {
        this.props.router.push(page);
    }
    //模态窗口状态改变
    signEvent(){
        this.setState({
            modalTag:0
        })
    }
    /**
     * 不同任务的行为 param string (任务类型)
     * 任务更新需配置字段完成自动，更新要重新打包
     * */
    goSomeWhere(param){
        switch (param){
            case "每日签到" : this.setState({
                isShowModal:true
            });  break;
            case "服务预约" : this.goTo(ServiceStation); break;
            case "服务评论" : this.goTo(ServiceStationAppointmentList); break;
            case "添加车辆" : this.goTo(AddCar); break;
            case "陆鲸认证" : this.goTo(MyInfoIndex); break;
            case "论坛发帖" : this.goTo(bbs); break;
            case "论坛回帖" : this.goTo(bbs); break;
        }
    }
    //关闭模态层
    closeModal(){
        this.refs.TaskEveryDay.getQueryDayTaskListData();
        this.props.dispatch(AccumulateAction.requestScore())
    }
    renderModalComponent(){
        if(this.state.modalTag){
            return (<IntegralSign onClick={() =>{this.signEvent()} } goToRulePage={() => {
                this.setState({
                    isShowModal:false
                },()=>this.goTo(SignRule));
            }}/>)
        }else{
            return <IntegralSignSucess Integral={this.props.Integral.scoreTotal} onClick={()=>{this.setState({isShowModal:false});this.goTo(IntegralMallPage)}} onHide={() => {this.setState({isShowModal:false});this.closeModal();}} />
        }
    }
    fetchData(){
        this.setState({isRefreshing: true},()=>{
            this.getQueryIsVipDate();
            this.getQueryScoreLogoListData();
            this.props.dispatch(AccumulateAction.requestScore());
            this.refs.TaskEveryDay.getQueryDayTaskListData();
            this.refs.TaskNew.getQueryNewbieTaskListData();
            this.refs.TaskLong.getQueryLongTermTaskListData();
            this.stopRequest = true;
            setTimeout(()=>{ this.setState({isRefreshing: false});},3500)
        });
    }

    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }

    shouldComponentUpdate(props) {
        let cidx = props.router.currentIndex();
        if (this.ridx === null) this.ridx = cidx;
        if (cidx === this.ridx) {
            //因为请求是异步的，添加延时，防止2次请求才会停止
            this.timer = setTimeout(() => {
                if (!this.stopRequest) {
                    this.fetchData();
                }
            }, 500)
        } else {
            this.stopRequest = false;
        }
        return true;
    }

    //顶部文字轮播
    scrollText(){
        let list = this.state.arrayList;
        if(list.length>1){
            this.timer = setTimeout(()=>{
                this.setState({txtIndex:this.state.txtIndex+1},()=>{
                    if(this.state.txtIndex >= list.length){
                        this.setState({txtIndex:0},()=>{this.scrollText()});
                    }else {
                        this.scrollText();
                    }
                })
            },3000)
        }
    }
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner
                    {...this.props}
                    title="任务中心"
                />
                {/*签到modal模块*/}
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.isShowModal}
                    onRequestClose={() => {this.setState({
                        isShowModal:false
                    })}}
                >
                    {
                        this.renderModalComponent()
                    }
                </Modal>

                {/*任务图片、轮播和积分模块*/}
                <ScrollView style={[estyle.fx1]}
                            refreshControl={
                                <RefreshControl
                                    //onRefresh={this.fetchData.bind(this)}
                                    refreshing={this.state.isRefreshing}
                                    colors={[Env.color.main]}
                                    progressBackgroundColor="#fff"
                                />
                            }
                >
                    <View>
                        <IntegralImage />
                        <View style={[estyle.marginVertical,estyle.fxCenter]}>
                            <View style={[estyle.border,styles.titleWidth,styles.baseHeight,estyle.fxCenter,styles.titleBorder,estyle.cardBackgroundColor]}>
                                <View style={[estyle.fxCenter]}>
                                    <Text style={[styles.titleColor]}>{this.state.arrayList[this.state.txtIndex]}</Text>
                                </View>
                            </View>
                        </View>

                        <ViewForRightArrow onPress={() => this.goTo(IntegralDetail)}>
                            <View style={[estyle.fxRow]}>
                                <Text style={[estyle.text, estyle.fx1]}>积分</Text>
                                <Text style={[estyle.text, styles.titleColor]}>{this.props.Integral.scoreTotal}</Text>
                            </View>
                        </ViewForRightArrow>
                    </View>

                    {/*任务列表模块*/}
                    <View style={[estyle.paddingTop]}>
                        <TaskEveryDay ref="TaskEveryDay" vip={this.state.vip} onClick={(param)=>this.goSomeWhere(param)}/>
                        <TaskNew ref="TaskNew" vip={this.state.vip} style={[estyle.marginTop]} onClick={(param)=>this.goSomeWhere(param)}></TaskNew>
                        <TaskLong ref="TaskLong" vip={this.state.vip} style={[estyle.marginTop]}  onClick={(param)=>this.goSomeWhere(param)} />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default connect(function (stores) {
    return {
        Integral:stores.IntegralStore.Integral
    }
})(TaskCenterPage);
const styles = StyleSheet.create({
    baseHeight: {
        height:Env.screen.height/20,
    },
    titleWidth:{
        width:Env.screen.width*0.8
    },
    titleColor:{
        color:Env.color.integralButtonBg,
    },
    titleBorder:{
        borderWidth:1,
        borderRadius:5,
        borderColor:Env.color.integralButtonBg,
        borderStyle:"dashed",
    },
    modalViewContainer:{
        backgroundColor:'rgba(0,0,0,0.5)',
        position:'relative'
    },
    imageView:{
        width:Env.screen.width * 0.86,
        height:Env.screen.height/8,
        position:"absolute",
        top:Env.screen.height/9,
        left:Env.screen.width * 0.07,
        zIndex:5
    },

    modalView:{
        width:Env.screen.width * 0.8,
        height:Env.screen.height/2,
        borderRadius:10,
        position:'absolute',
        left:Env.screen.width * 0.1,
        top:Env.screen.height/6,
        overflow:"visible"
    },
    signContainer:{
        marginTop:Env.screen.width * 0.1,
    },
    signButtonContainer:{
        height:Env.screen.width * 0.2,
    },
    signLinkContainer:{
        height:Env.screen.width * 0.1,
        paddingLeft:Env.screen.width * 0.4,
        paddingRight:Env.screen.width * 0.11,
        borderBottomColor: Env.color.note,
    },
    signItem:{
        width:Env.screen.width * 0.23,
        height:Env.screen.width * 0.23,
    },
    wrapper: {
    },
    signSucessImage:{
        width:Env.screen.width * 0.5,
        height:Env.screen.width * 0.5,
    }
});