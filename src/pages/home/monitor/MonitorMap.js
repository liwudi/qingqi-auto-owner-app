/**
 * Created by ligj on 2016/10/9.
 */
import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    NativeModules,
    DeviceEventEmitter,
    findNodeHandle,
    TouchableHighlight,
    ActivityIndicator,
    Image
} from "react-native";

import Toast from '../../../components/Toast';
import Slider from 'react-native-slider';

import TopBanner from '../../../components/TopBanner';
import MapbarMap from '../../../mapbarmap/MapbarMap';
import Button from '../../../components/widgets/Button';

import {IconList, IconClock, IconLocation} from '../../../components/Icons';
import StatusDetail from './components/StatusDetail';
import  MonitorMapTrack from './MonitorMapTrack';
import CarStatus from './CarStatus';

import ListItem from '../../../components/ListItem';
/*海量打点， 单车*/
import {queryCarPolymerize, queryRealTimeCar, queryCarCondition} from '../../../services/MonitorService';
import Env from '../../../utils/Env';
import Monitor from './Monitor';
const estyle = Env.style;
const legend = [
    {
        value: '行驶',
        color: Env.color.main
    },
    {
        value: '怠速',
        color: Env.color.auxiliary
    },
    {
        value: '离线',
        color: Env.color.note
    }
];

const TIMEOUT = 5,
    STATUS_TIMEOUT = 10;
export default class MonitorMap extends Component {
    constructor() {
        super();
        this.zoom = 0;
        this.center = {
            longitude: 104.621367,
            latitude: 35.317133
        };
        this.markers = [];  //普通标注
        this.markers_d = [];    //带角度的
        this.list = null;
        this.monitor = false;
        this.mapRef = null;
        this.monitorCarId = -1;
        this.stopRequest = false;
        this.requesting = false;
        this.state = {
            data: null,
            monitor: null,
            detail: null,
            animating: true
        }
        this.carStatus = [];
        this.times = [];
    }

    toFetch() {
        if (this.monitor) {
            this.fetchDataSingle();
            this.fetchStatus();
        } else {
            this.fetchDataAll();
        }
    }

    //单车车况信息
    fetchStatus() {
        if (this.stopRequest) return;
        if (!this.monitor) return;
        console.info('fetch status, this.stopRequest', this.stopRequest)
        queryCarCondition(undefined, undefined, this.monitorCarId).then((data = {}) => {
            if (this.stopRequest) return;
            if (this.monitor) {
                this.setState({detail: Object.assign(this.state.detail, data.list[0] || {})});
            }
        }).catch(() => {
            console.info('status catch')
        }).finally(() => {
            this.times[0] = setTimeout(() => {
                this.fetchStatus();
            }, STATUS_TIMEOUT * 1000);
        })
    }

    fetchDataSingleInit() {
        queryRealTimeCar({carId: this.monitorCarId}).then((data) => {
            console.info('single init then')
            console.info(data)
            if(data.noResult) {
                Toast.show('没有获取车辆信息', Toast.SHORT);
            }
            else {
                this.setSingleData(data, true);
            }
        }).catch(() => {
            console.info('single init catch')
            Toast.show('获取车辆信息异常', Toast.SHORT);
        }).finally(() => {this.setState({animating: false});})
    }

    setSingleData(data, zoom) {
        data.longitude = data.lon;
        data.latitude = data.lat;
        data.carNo = data.carCode;
        data.count = 1;
        this.list = [data];
        this.setMarker();
        if(zoom) {
            this.setState({data});
            this.Map.setZoomLevel(8);
        } else {
            this.setState({detail: Object.assign(this.state.detail || {}, data)});
        }
        this.carToCenter(data);

    }
    //单车车辆信息
    fetchDataSingle() {
        if (this.stopRequest) return;
        if (!this.monitor) return;
        console.info('fetch single, this.stopRequest', this.stopRequest)
        queryRealTimeCar({carId: this.monitorCarId}).then((data = {}) => {
            if (this.stopRequest) return;
            if (this.monitor) {
                this.setSingleData(data);
            }
        }).catch(() => {
            this.requestStop();
            console.info('single catch')
        }).finally(() => {
            this.times[1] = setTimeout(() => {
                this.fetchDataSingle();
            }, TIMEOUT * 1000);
        })
    }

