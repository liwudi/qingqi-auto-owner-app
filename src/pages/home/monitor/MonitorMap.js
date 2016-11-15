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
import Button from '../../../components/widgets/Button';

import {IconList} from '../../../components/Icons';
import MyCarItem from '../my-car/components/MyCarItem';


import MapbarMap from '../../../mapbarmap/MapbarMap';

/*海量打点， 单车*/
import {queryCarPolymerize} from '../../../services/MonitorService';
import Env from '../../../utils/Env';
import Monitor from './Monitor';
const estyle = Env.style;
const legend = [
    {
        value:'行驶',
        color:Env.color.main
    },
    {
        value:'怠速',
        color:Env.color.auxiliary
    },
    {
        value:'离线',
        color:Env.color.note
    }
];
const TIMEOUT = 30;

export default class MonitorMap extends Component {
    constructor() {
        super();
        this.zoom = 0;
        this.center = {
            longitude: 104.621367,
            latitude: 35.317133
        }
        this.markers = [];  //普通标注
        this.markers_d = [];    //带角度的
    }

    fetchData() {
        this.Map.getBounds((mapbounds) => {
            let b = mapbounds;
            console.info(b)
            console.info(this.zoom)
            console.info('----------------------------------------------query')
            queryCarPolymerize({
                leftLongitude: b.minLongitude, //左下， 右上
                leftLatitude: b.minLatitude,
                rightLongitude: b.maxLongitude,
                rightLatitude: b.maxLatitude,
                zoom: this.zoom
            }).then((data) => {
                this.setMarker(data);
            }).catch().finally(()=>{
                this.clearTimer();
                this.timer = setTimeout(() => {
                    this.fetchData();
                },TIMEOUT * 1000);
            });
        });
    }
    clearTimer() {
        this.timer = clearTimeout(this.timer);
        this.timer = null;
    }
    componentWillUnmount() {
        this.clearTimer();
    }
    setMarker(data) {
        let list = data || [];
        console.info(list)
        if(list.length) {
            this.markers.length = this.markers_d.length = 0;
            list.forEach((item, idx) => {
                this.addMarkerOpts(item, idx);
            });
            this.Map.clearOverlays();
            this.Marker.add(this.markers);
            this.MarkerRotate.add(this.markers_d);
        }
    }
    addMarkerOpts(data, idx) {
        let pt = this.MPoint([data.longitude, data.latitude]),
            mkOpts = {
                longitude: pt.longitude,
                latitude: pt.latitude,
                title: data.count > 1 ? '' : data.carNo,
                imageName: "res/icons/mask.png",
                iconText: data.count > 1 ? data.count : '',
                iconTextColor: Env.color.main,
                iconTextSize: 14,
                id: idx,
                offsetX: .5,
                offsetY: 1,
                click: true,
                callOut: true
            }
        this.markers.push(mkOpts);
        data.travelStatus = parseInt(Math.random() * 3);
        data.direction = Math.floor(Math.random() * 100);
        mkOpts = {
            longitude: pt.longitude,
            latitude: pt.latitude,
            id: idx,
            click: true,
            imageName: "res/icons/c100" + data.travelStatus + ".png",
            direction: data.direction
        }
        this.markers_d.push(mkOpts);
    }


/*    updateMarkerOpts(data) {
        let pt = this.MPoint([data.longitude, data.latitude]),
            mkOpts = {
                longitude: pt.longitude,
                latitude: pt.latitude,
                id: this.MarkerId
            };
            this.markers.push(mkOpts);
        let d = Math.floor(Math.random() * 100);
        mkOpts = {
            longitude: pt.longitude,
            latitude: pt.latitude,
            id: this.MarkerId,
            imageName: "res/icons/c100" + data.travelStatus + ".png",
            direction: d
        };
        this.markers_d.push(mkOpts);
    }*/

    componentDidMount() {
        //this.fetchData();
    }

    renderLegend () {
        return <View style={[styles.legendView, estyle.padding, {paddingBottom:Env.font.base * 10}]}>
            {legend.map((item, index) =>
                <View style={[styles.legendItem, {paddingBottom:Env.font.base * 10}]} key={index}>
                    <View style={[{backgroundColor: item.color, width: Env.font.base * 20, height: Env.font.base * 20, borderRadius:100}, estyle.marginRight]}/>
                    <Text style={[styles.legendText]}>{item.value}</Text>
                </View>
            )}
        </View>
    }
    onInit(instance) {
        this.Map = instance;
        this.MPoint = instance.MPoint;
        this.Marker = instance.Marker;
        this.MarkerRotate = instance.MarkerRotate;
        this.fetchData();
    }
    goToList() {
        this.props.router.replace(Monitor);
    }
    onZoomIn(zoom) {
        if(this.zoom < 14) {
            this.zoom = isNaN(zoom) ? this.zoom + 1 : Math.ceil(zoom);
            this.onZoomChange();
        }
        console.info(this.zoom, 'onzoomin')
    }

    onZoomOut(zoom) {
        if(this.zoom > 0) {
            this.zoom = isNaN(zoom) ? this.zoom - 1 : Math.floor(zoom);
            this.onZoomChange();
            //this.fetchData();
        }
        console.info(this.zoom, 'onzoomout')
    }
    onZoomChange() {
        this.clearTimer();
        this.fetchData();
    }

    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="地图模式"
                           rightView={
                               <Button onPress={()=> {this.goToList()}}
                                       style={[{height:90 * Env.font.base}, estyle.paddingLeft]}>
                                   <IconList color="#ffffff"/>
                               </Button>
                           }
                />
                <MapbarMap zoom={this.zoom}
                           center={this.center}
                           onZoomIn={(info)=>{this.onZoomIn(info)}}
                           onZoomOut={(info)=>{this.onZoomOut(info)}}
                           onInit={(instance)=> {this.onInit(instance);}}
                           legend={this.renderLegend()}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    legendItem:{
        flexDirection:'row',
        alignItems:'center'
    },
    legendText:{
        color:'#FFF',
        fontSize:Env.font.note
    },

    legendView : {
        position:'absolute',
        backgroundColor:Env.color.modalBg,
        bottom: Env.font.base * 30,
        right: Env.font.base * 150,
        borderRadius:Env.font.base * 10,
        padding:Env.font.base * 10
    }
});