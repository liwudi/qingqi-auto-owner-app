/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/19
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Alert
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import * as Icons from '../../../components/Icons';
import PageList from '../../../components/PageList';
const estyle = Env.style;
import Env from '../../../utils/Env';
import {IconUser, IconTrash} from '../../../components/Icons'
import Toast from '../../../components/Toast'
import MyLineSetStartEnd from './MyLineSetStartEnd';
import MyLineAddCarList from './MyLineAddCarList';
import MyLineSetMaxSpeed from './MyLineSetMaxSpeed';
import MyLineSetOilwearLimit from './MyLineSetOilwearLimit';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import BorderButton from '../../../components/BorderButton';

import ListTitle from '../../../components/ListTitle';
import ListItem from '../../../components/ListItem';
import ProvincePicker from '../../../components/ProvincePicker';

import {routeCarList, delCarRoute, routeInfo, modifyRoute, addRoute, deleteRoute} from '../../../services/LineService';

export default class MyLineAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: props.routeId ? true : false,
            carList: false,
            renovate: false,
            routeInfo:{
                routeId: props.routeId || null,
            }
        };
    }

    fetchData() {
        this.setState({refreshing: true});
        routeInfo(this.state.routeInfo.routeId)
            .then((data) => {
                this.setState({refreshing: false, routeInfo : {...this.state.routeInfo, ...data}});
            })
            .finally(() => this.setState({refreshing: false}));
    };

    componentDidMount() {
        this.state.routeInfo.routeId && this.fetchData();
    }

    componentWillUnmount() {

    }
    carList() {
        if (this.state.carList) {
            return <PageList
                style={estyle.fx1}
                reInitField={[this.state.renovate]}
                renderRow={(item) => {
                    return <ViewForRightArrow  onPress={this.props.onPress} style={[estyle.fxRow,estyle.cardBackgroundColor]}>
                        <View style={[estyle.fx1]}>
                            <Text style={[estyle.articleTitle,{color: Env.color.important}]}>{item.carCode}</Text>
                        </View>
                        <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                            <IconUser color='#FEBEBE'/><Text> </Text>
                            <Text style={[estyle.note, estyle.marginRight,{color: Env.color.text}]}>{item.mastDriver}</Text>
                            <IconUser color='#C4DFFE'/><Text> </Text>
                            <Text style={[estyle.note, {color: Env.color.text}]}>{item.slaveDriver}</Text>
                        </View>
                    </ViewForRightArrow>;
                }}
                fetchData={(pageNumber, pageSize) => {
                    return routeCarList(pageNumber, pageSize, this.props.routeId)
                }}
            />
        }
    }

    delCarRoute(carId) {

        this.props.alert('提示',
            `是否将本车从线路中删除？`,
            [
                {text: '确定', onPress: () => {
                    delCarRoute(carId)
                        .then(() => {
                            this.props.refresh();
                            this.refs.carList.reInitFetch();
                            Toast.show('删除成功', Toast.SHORT);
                        })
                        .catch((e) => {
                            Toast.show(e.message, Toast.SHORT);
                        })
                }},
                {text: '取消'}
            ]
        );


    }

    delPass(pass) {
        let opts = {
            ...this.state.routeInfo,
            passbyPoints: pass
        };

        modifyRoute(opts)
            .then(()=>{
                this.props.refresh();
                Toast.show('删除途经点成功', Toast.SHORT);
                this.fetchData();
            })
            .catch((e)=>{
                Toast.show(e.message, Toast.SHORT);
            })

    }

    _addRoute = () => {
        if(this.state.routeInfo.routeId){
            let opts = {
                ...this.state.routeInfo
            };
            modifyRoute(opts)
                .then(()=>{
                    this.props.refresh();
                    Toast.show('修改成功', Toast.SHORT);
                    this.fetchData.bind(this);
                })
                .catch((e)=>{
                    Toast.show(e.message, Toast.SHORT);
                })
        }else{
            if (this.state.routeInfo.startCityCode && this.state.routeInfo.endCityCode && !this.state.routeInfo.routeId) {
                let opts = {
                    ...this.state.routeInfo
                };
                addRoute(opts)
                    .then((data) => {
                        this.props.refresh();
                        Toast.show('线路添加成功', Toast.SHORT);
                        this.setState({
                            routeInfo: {
                                ...this.state.routeInfo,
                                routeId: data.routeId
                            }
                        },this.fetchData.bind(this));
                    })
                    .catch((e) => {
                        Toast.show(e.message, Toast.SHORT);
                    })
            }
        }

    }

    _addPass(item) {



        let p = Object.assign([], this.state.routeInfo.passbyPoints || []);
        p.push(item);

        let opts = {
            ...this.state.routeInfo,
            passbyPoints: p
        };
        console.log(opts.passbyPoints);

        modifyRoute(opts)
            .then(()=>{
                this.props.refresh();
                Toast.show('添加成功', Toast.SHORT);
                this.fetchData();
            })
            .catch((e)=>{
                Toast.show(e.message, Toast.SHORT);
            })
    }

    setStartOrEnd(startOrEnd) {
        if (startOrEnd.start) {
            console.log(startOrEnd.start);
            this.setState({
                routeInfo: {
                    ...this.state.routeInfo,
                    startPointName: startOrEnd.start.pointName,
                    startCityCode: startOrEnd.start.cityCode,
                    startPointPos: startOrEnd.start.pointPos,
                    startPointDes: startOrEnd.start.pointDes,
                }
            }, this._addRoute.bind(this));
        }
        if (startOrEnd.end) {
            this.setState({
                routeInfo: {
                    ...this.state.routeInfo,
                    endPointName: startOrEnd.end.pointName,
                    endCityCode: startOrEnd.end.cityCode,
                    endPointPos: startOrEnd.end.pointPos,
                    endPointDes: startOrEnd.end.pointDes,
                }
            }, this._addRoute.bind(this));
        }
    }

    _modifyMaxSpeed( maxSpeed ) {
        let opts = {
            ...this.state.routeInfo,
            maxSpeed
        };
        modifyRoute(opts)
            .then(()=>{
                Toast.show('设置成功', Toast.SHORT);
                this.fetchData();
            })
            .catch((e)=>{
                Toast.show(e.message, Toast.SHORT);
            })
    }

    _modifyOilwearLimit(oilwearLimit){
        let opts = {
            ...this.state.routeInfo,
            oilwearLimit
        };
        modifyRoute(opts)
            .then(()=>{
                Toast.show('设置成功', Toast.SHORT);
                this.fetchData();
            })
            .catch((e)=>{
                Toast.show(e.message, Toast.SHORT);
            })
    }

    _deleteRoute(){
        let _delete = () => {
            deleteRoute(this.props.routeId)
                .then((rs) => {
                    Toast.show('删除成功', Toast.SHORT);
                    this.props.refresh();
                    this.props.router.pop();
                })
                .catch(e => {
                    Toast.show(e.message, Toast.SHORT);
                })
        }


        this.props.alert('提示',
            `删除线路，会将线路关联车辆一起删除是否删除？`,
            [
                {text: '确定', onPress: _delete},
                {text: '取消'}
            ]
        );

    }

    render() {
        return (
            <View style={[estyle.fx1, estyle.containerBackgroundColor]}>
                <TopBanner
                    {...this.props}
                    title={this.props.title || "添加线路"}
                    rightView={this.props.routeId ?

                    <TouchableOpacity style={estyle.topBtn} onPress={this._deleteRoute.bind(this)}>
                        <IconTrash color="#FFF" size={Env.font.base * 40}/>
                    </TouchableOpacity>
                        : null}
                />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.fetchData.bind(this)}
                            colors={Env.refreshCircle.colors}
                            progressBackgroundColor={Env.refreshCircle.bg}
                        />
                    }
                    style={[estyle.fx1, estyle.containerBackgroundColor]}>
                    <ListTitle title="起终点"/>
                    <ListItem
                        left="起点"
                        right={this.state.routeInfo.startPointName || '点击设置'}
                        rightPress={() => {
                            this.props.router.push(
                                ProvincePicker,
                                { changeCity: (row) =>{
                                    let opt={pointName: row.name,
                                                cityCode: row.id,
                                                pointPos: '1',
                                                pointDes: row.name,
                                                radius:'100' };
                                    this.setStartOrEnd({start:opt})
                                    }
                                }
                            );
                        }}
                        color={Env.color.main}
                    />
                    <ListItem
                        left="终点"
                        right={this.state.routeInfo.endPointName || '点击设置'}
                        rightPress={() => {
                            this.props.router.push(
                                ProvincePicker,
                                { changeCity: (row) =>{
                                    let opt={pointName: row.name,
                                                cityCode: row.id,
                                                pointPos: '1',
                                                pointDes: row.name,
                                                radius:'100' };
                                    this.setStartOrEnd({end:opt})
                                    }
                                }
                            );
                        }}
                        color={Env.color.main}
                    />



                    <View style={[estyle.fxRow,estyle.fxRowCenter]}>
                        <ListTitle title="途经点" style={estyle.fx1}/>
                        <View style={estyle.paddingRight}>
                            <Icons.IconPlus onPress={() => {
                                if(!this.state.routeInfo.routeId){
                                    Toast.show('请先设置起终点', Toast.SHORT);
                                    return;
                                }
                                this.props.router.push(
                                    ProvincePicker,
                                { changeCity: (row) =>{
                                    let opt={pointName: row.name,
                                                cityCode: row.id,
                                                pointPos: '1',
                                                pointDes: row.name,
                                                radius:'100' };
                                    this._addPass(opt)
                                    }
                                }
                                );
                            }}/>
                        </View>
                    </View>
                    <View>
                        {
                            this.state.routeInfo.passbyPoints && this.state.routeInfo.passbyPoints.length > 0
                                ? this.state.routeInfo.passbyPoints.map((item, idx, self) => {
                                    return <ListItem
                                        key={idx}
                                        left={item.pointName}
                                        right={<BorderButton onPress={() => {
                                            let pass = Object.assign([], self);
                                            pass.splice(idx, 1);
                                            this.delPass(pass);
                                        }}>删除</BorderButton>}
                                        color={Env.color.main}
                                    />
                                })
                                : <ListItem left='无途经点' />
                        }
                    </View>
                    <ListTitle title="驾驶规定"/>
                    <ListItem
                        left="最高时速"
                        right={this.state.routeInfo.maxSpeed ? (this.state.routeInfo.maxSpeed + 'km/h') : '点击设置'}
                        rightPress={() => {
                            if(!this.state.routeInfo.routeId){
                                Toast.show('请先设置起终点', Toast.SHORT);
                                return;
                            }
                            this.props.router.push(MyLineSetMaxSpeed, {
                                submit: this._modifyMaxSpeed.bind(this),
                                maxSpeed : (this.state.routeInfo.maxSpeed || '') + ''
                            });
                        }}
                        color={Env.color.main}
                    />
                    <ListItem
                        left="总油耗限制"
                        right={this.state.routeInfo.oilwearLimit ? (this.state.routeInfo.oilwearLimit + 'L') : '点击设置'}
                        rightPress={() => {
                            if(!this.state.routeInfo.routeId){
                                Toast.show('请先设置起终点', Toast.SHORT);
                                return;
                            }
                            this.props.router.push(MyLineSetOilwearLimit, {
                                submit: this._modifyOilwearLimit.bind(this),
                                oilwearLimit : (this.state.routeInfo.oilwearLimit || '') + ''
                            });
                        }}
                        color={Env.color.main}
                    />
                    <View style={[estyle.fxRow,estyle.fxRowCenter]}>
                        <ListTitle title="设置车辆" style={estyle.fx1}/>
                        <View style={estyle.paddingRight}>
                            <Icons.IconPlus onPress={() => {
                                if(!this.state.routeInfo.routeId){
                                    Toast.show('请先设置起终点', Toast.SHORT);
                                    return;
                                }
                                this.props.router.push(MyLineAddCarList, {
                                    routeId: this.state.routeInfo.routeId,
                                    update: () => {
                                        this.props.refresh();
                                        this.refs.carList.reInitFetch();
                                    }
                                });
                            }}/>
                        </View>
                    </View>
                    <PageList
                        ref="carList"
                        style={estyle.fx1}
                        renderRow={(item) => {
                            return <View style={[estyle.fxRow,estyle.fxRowCenter, estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
                                <View style={estyle.fx1}>
                                    <Text style={[estyle.articleTitle]}>{item.carCode}</Text>
                                    <View style={[estyle.fxRow, estyle.fxRowCenter,estyle.paddingTop]}>
                                        <IconUser color='#FEBEBE'/><Text> </Text>
                                        <Text style={[estyle.note, estyle.marginRight,{color: Env.color.text}]}>{item.mainDriverName || '无'}</Text>
                                        <IconUser color='#C4DFFE'/><Text> </Text>
                                        <Text style={[estyle.note, {color: Env.color.text}]}>{item.subDriverName || '无'}</Text>
                                    </View>
                                </View>
                                <BorderButton onPress={() => this.delCarRoute(item.carId)}>删除</BorderButton>
                            </View>
                        }}
                        fetchData={(pageNumber, pageSize) => {
                            let routeId = this.props.routeId || this.state.routeInfo.routeId || null;
                            if(routeId){
                                return routeCarList(pageNumber, pageSize, routeId)
                            }else{
                                return Promise.resolve({list:[]});
                            }

                        }}
                    />
                </ScrollView>
            </View>
        );
    }
}