    fetchDataAll() {
        if (this.stopRequest) return;
        if (this.monitor) return;
        if (this.requesting) return;
        this.requesting = true;
        console.info('fetch all, this.stopRequest', this.stopRequest);
        this.Map.getBounds().then(mapbounds => {
            let b = mapbounds;
            queryCarPolymerize({
                leftLongitude: b.minLongitude, //左下， 右上
                leftLatitude: b.minLatitude,
                rightLongitude: b.maxLongitude,
                rightLatitude: b.maxLatitude,
                zoom: this.zoom
            }).then((data = {}) => {
                if (this.stopRequest) return;
                if (!this.monitor) {
                    this.list = data.list || [];
                    if(this.list.length) {
                        this.setMarker();
                    } else {
                        this.requestStop();
                        Toast.show('没有监控车辆', Toast.SHORT);
                    }
                }
            }).catch((e) => {
            //    this.requestStop();
                console.info('all catch')
                console.info(e)
            }).finally(() => {
                this.setState({animating: false});
                this.requesting = false;
                this.times[2] = setTimeout(() => {
                    this.fetchDataAll();
                }, TIMEOUT * 1000);
            })
        });
    }

    pauseView() {
        this.requestStop();
        this.Map.pause();
    }

    resumeView() {
        this.Map.setMapRef(this.mapRef);
        this.Map.resume();
        this.requestStart();
    }

    requestStop() {
        this.stopRequest = true;
        console.info('requestStop', this.stopRequest)
    }

    requestStart() {
        this.stopRequest = false;
        this.toFetch();
        console.info('requestStart', this.stopRequest)
    }

    clearTimer() {
        this.times.forEach((item) => {
            item && clearTimeout(item);
        })
        this.times = [];
    }
    componentWillUnmount() {
        this.clearTimer();
        this.pauseView();
        this.Map.finalize();
        console.info('monitor map finalize')
    }


    setMarker() {
        let list = this.list || [];
        if (list.length) {
            this.markers = [];
            this.markers_d = [];
            list.forEach((item, idx) => {
                list['carId_' + item.carId] = item;
                this.addMarkerOpts(item, idx);
            });
            this.Map.clearOverlays();
            this.Marker.add(this.markers);
            this.MarkerRotate.add(this.markers_d);
        }
    }

    addMarkerOpts(data, idx) {
        let iconText = data.carNo || data.carCode,
            ox = 0.5,
            oy = 17,
            imageName = "res/icons/c100" + data.travelStatus + ".png",
            direction = data.direction;
        if (data.count > 1) {
            iconText = data.count.toString();
            ox = 0.2;
            oy = 0;
            direction = 0;
            imageName = "res/icons/c1002-e.png";
        }
        let pt = this.MPoint([data.longitude, data.latitude]),
            mkOpts = {
                longitude: pt.longitude,
                latitude: pt.latitude,
                title: '',
                imageName: 'ic_mask',
                iconText: iconText,
                iconTextColor: Env.color.main,
                iconTextSize: 14,
                id: idx,
                offsetX: ox,
                offsetY: oy,
                click: true
            };

        this.markers.push(mkOpts);
        mkOpts = {
            longitude: pt.longitude,
            latitude: pt.latitude,
            id: idx,
            click: true,
            imageName: imageName,
            direction: direction
        };
        this.markers_d.push(mkOpts);
    }


    onInit(instance) {
        this.mapRef = instance.getMapRef();
        this.Map = instance;
        this.MPoint = instance.MPoint;
        this.Marker = instance.Marker;
        this.MarkerRotate = instance.MarkerRotate;
        if(this.props.nav && this.props.nav.carId) {
            this.monitorCarId = this.props.nav.carId;
            this.fetchDataSingleInit();
            
        } else {
            this.fetchDataAll();
        }
    }

    //去轨迹页面
    goToTrack() {
        this.pauseView();
        let data = this.state.data;
        this.props.router.push(MonitorMapTrack, {
            nav: {
                carCode: data.carCode || data.carNo,
                carId: this.monitorCarId,
                doBack: () => {
                    console.info('track')
                    setTimeout(() => {
                        this.resumeView();
                    }, 500)
                }
            }
        })
    }

    //去列表页面
    goToList() {
        this.pauseView();
        this.props.router.replace(Monitor, {
            nav: {
                doBack: () => {
                    console.info('List')
                    this.resumeView();
                }
            }
        });
    }

    //去车况列表页页
    goToStatus() {
        this.pauseView();
        this.props.router.push(CarStatus, {
            nav: {
                carId: this.monitorCarId,
                carCode: this.state.detail.carCode || this.state.detail.carNo,
                doBack: () => {
                    console.info('track')
                    this.resumeView();
                }
            }
        });
    }

    onSpan() {
        this.toFetch();
    }

    onZoomChange(zoom) {
        if (this.zoom === zoom) return;
        this.zoom = zoom;
        this.toFetch();
    }

    carToCenter(data) {
        setTimeout(() => {
            let pt = this.MPoint([data.longitude, data.latitude]);
            this.Map.setCenter(pt);
        }, 300);
    }


