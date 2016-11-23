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

//const linePts = [[115.95380000000002,28.682910000000003,false,1],[115.95385,28.68287,false,0],[115.95385,28.682730000000003,false,0],[115.95412,28.682730000000003,false,0],[115.95416000000002,28.68268,false,0],[115.95414000000001,28.68259,false,0],[115.95404,28.682470000000002,false,0],[115.95384000000001,28.68239,false,0],[115.95343000000001,28.68248,false,0],[115.95340000000002,28.682280000000002,false,3],[115.95400000000001,28.68221,false,0],[115.95404,28.682010000000002,false,0],[115.95417,28.681810000000002,false,0],[115.95405000000001,28.68174,false,3],[115.95329000000001,28.681690000000003,false,0],[115.95274,28.68157,false,0],[115.95203000000001,28.681530000000002,false,0],[115.95181000000001,28.681710000000002,false,0],[115.94975000000001,28.68173,false,0],[115.94941000000001,28.681820000000002,false,0],[115.94921000000001,28.681970000000003,false,3],[115.94908000000001,28.682180000000002,false,0],[115.94904000000001,28.682340000000003,false,0],[115.94881000000001,28.68476,false,0],[115.94819000000001,28.687720000000002,false,0],[115.94814000000001,28.68784,false,0],[115.94799,28.68793,false,3],[115.94775000000001,28.687920000000002,false,0],[115.94427,28.687260000000002,false,0],[115.94315,28.687120000000004,false,3],[115.93999000000001,28.687150000000003,false,0],[115.93811000000001,28.687240000000003,false,0],[115.93643000000002,28.68718,false,3],[115.93537,28.687260000000002,false,0],[115.93515000000001,28.687350000000002,false,0],[115.93480000000001,28.687410000000003,false,0],[115.92735,28.688050000000004,false,0],[115.92669000000001,28.688070000000003,false,0],[115.92623,28.688150000000004,false,0],[115.92613000000001,28.68823,false,2],[115.92607000000001,28.68841,false,0],[115.92593000000001,28.689510000000002,false,0],[115.92566000000001,28.690150000000003,false,3],[115.92374000000001,28.69281,false,0],[115.92326000000001,28.693530000000003,false,0],[115.92326000000001,28.69365,false,3],[115.92346,28.69386,false,0],[115.92518000000001,28.695240000000002,false,3],[115.92538,28.695710000000002,false,0],[115.92605,28.696440000000003,false,0],[115.92673,28.697470000000003,false,0],[115.92748,28.6991,false,0],[115.92764000000001,28.699340000000003,false,3],[115.92810000000001,28.699650000000002,false,0],[115.92939000000001,28.699970000000004,false,0],[115.92963,28.700110000000002,false,3],[115.93103,28.70238,false,0],[115.93140000000001,28.703110000000002,false,0],[115.93197,28.703960000000002,false,0],[115.93209000000002,28.704210000000003,false,3],[115.93216000000001,28.70447,false,0],[115.93227,28.705410000000004,false,0],[115.93222000000002,28.705630000000003,false,3],[115.93098,28.70557,false,0],[115.92855000000002,28.705560000000002,false,0],[115.92789,28.7055,false,3],[115.92781000000001,28.705430000000003,false,0],[115.92778000000001,28.70531,false,0],[115.92781000000001,28.704880000000003,false,0],[115.92777000000001,28.70416,false,0],[115.92786000000001,28.70325,false,0],[115.92787000000001,28.70191,false,3],[115.92800000000001,28.701770000000003,false,0],[115.92813000000001,28.70174,false,0],[115.92925000000001,28.701760000000004,false,3],[115.92923,28.70184,false,0],[115.92917000000001,28.701870000000003,false,0],[115.92907000000001,28.701860000000003,false,0],[115.92892,28.701750000000004,false,0],[115.92819000000001,28.701760000000004,false,0],[115.92798,28.701850000000004,false,0],[115.92789,28.70202,false,3],[115.9278,28.70529,false,0],[115.92782000000001,28.705430000000003,false,0],[115.92788000000002,28.7055,false,3],[115.9286,28.705600000000004,false,0],[115.93149000000001,28.705610000000004,false,0],[115.93203000000001,28.70568,false,0],[115.93219,28.70577,false,3],[115.93236,28.707040000000003,false,0],[115.93247000000001,28.70746,false,0],[115.93223,28.708360000000003,false,0],[115.93198000000001,28.70979,false,0],[115.93169,28.71309,false,3],[115.93173000000002,28.713240000000003,false,0],[115.93201,28.713620000000002,false,0],[115.93310000000001,28.715000000000003,false,2],[115.93318000000001,28.71505,false,0],[115.9334,28.715020000000003,false,0],[115.93443,28.714650000000002,false,0],[115.93461,28.71469,false,0],[115.93529000000001,28.7146,false,0],[115.93704000000001,28.71375,false,3],[115.93735000000001,28.713490000000004,false,0],[115.93775000000001,28.712460000000004,false,0],[115.93822000000002,28.71177,false,0],[115.93891,28.711330000000004,false,3],[115.93910000000001,28.711270000000003,false,0],[115.93979000000002,28.711370000000002,false,0],[115.9415,28.711350000000003,false,0],[115.94176000000002,28.71131,false,3],[115.94206000000001,28.711170000000003,false,0],[115.94289,28.710620000000002,false,0],[115.94437,28.709970000000002,false,0],[115.94495,28.70981,false,0],[115.94615,28.709680000000002,false,0],[115.94643,28.709590000000002,false,3],[115.94666000000001,28.709370000000003,false,0],[115.94691,28.708740000000002,false,0],[115.94704000000002,28.70858,false,3],[115.94953000000001,28.708600000000004,false,0],[115.94982,28.708530000000003,false,3],[115.95007000000001,28.708340000000003,false,0],[115.95030000000001,28.708070000000003,false,0],[115.95057000000001,28.70756,false,2],[115.95068,28.707230000000003,false,0],[115.95074000000001,28.706370000000003,false,0],[115.95017000000001,28.701810000000002,false,3],[115.94984000000001,28.70034,false,0],[115.94844,28.695040000000002,false,0],[115.94771000000001,28.691190000000002,false,0],[115.94760000000001,28.690340000000003,false,3],[115.94760000000001,28.689760000000003,false,0],[115.94779000000001,28.688360000000003,false,0],[115.94851000000001,28.68513,false,0],[115.94876000000001,28.68342,false,3],[115.94885000000001,28.680470000000003,false,0],[115.94886000000001,28.677350000000004,false,0],[115.94881000000001,28.674300000000002,false,0],[115.94885000000001,28.6686,false,0],[115.94892000000002,28.666710000000002,false,3],[115.94907,28.665340000000004,false,0],[115.94922000000001,28.66448,false,0],[115.94949000000001,28.663750000000004,false,0],[115.94996,28.66296,false,3],[115.95079000000001,28.661980000000003,false,0],[115.95100000000001,28.661830000000002,false,3],[115.95141000000001,28.66167,false,0],[115.95225,28.661520000000003,false,0],[115.95418000000001,28.661050000000003,false,3],[115.95421,28.660740000000004,false,0],[115.95394,28.659820000000003,false,0],[115.95442000000001,28.659730000000003,false,0],[115.95447000000001,28.659560000000003,false,0],[115.95442000000001,28.659340000000004,false,0],[115.95433000000001,28.659280000000003,false,1]]
//let pcount = 0;
/*
 let testdata = {
 list: [
 {
 latitude: linePts[0][1],
 longitude: linePts[0][0],
 count: 1,
 carNo: '控123456',
 direction: Math.floor(Math.random() * 360),
 travelStatus: parseInt(Math.random() * 3),
 carId: 1
 },
 {
 latitude: 24.1436,
 longitude: 114.78696,
 count: 1,
 carNo: '辽A66666',
 direction: Math.floor(Math.random() * 360),
 travelStatus: parseInt(Math.random() * 3),
 carId: 2
 },{
 latitude: 36.550468,
 longitude: 106.416366,
 count: 1,
 carNo: "辽A88885",
 direction: Math.floor(Math.random() * 360),
 travelStatus: parseInt(Math.random() * 3),
 carId: 3
 },{
 latitude: 26.523801,
 longitude: 109.149699,
 count: 1,
 carNo: "辽A88882",
 direction: Math.floor(Math.random() * 360),
 travelStatus: parseInt(Math.random() * 3),
 carId: 4
 },{
 latitude: 47.110468,
 longitude: 120.883032,
 count: 2,
 carNo: "辽A88882",
 direction: Math.floor(Math.random() * 360),
 travelStatus: parseInt(Math.random() * 3),
 carId: 5
 },{
 latitude: 36.283801,
 longitude: 94.549699,
 count: 1,
 carNo: "辽A88881",
 direction: Math.floor(Math.random() * 360),
 travelStatus: parseInt(Math.random() * 3),
 carId: 6
 }]
 }
 */
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
            detail: null
        }
        this.carStatus = [];
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
        console.info(this.stopRequest)
        console.info('fetch status')
        //queryCarCondition({carId: this.monitorCarId}).then((data) => {
        queryCarCondition(undefined, undefined, this.monitorCarId).then((data) => {
            if (this.stopRequest) return;
            if (this.monitor) {
                this.carStatus = data.list || [];
                this.setState({detail: Object.assign({}, this.state.detail || {}, data.list[0] || {})});
            }
        }).catch(() => {
            console.info('status catch')
        }).finally(() => {
            setTimeout(() => {
                this.fetchStatus();
            }, STATUS_TIMEOUT * 1000);
        })
    }

    //单车车辆信息
    fetchDataSingle() {
        if (this.stopRequest) return;
        if (!this.monitor) return;
        console.info(this.stopRequest)
        console.info('fetch single')
        queryRealTimeCar({carId: this.monitorCarId}).then((data) => {
        //queryRealTimeCar({carId: 10}).then((data) => {
            if (this.stopRequest) return;
            if (this.monitor) {
                Object.assign(data, this.state.data);
                console.info(data)
                //    pcount++;
                /*data = {
                 longitude: linePts[pcount][0],
                 latitude: linePts[pcount][1],
                 count: 1,
                 carCode: '控123456',
                 carNo: '控123456',
                 direction: Math.floor(Math.random() * 360),
                 travelStatus: parseInt(Math.random() * 3),
                 realtimeSpeed: +(Math.random() + 60).toFixed(1),
                 todayLen: +(Math.random() + 30).toFixed(1),
                 position: "辽宁省沈阳市华航大厦",
                 slaveDriver: "李四",
                 mastDriver: "张三",
                 carId: "1234567"
                 };*/
                this.setState({detail: Object.assign({}, this.state.detail || {}, data)});
                //this.setState({detail: data});
                this.list = [data]
                this.setMarker();
                this.carToCenter(data);
            }
        }).catch(() => {
            console.info('single catch')
        }).finally(() => {
            setTimeout(() => {
                this.fetchDataSingle();
            }, TIMEOUT * 1000);
        })
    }

    fetchDataAll(fun) {
        if (this.stopRequest) return;
        if (this.monitor) return;
        console.info(this.stopRequest)
        console.info('fetch all')
        this.Map.getBounds((mapbounds) => {
            let b = mapbounds;
            queryCarPolymerize({
                leftLongitude: b.minLongitude, //左下， 右上
                leftLatitude: b.minLatitude,
                rightLongitude: b.maxLongitude,
                rightLatitude: b.maxLatitude,
                zoom: this.zoom
            }).then((data) => {
                    this.list = data.list || [];
                    this.list.push({
                        "carId": 6,
                        "direction": 11,
                        "latitude": 24.143518,
                        "longitude": 114.786877,
                        "carNo": "闽Z23456",
                        "travelStatus": 2
                    });
                    if (this.stopRequest) return;
                    if (!this.monitor) {
                    this.setMarker();
                    fun && fun();
                }
            }).catch(() => {
                console.info('all catch')
            }).finally(() => {
                setTimeout(() => {
                    this.fetchDataAll();
                }, TIMEOUT * 1000);
            })
        });
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


    componentWillUnmount() {
        this.requestStop();
    }


    setMarker() {
        let list = this.list || [];
        //    console.info(list)
        if (list.length) {
            this.markers.length = this.markers_d.length = 0;
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
        let iconText = data.carNo,
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
            }
        this.markers.push(mkOpts);
        mkOpts = {
            longitude: pt.longitude,
            latitude: pt.latitude,
            id: idx,
            click: true,
            imageName: imageName,
            direction: direction
        }
        this.markers_d.push(mkOpts);
    }


    onInit(instance) {
        this.mapRef = instance.getMapRef();
        this.Map = instance;
        this.MPoint = instance.MPoint;
        this.Marker = instance.Marker;
        this.MarkerRotate = instance.MarkerRotate;
        this.fetchDataAll(() => {
            this.props.nav && this.props.nav.carId && this.readyMonitor(this.props.nav.carId, true);
            //this.props.nav && this.props.nav.carId && this.readyMonitor(, true);
        });
    }

    //去轨迹页面
    goToTrack() {
        this.requestStop();
        this.props.router.push(MonitorMapTrack, {
            nav: {
                carId: this.monitorCarId,
                doBack: () => {
                    console.info('track')
                    this.requestStart();
                }
            }
        })
    }

    //去列表页面
    goToList() {
        this.requestStop();
        this.props.router.replace(Monitor);
    }

    //去车况列表页页
    goToStatus() {
        this.requestStop();
        this.props.router.push(CarStatus, {
            nav: {
                carId: this.monitorCarId,
                carCode: this.state.detail.carCode,
                doBack: () => {
                    console.info('status')
                    this.requestStart();
                }
            }
        });
    }

    onZoomIn(zoom) {
        console.info(zoom, 'onzoomin')
        if (this.zoom < 14) {
            this.zoom = isNaN(zoom) ? this.zoom + 1 : Math.ceil(zoom);
            this.onMapChange();
        }
        console.info(this.zoom, 'onzoomin')
    }

    onSpan() {
        console.info('span');
        this.onMapChange();
    }

    onZoomOut(zoom) {
        console.info(zoom, 'onzoomout')
        if (this.zoom > 0) {
            this.zoom = isNaN(zoom) ? this.zoom - 1 : Math.floor(zoom);
            this.onMapChange();
        }
        console.info(this.zoom, 'onzoomout')
    }

    onMapChange() {
        if (!this.monitor) {
            //    this.clearTimer();
            this.toFetch();
        }
    }

    carToCenter(data) {
        let pt = this.MPoint([data.longitude, data.latitude]);
        this.Map.setCenter(pt);
    }

    readyMonitor(carId, zoom) {
        console.info(arguments)
        console.info('===============================================================================')
        let data = this.list['carId_' + carId];
        console.info(data)
        if (!data) return;
        this.monitorCarId = carId;
        this.setState({data: data});
        if (zoom) {
            this.Map.setZoomLevel(8);
            setTimeout(() => {
                this.carToCenter(data);
            }, 300);
        }
    }

    setMonitor() {
        this.requestStop();
        let monitor = this.monitor = !this.monitor;
        this.setState({monitor: monitor, detail: null});
        if (monitor) {
            let data = this.state.data;
            console.info('monitor, =======================================================')
            console.info(data)
            this.Map.setZoomLevel(8);
            setTimeout(() => {
                this.carToCenter(data);
            }, 300);
        }
        this.requestStart();
        Toast.show(monitor ? '正在开启实时监控' : '已关闭实时监控', Toast.SHORT);
    }

    clickMarker(idx) {
        let data = this.list[idx];
        if (data.count > 1) {
            this.Map.setZoomLevel(++this.zoom);
            setTimeout(() => {
                this.carToCenter(data);
            }, 300);
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
                    ? <StatusDetail data={this.state.detail} onPress={() => {
                    this.goToStatus()
                }}/>
                    : this.state.data ?
                    <View style={[estyle.padding]}>
                        <Text style={[estyle.text, {color: Env.color.note}]}>当前车辆：<Text style={[estyle.text, {color: Env.color.important}]}>{this.state.data.carNo}</Text></Text>
                    </View>
                    : null
            }
        </View>
    }

    renderButton() {
        return this.state.data ?
            <View style={[estyle.fxRow, estyle.borderTop, estyle.paddingVertical]}>
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
            </View> : <ListItem left="选择监控车辆"/>

    }
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="地图模式"
                    rightView={
                        <Button onPress={()=> {
                           this.goToList()
                        }}
                               style={[{height: 90 * Env.font.base}, estyle.paddingLeft]}>
                           <IconList color="#ffffff"/>
                        </Button>
                    }
                />
                <MapbarMap style={[estyle.fx1]}
                           zoom={this.zoom}
                           center={this.center}
                           onZoomIn={(zoom)=> {
                               this.onZoomIn(zoom)
                           }}
                           onZoomOut={(zoom)=> {
                               this.onZoomOut(zoom)
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