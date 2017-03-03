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
    Image,
    Platform
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

const BATCH_TIMEOUT = 30 * 1000,
    SINGLE_TIMEOUT = BATCH_TIMEOUT,
    STATUS_TIMEOUT = 30 * 1000;
export default class MonitorMap extends Component {
    constructor() {
        super();
        this.zoom = 1;
        this.center = {
            longitude: 104.621367,
            latitude: 35.317133
        };
        this.markers = [];  //普通标注
        this.markers_d = [];    //带角度的
        this.list = null;
        this.monitor = false;
        this.mapRef = null;
        this.singleCarId = -1;

        this.commonInfo = {};
        this.monitorInfo = {};
        this.state = {
            batch: false,
            single: false,
            status: false,
            monitor: null,
            animating: true
        }
    }

    componentDidMount() {
        this.toFetchAll();
    }

    componentWillUnmount() {
        this.stopAll();
        this.clearAll();
        this.Map.disposeMap(this.mapRef);
        this.mapRef = null;
        console.info('monitor map finalize')
    }

    stopAll = () => {
        this.stopBatch();
        this.stopSingle();
        this.stopStatus();
    }
    stopBatch = () => {
        this.setState({batch: false});
    }
    stopSingle = () => {
        this.setState({single: false});
    }
    stopStatus = () => {
        this.setState({status: false});
    }

    startBatch = () => {
        console.info('startBatch')
        this.setState({batch: true}, this.fetchBatch);
    }
    startSingle = () => {
        this.setState({single: true}, this.fetchSingle);
    }
    startStatus = () => {
        this.setState({status: true}, this.fetchStatus);
    }

    toFetchAll = () => {
        if(!this.batchTimer) this.batchTimer = setInterval( () => {
            this.state.batch && this.fetchBatch();
        }, BATCH_TIMEOUT);
        if(!this.singleTimer) this.singleTimer = setInterval(() => {
            this.state.single && this.fetchSingle();
        }, SINGLE_TIMEOUT);
        if(!this.statusTimer) this.statusTimer = setInterval(() => {
            this.state.status && this.fetchStatus();
        }, STATUS_TIMEOUT);
    }

    fetchBatch = () => {
        console.info('queryZoom-----', this.zoom)
        this.Map.getBounds().then(mapbounds => {

            //todo 0级别时地图sdk返回经纬度有问题，添加兼容
            let b =  this.zoom ? mapbounds : {
                minLongitude: 72.5, //左下， 右上
                minLatitude: 10.86,
                maxLongitude: 135.05,
                maxLatitude: 53.55,
                zoom: this.zoom
            };
            queryCarPolymerize({
                leftLongitude: b.minLongitude, //左下， 右上
                leftLatitude: b.minLatitude,
                rightLongitude: b.maxLongitude,
                rightLatitude: b.maxLatitude,
                zoom: this.zoom
            }).then((data = {list:[]}) => {
                this.list = data.list;
                this.list.length ? this.setMarker() : Toast.show('没有监控车辆', Toast.SHORT);
            }).catch((e) => {
                console.info('catch batch ----- ', e);
            }).finally(() => {
                this.setState({animating: false});
            })
        });
    }
    //单车车辆信息
    fetchSingle = (init) => {
        queryRealTimeCar({carId: this.singleCarId}).then((data = {}) => {
            if(init) {
                this.setMonitorInfo(data, init);
            } else {
                this.setMonitorInfo(Object.assign(this.commonInfo || {}, data));
            }
        }).catch((e) => {
            Toast.show('获取单车监控信息异常', Toast.SHORT);
            console.info('catch single ----- ', e);
        }).finally(() => {
            this.setState({animating: false});
        });
    }

    fetchStatus = () => {
        queryCarCondition(undefined, undefined, this.singleCarId).then((data = {list:[]}) => {
            let info = Object.assign(this.commonInfo, data.list[0] || {});
            this.setMonitorInfo(info);
        }).catch(() => {
            Toast.show('获取状态列表异常', Toast.SHORT);
            console.info('catch status ----- ', e);
        });
    }