    readyMonitor(carId) {
        let data = this.list['carId_' + carId];
        console.info('readyMonitor', carId, data);
        if (!data) return;
        this.monitorCarId = carId;
        this.setState({data: data});
    }

    setMonitor() {
        this.requestStop();
        let monitor = this.monitor = !this.monitor;
        this.setState({monitor: monitor, detail: null});
        if (monitor) {
            let data = this.state.data;
            this.setState({detail: data});
            console.info('setMonitor', data);
            this.Map.setZoomLevel(8);
            this.carToCenter(data);
        }
        this.requestStart();
        Toast.show(monitor ? '正在开启实时监控' : '已关闭实时监控', Toast.SHORT);
    }

    clickMarker(idx) {
        let data = this.list[idx];
        if (data.count > 1) {
            this.Map.zoomIn();
            this.carToCenter(data);
        } else {
            this.readyMonitor(data.carId);
        }
    }

    renderLegend() {
        return <View style={[styles.legendView, estyle.padding, {paddingBottom: Env.font.base * 10}]}>
            {legend.map((item, index) =>
                <View style={[styles.legendItem, {paddingBottom: Env.font.base * 10}]} key={index}>
                    <View style={[{
                        backgroundColor: item.color,
                        width: Env.font.base * 20,
                        height: Env.font.base * 20,
                        borderRadius: 100
                    }, estyle.marginRight]}/>
                    <Text style={[styles.legendText]}>{item.value}</Text>
                </View>
            )}
        </View>
    }

    renderDetail() {
        return <View>
            {
                this.state.detail
                    ?  <StatusDetail data={this.state.detail} onPress={() => {
                    this.goToStatus()
                }}/>
                    : this.state.data ?
                    <View style={[estyle.padding]}>
                        <Text style={[estyle.text, {color: Env.color.note}]}>当前车辆：<Text
                            style={[estyle.text, {color: Env.color.important}]}>{this.state.data.carNo}</Text></Text>
                    </View>
                    : <View style={[{height:1}]}/>
            }
        </View>
    }

    renderButton() {
        return this.state.data ?
            <View style={[estyle.fxRow, estyle.borderTop, estyle.paddingVertical, {zIndex:100}]}>
                <Button style={[estyle.fx1, estyle.borderRight, estyle.fxRow, estyle.fxCenter]}
                        onPress={()=> {
                            this.setMonitor()
                        }}
                >
                    <IconClock color={Env.color.main} size={Env.font.base * 38}/>
                    <Text
                        style={[estyle.text, {marginLeft: Env.font.base * 10}]}>{this.state.monitor ? '关闭' : '开启'}实时监控</Text></Button>
                <Button style={[estyle.fx1, estyle.fxCenter, estyle.fxRow]} onPress={()=> {
                    this.goToTrack()
                }}>
                    <IconLocation color={Env.color.main} size={Env.font.base * 38}/>
                    <Text style={[estyle.text, {marginLeft: Env.font.base * 10}]}>轨迹回放</Text></Button>
            </View> : <View style={[{height:1}]}/>;//<ListItem left="选择监控车辆"/>
    }

    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="实时监控"
                           rightView={
                               <Button onPress={()=> {
                                   this.goToList()
                               }}
                                       style={[{height: 90 * Env.font.base}, estyle.paddingLeft]}>
                                   <IconList color="#ffffff"/>
                               </Button>
                           }
                />
                <View style={{position:'absolute', zIndex:10, width: Env.screen.width, height: 80, marginTop:Env.screen.height / 3 * Env.font.base}}>
                    <ActivityIndicator animating={this.state.animating} color={[Env.color.main]} size="large"/>
                </View>
                <MapbarMap style={[estyle.fx1]}
                           center={this.center}
                           onZoomIn={(zoom)=> {
                               this.onZoomChange(zoom)
                           }}
                           onZoomOut={(zoom)=> {
                               this.onZoomChange(zoom)
                           }}
                           onInit={(instance)=> {
                               this.onInit(instance);
                           }}
                           onSpan={()=> {
                               this.onSpan()
                           }}
                           clickMarker={(pointId)=> {
                               this.clickMarker(pointId)
                           }}
                           legend={this.renderLegend()}/>
                {this.renderDetail()}
                {this.renderButton()}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    legendText: {
        color: '#FFF',
        fontSize: Env.font.note
    },

    legendView: {
        position: 'absolute',
        backgroundColor: Env.color.modalBg,
        bottom: Env.font.base * 30,
        right: Env.font.base * 150,
        borderRadius: Env.font.base * 10,
        padding: Env.font.base * 10
    }
});