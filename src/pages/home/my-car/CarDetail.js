/**
 * Created by ligj on 2016/10/9.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
    Text,
    View,
    ScrollView,
    RefreshControl,
    TouchableOpacity
} from 'react-native';

import ViewForRightArrow from '../../../components/ViewForRightArrow';
import ViewForRightDom from '../../../components/ViewForRightDom';
import {IconCall} from '../../../components/Icons';
import Env from '../../../utils/Env';
import {carInfo, addCar } from '../../../services/AppService';

import CarParameter from './CarParameter';
import ModifyVehicleLicence from './ModifyVehicleLicence';
import BoundDriver from './BoundDriver';
import BoundLine from './BoundLine';
import ListTitle from '../../../components/ListTitle';
import TopBanner from '../../../components/TopBanner';
import BorderButton from '../../../components/BorderButton';
import {IconTrash} from '../../../components/Icons';
import Alert from  '../../../components/Modals/Alert';
import MonitorMapTrack from '../monitor/MonitorMapTrack';
import Toast from '../../../components/Toast';

import MonitorMap from '../monitor/MonitorMap';
import MessageCar from './MessageCars';
import MessageListCar from '../../message/MessageListCar';
const estyle = Env.style;
const basefont= Env.font.base;

export default class CarDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: true,
            data: {}
        }
    }

    fetchData() {
        this.setState({isRefreshing: true});
        carInfo(this.props.nav.carId)
            .then((data)=> {
                this.setState({data});
            })
            .catch(e => Toast.show(e.message, Toast.SHORT))
            .finally(()=> {
                this.setState({isRefreshing: false});
            });
    };

    onRefresh() {
        this.fetchData();
    }

    componentWillMount() {
        this.fetchData();
    }

    goToParams() {
        this.props.router.push(CarParameter, {
            nav: {
                carId: this.props.nav.carId,
                carCode: this.state.data.carCode
            }
        });
    }

    //删除车辆
    deleteCar(){
        if(this.state.data){
            addCar({
                carId:this.state.data.carId,
                carNumber:this.state.data.carCode,
                type:0,
                flag:1
            })
                .then(()=>{ this.props.router.pop(); })
                .catch(e => Toast.show(e.message, Toast.SHORT))
                .finally(()=>{})
        }
    }
    componentWillUnmount() {
        this.props.nav.backRender();
    }
    //修改车牌号
    modifyCarDode() {
        this.props.router.push(ModifyVehicleLicence, {
                nav: {
                    carId: this.props.nav.carId,
                    carCode: this.state.data.carCode,
                    backFuns: [this.fetchData.bind(this), this.props.nav.backRender.bind(this)]
                }
            }
        );
    }
    //绑定-接班-更改司机 type: 1是主驾驶 2是副驾驶
    changeDriver(type){
        this.props.router.push(BoundDriver, {
                nav: {
                    carId: this.props.nav.carId,
                    mainDriverId: this.state.data.mainDriverId || null,
                    subDriverId: this.state.data.subDriverId || null ,
                    mainDriverPhoneNum:this.state.data.mainDriverPhoneNum || null,
                    subDriverPhoneNum:this.state.data.subDriverPhoneNum || null,
                    driverType: type
                },
                update:  [this.fetchData.bind(this), this.props.nav.backRender.bind(this)]
            }
        );
    }

    deleteCarC(){
        this.props.alert(
            '删除车辆',
            `您确定要将此车辆从车队删除吗？`,
            [
                {text:'确认',onPress:() => {
                    this.deleteCar();
                }},
                {text:'取消'}
            ]
        )
    }
    gotoMonitorMap(data){
        if(this.props.nav.position){
            this.props.router.push(MonitorMap, {nav: {carId: data.carId}});
        }else {
            Toast.show('未获取到车辆位置信息', Toast.SHORT);
        }
    }

    renderView() {
        if (this.state.data) {
            let paddingRight = Env.font.base * 94;
            /*
             * data.routeId	Integer	路线Id
             * data.subDriverId	String	副驾驶员ID
             * data.subDriverPhoneNum	String	副驾驶员电话号码
             * data.mainDriverid	String	主驾驶员ID
             * data.mainDriverPhoneNum	String	主驾驶员电话号码
             * data.speed	Integer	速度
             * data.adminList	Object[]	管理员信息数组
             * data.adminList#phoneNum	String	管理员电话信息
             * data.adminList#userNnme	String	管理员名称
             * */
            let data = this.state.data;
            return <View>
                <ListTitle title="车辆详情"/>

                <ViewForRightArrow onPress={this.modifyCarDode.bind(this)}>
                    <View style={[estyle.fxRow]}>
                        <Text style={[estyle.text, {textAlign: 'left'}]}>车牌号</Text>
                        <Text style={[estyle.fx1, estyle.text, {
                            color: Env.color.auxiliary,
                            textAlign: 'right'
                        }]}>{data.carCode}</Text>
                    </View>
                </ViewForRightArrow>
                <ViewForRightArrow onPress={()=>{ this.gotoMonitorMap(data) } }>
                    <View style={[estyle.fxRow]}>
                        <Text style={[estyle.text, {textAlign: 'left'}]}>车辆速度</Text>
                        <Text style={[estyle.fx1, estyle.text, {
                            color: Env.color.main,
                            textAlign: 'right'
                        }]}>{data.speed}km/h</Text>
                    </View>
                </ViewForRightArrow>
                <ViewForRightArrow onPress={()=>{this.props.router.push(MonitorMapTrack, {nav: {carId: data.carId, carCode: data.carCode}})}}>
                    <Text style={[estyle.text, {textAlign: 'left'}]}>轨迹回放</Text>
                </ViewForRightArrow>
                <ViewForRightArrow onPress={() => this.props.router.push(MessageCar, {nav:{carCode:data.carCode, carId:data.carId,data:data}})}>
                    <Text style={[estyle.text, {textAlign: 'left'}]}>报警通知</Text>
                </ViewForRightArrow>
                <ViewForRightArrow onPress={this.goToParams.bind(this)}>
                    <Text style={[estyle.text, {textAlign: 'left'}]}>车辆参数</Text>
                </ViewForRightArrow>

                <ListTitle title="驾驶司机"/>
                <ViewForRightArrow onPress={ ()=>{ this.changeDriver(1) } }>
                    <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                        <View style={[estyle.fx1, estyle.fxRow, estyle.paddingRight]}>
                            <Text style={[estyle.text, {textAlign: 'left'}]}>主驾驶</Text>
                        </View>
                        <View style={[estyle.fxCenter]}>
                            <TouchableOpacity style={[{paddingVertical:basefont * 6,borderRadius: basefont * 5,borderColor:Env.color.main,borderWidth:data.mainDriver ? 0.5 :0}, estyle.paddingHorizontal,estyle.fxRow, estyle.fxRowCenter]} onPress={
                                ()=> {
                                    data.mainDriverPhoneNum && this.props.callTo(data.mainDriverPhoneNum);
                                }
                            }>
                                <Text style={[estyle.text, {
                                    color: Env.color.note,
                                    textAlign: 'right'
                                }]}>{data.mainDriver || '无'}&nbsp;
                                {
                                    data.mainDriver ?
                                        <IconCall style={[{marginLeft:5*Env.font.base}]} color={Env.color.main} size={Env.font.base * 32}/> : null
                                }
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ViewForRightArrow>
                <ViewForRightArrow onPress={ ()=>{ this.changeDriver(2) } }>
                    <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                        <View style={[estyle.fx1, estyle.fxRow, estyle.paddingRight]}>
                            <Text style={[estyle.text, {textAlign: 'left'}]}>副驾驶</Text>
                        </View>
                        <View style={[estyle.fxCenter]}>
                            <TouchableOpacity style={[{paddingVertical:basefont * 6,
                            borderRadius: basefont * 5,borderColor:Env.color.main,borderWidth:data.subDriver ? 0.5 :0},estyle.paddingHorizontal,estyle.fxRow, estyle.fxRowCenter]} onPress={
                                ()=> {
                                    data.subDriverPhoneNum && this.props.callTo(data.subDriverPhoneNum);
                                }
                            }>
                                <Text style={[estyle.text, {
                                    color: Env.color.note,
                                    textAlign: 'right'
                                }]}>{data.subDriver || '无'}&nbsp;
                                {
                                    data.subDriver ?
                                        <IconCall style={[{marginLeft:5*Env.font.base}]} color={Env.color.main} size={Env.font.base * 32}/> : null
                                }</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ViewForRightArrow>
                <ListTitle title="行驶线路"/>
                <ViewForRightDom
                    rightDom={
                        <BorderButton onPress={
                            ()=> {
                                this.props.router.push(BoundLine, {
                                        nav: {
                                            carId: this.props.nav.carId,
                                            routeId: data.routeId || '',
                                            backFun:this.fetchData.bind(this)
                                        }
                                    }
                                );
                            }
                        }>{data.routeId ? '更换线路' : '绑定线路' }</BorderButton>
                    }
                >
                    <Text style={[estyle.text, {textAlign: 'left'}]}>{data.routeId  && data.routeInfo || '未绑定线路'}</Text>
                </ViewForRightDom>
            </View>
        }
        return <View/>
    }

    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="车辆详情" rightView={ <TouchableOpacity style={estyle.topBtn} onPress={()=> {
                    this.deleteCarC();
                } }><IconTrash color="#fff"/></TouchableOpacity>  }/>
                <ScrollView style={[estyle.fx1]}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this.onRefresh.bind(this)}
                                    colors={Env.refreshCircle.colors}
                                    progressBackgroundColor={Env.refreshCircle.bg}
                                />
                            }>
                    {this.renderView.bind(this)()}
                </ScrollView>

            </View>
        );
    }
}
