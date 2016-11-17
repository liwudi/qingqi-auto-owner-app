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
const estyle = Env.style;
import {carInfo, addCar } from '../../../services/AppService';

import CarParameter from './CarParameter';
import ModifyVehicleLicence from './ModifyVehicleLicence';
import BoundDriver from './BoundDriver';
import BoundLine from './BoundLine';
import ListTitle from '../../../components/ListTitle';
import ListItem from '../../../components/ListItem';
import TopBanner from '../../../components/TopBanner';
import BorderButton from '../../../components/BorderButton';
import {IconTrash} from '../../../components/Icons';
import Alert from  '../../../components/Modals/Alert';
import Button from '../../../components/widgets/Button';
import MonitorCarDetail from '../monitor/MonitorCarDetail';
import MapLine from '../MapLine';
export default class CarDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: true,
            data: {},
            alertCActive: false
        }
    }

    fetchData() {
        this.setState({isRefreshing: true});
        carInfo(this.props.nav.carId)
            .then((data)=> {
                this.setState({data});
            })
            .catch()
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
            addCar(this.state.data.carId,this.state.data.carCode,1)
                .then(()=>{ this.props.nav.backRender(); this.props.router.pop(); })
                .catch()
                .finally(()=>{this.setState({alertCActive: false})})
        }
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
    goToMapline() {
        this.props.router.push(MapLine, {nav: {carId: 10}})
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
                <ViewForRightArrow onPress={()=>{ this.props.router.push(MonitorCarDetail, {nav: {carId: this.props.nav.carId}});}} >
                    <View style={[estyle.fxRow]}>
                        <Text style={[estyle.text, {textAlign: 'left'}]}>车辆速度</Text>
                        <Text style={[estyle.fx1, estyle.text, {
                            color: Env.color.main,
                            textAlign: 'right'
                        }]}>{data.speed}</Text>
                    </View>
                </ViewForRightArrow>
                <ViewForRightArrow onPress={() => {this.goToMapline()}}>
                    <Text style={[estyle.text, {textAlign: 'left'}]}>轨迹回放</Text>
                </ViewForRightArrow>
                <ViewForRightArrow >
                    <Text style={[estyle.text, {textAlign: 'left'}]}>报警通知</Text>
                </ViewForRightArrow>
                <ViewForRightArrow onPress={this.goToParams.bind(this)}>
                    <Text style={[estyle.text, {textAlign: 'left'}]}>车辆参数</Text>
                </ViewForRightArrow>

                <ListTitle title="驾驶司机"/>
                <ViewForRightDom
                    rightDom={
                        <BorderButton onPress={
                            ()=> {
                                this.props.router.push(BoundDriver, {
                                        nav: {
                                            carId: this.props.nav.carId,
                                            driverType: 1
                                        },
                                        update: this.fetchData.bind(this)
                                    }
                                );
                            }
                        }>{data.mainDriver ? '更换司机' : '绑定司机' }</BorderButton>
                    }
                >
                    <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                        <View style={[estyle.fx1, estyle.fxRow, estyle.paddingRight]}>
                            <Text style={[estyle.text, {textAlign: 'left'}]}>主驾驶</Text>
                        </View>
                        <View style={[estyle.fxCenter]}>
                            <TouchableOpacity style={[estyle.fxRow, estyle.fxRowCenter]} onPress={
                                ()=> {
                                    data.mainDriverPhoneNum && this.props.callTo(data.mainDriverPhoneNum);
                                }
                            }>
                                <Text style={[estyle.fx1, estyle.text, {
                                    color: Env.color.note,
                                    textAlign: 'right'
                                }]}>{data.mainDriver || '无'}</Text>
                                {
                                    data.mainDriver ?
                                        <IconCall color={Env.color.main} size={Env.vector.call.size}/> : null
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </ViewForRightDom>
                <ViewForRightDom
                    rightDom={
                        <BorderButton onPress={
                            ()=> {
                                this.props.router.push(BoundDriver, {
                                        nav: {
                                            carId: this.props.nav.carId,
                                            driverType: 2
                                        },
                                        update: this.fetchData.bind(this)
                                    }
                                );
                            }
                        }>{data.subDriver ? '更换司机' : '绑定司机' }</BorderButton>
                    }
                >
                    <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                        <View style={[estyle.fx1, estyle.fxRow, estyle.paddingRight]}>
                            <Text style={[estyle.text, {textAlign: 'left'}]}>副驾驶</Text>
                        </View>
                        <View style={[estyle.fxCenter]}>
                            <TouchableOpacity style={[estyle.fxRow, estyle.fxRowCenter]} onPress={
                                ()=> {
                                    data.subDriverPhoneNum && this.props.callTo(data.subDriverPhoneNum);
                                }
                            }>
                                <Text style={[estyle.fx1, estyle.text, {
                                    color: Env.color.note,
                                    textAlign: 'right'
                                }]}>{data.subDriver || '无'}</Text>
                                {
                                    data.subDriver ?
                                        <IconCall color={Env.color.main} size={Env.vector.call.size}/> : null
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </ViewForRightDom>
                <ListTitle title="行驶线路"/>
                <ViewForRightDom
                    rightDom={
                        <BorderButton onPress={
                            ()=> {
                                this.props.router.push(BoundLine, {
                                        nav: {
                                            carId: this.props.nav.carId,
                                            backFun:this.fetchData.bind(this)
                                        }
                                    }
                                );
                            }
                        }>{data.routeInfo ? '更换线路' : '绑定线路' }</BorderButton>
                    }
                >
                    <Text style={[estyle.text, {textAlign: 'left'}]}>{data.routeInfo || '未绑定线路'}</Text>
                </ViewForRightDom>
            </View>
        }
        return <View/>
    }

    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="车辆详情" rightView={ <TouchableOpacity onPress={()=> {
                    this.setState({alertCActive: true})
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
                <Alert visible={this.state.alertCActive}
                       title="删除车辆"
                       confirmTitle="确认"
                       cancelTitle="取消"
                       onConfirm={(()=> {
                           this.deleteCar()
                       })}
                       onCancel={(()=> {
                           this.setState({alertCActive: false})
                       })}>
                    您确定要将此车辆从车队删除吗？
                </Alert>
            </View>
        );
    }
}