    setMonitorInfo(data, init) {
        data.longitude = data.longitude || data.lon;
        data.latitude = data.latitude || data.lat;
        data.carNo = data.carNo || data.carCode;
        data.count = 1;
        this.list = [data];
        console.info('data-------')
        console.info(data)
        this.setMarker();
        if(init) {
            this.commonInfo = data;
            setTimeout(this.startBatch, 500);
        } else {
            this.monitorInfo = data;
        }
        this.carToCenter(data);
        this.setState({refreshInfo: Math.random()});
    }

    setCommonInfo = (carId) => {
        let data = this.list['carId_' + carId];
        console.info('setCommonInfo', carId, data);
        if (!data) return;
        this.singleCarId = carId;
        this.commonInfo = data;
        this.setState({refreshInfo: Math.random()});
    }

    



    clearAll = () => {
        clearInterval(this.batchTimer);
        clearInterval(this.singleTimer);
        clearInterval(this.statusTimer);
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
            console.info('清理旧标注')
            this.Map.clearOverlays();
            console.info('添加新标注')
            console.info(this.markers)

            this.Marker.add(this.markers);
            this.MarkerRotate.add(this.markers_d);
        }
    }

    addMarkerOpts(data, idx) {
        console.info(data, 'data')
        let iconText = data.carNo || data.carCode,
            ity = Env.marker.car.iconTextY,
            oy = Env.marker.car.offsetY,
            imageName = "9100" + data.travelStatus,
            direction = 360 - data.direction;
        if (data.count && data.count > 1) {
            iconText = data.count.toString();
            direction = 0;
            imageName = '910026';
            ity = .5;
            oy = .5;
        }
        let pt = this.MPoint([data.longitude, data.latitude]),
            mkOpts = {
                ...Env.marker.car,
                longitude: pt.longitude,
                latitude: pt.latitude,
                iconText: iconText,
                id: idx,
                click: true,
                iconTextY: ity,
                offsetY: oy
            };
        if (data.count && data.count > 1) {
            let emimage = '910000';
            mkOpts.imageName = `${Env.marker.icon.pre}${emimage}`
        }

        this.markers.push(mkOpts);
        mkOpts = {
            longitude: pt.longitude,
            latitude: pt.latitude,
            id: idx,
            click: true,
            imageName: `${Env.marker.icon.resPre}${imageName}${Env.marker.icon.resSuf}`,
            direction: direction
        };
        this.markers_d.push(mkOpts);
    }


    onInit = (instance) => {
        console.info('monitor map init')
        this.mapRef = instance.getMapRef();
        this.Map = instance;
        this.MPoint = instance.MPoint;
        this.Marker = instance.Marker;
        this.MarkerRotate = instance.MarkerRotate;
        console.info('this.props.nav')
        console.info(this.props.nav)
        let single = this.props.nav && this.props.nav.carId;
        if(single) {
            this.singleCarId = this.props.nav.carId;
            this.Map.setZoomLevel(8);
            this.fetchSingle(true);
        } else {
            this.startBatch();
        }

    }

    revert = () => {
        setTimeout(() => {
            if(this.state.monitor) {
                this.startSingle();
                this.startStatus();
            } else {
                this.startBatch();
            }
        }, 500);
    }
    //去轨迹页面
    goToTrack = () => {
        this.stopAll();
        let data = this.commonInfo;
        this.props.router.push(MonitorMapTrack, {
            nav: {
                carCode: data.carCode || data.carNo,
                carId: this.singleCarId,
                doBack: this.revert
            }
        })
    }

    //去列表页面
    goToList = () => {
        this.props.router.replace(Monitor);
    }

    //去车况列表页页
    goToStatus = () => {
        this.stopAll();
        let data = this.commonInfo;
        this.props.router.push(CarStatus, {
            nav: {
                carCode: data.carCode || data.carNo,
                carId: this.singleCarId,
                doBack: this.revert
            }
        });
    }
    onMapChange = (zoom) => {
        console.info('onMapChange', zoom)
        this.zoom = isNaN(zoom) ? this.zoom : zoom;
        this.state.batch && this.fetchBatch();
        this.state.single && this.fetchSingle();
        this.state.status && this.fetchStatus();
    }

    carToCenter(data) {
        setTimeout(() => {
            let pt = this.MPoint([data.longitude, data.latitude]);
            this.Map.setCenter(pt);
        }, 300);
    }
    openMonitor = () => {
        this.stopAll();
        setTimeout(() => {
            let monitor = this.monitor = !this.monitor;
            if (monitor) {
                let data = {...this.commonInfo};
                this.Map.setZoomLevel(8);
                this.monitorInfo = data;
                this.startSingle();
                this.startStatus();
            } else {
                this.startBatch();
            }
            Toast.show(monitor ? '正在开启实时监控' : '已关闭实时监控', Toast.SHORT);
            this.setState({refreshInfo: Math.random(), monitor: monitor});
        }, 500);
    }

    clickMarker = (idx) => {
        let data = this.list[idx];
        if (data.count > 1) {
            this.Map.zoomIn();
            this.carToCenter(data);
        } else {
            this.setCommonInfo(data.carId);
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
    renderCommonView = () => {
        let data = this.commonInfo;
        return <View style={[estyle.padding, estyle.fxRow]}>
            <Text style={[estyle.text, {color: Env.color.note}]}>当前车辆：</Text><Text
            style={[estyle.text, {color: Env.color.important}]}>{data.carNo}</Text>
        </View>;
    }
    renderStatusView = () => {
        let data = this.monitorInfo;
        return <StatusDetail data={data} onPress={this.goToStatus}/>
    }

    renderInfo = () => {
        return this.state.monitor ? this.renderStatusView() : this.renderCommonView();
    }
    renderButton() {
        let refreshInfo = this.state.refreshInfo,
            bottomLine = <View style={[{height:1}]}/>;
        return refreshInfo ? <View style={[estyle.fxRow,estyle.cardBackgroundColor, estyle.borderTop, estyle.paddingVertical, {zIndex:100}]}>
            <Button style={[estyle.fx1, estyle.borderRight, estyle.fxRow, estyle.fxCenter]} onPress={this.openMonitor}>
                <IconClock color={Env.color.main} size={Env.font.base * 38}/>
                <Text style={[estyle.text, {marginLeft: Env.font.base * 10}]}>{this.state.monitor ? '关闭' : '开启'}实时监控</Text>
            </Button>
            <Button style={[estyle.fx1, estyle.fxCenter, estyle.fxRow]} onPress={this.goToTrack}>
                <IconLocation color={Env.color.main} size={Env.font.base * 38}/>
                <Text style={[estyle.text, {marginLeft: Env.font.base * 10}]}>轨迹回放</Text>
            </Button>
        </View> : bottomLine;
    }

    renderAi () {
        let height = this.state.animating ? Env.screen.height / 3 : 0;
        return <View style={{position:'absolute', zIndex:10, width: Env.screen.width, height: height, marginTop:Env.screen.height / 3 * Env.font.base}}>
            <ActivityIndicator animating={this.state.animating} color={[Env.color.main]} size="large"/>
        </View>
    }
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="实时监控"
                           rightView={
                               <Button onPress={this.goToList} style={estyle.topBtn}>
                                   <IconList color="#ffffff"/>
                               </Button>
                           }
                />
                {this.renderAi()}
                <MapbarMap style={[estyle.fx1]}
                           center={this.center}
                           onInit={this.onInit}
                           onZoomIn={this.onMapChange}
                           onZoomOut={this.onMapChange}
                           onSpan={this.onMapChange}
                           clickMarker={this.clickMarker}
                           router={this.props.router}
                           legend={this.renderLegend()}/>

                {this.state.refreshInfo && this.renderInfo()}
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