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

import Toast from '../../../../components/Toast';
import MapbarMap from '../../../../mapbarmap/MapbarMap';
import * as Icons from '../../../../components/Icons';
import PlayView from './PlayView';
import * as DateUtil from '../../../../utils/Date';
import Env from '../../../../utils/Env';
const estyle = Env.style;

let line = null;

const STATE_STOPING = 1;//状态 播放停止
let state = STATE_STOPING;

import Decode from './Decode';
import SpeedLine from './SpeedLine';
import OilLine from './OilLine';


const PLAY_TYPE_SPEED = 0;
const PLAY_TYPE_OIL = 1;

const legend = {
    0: [
        {
            value: '0~30km/h',
            color: '#FFBA25'
        },
        {
            value: '30~60km/h',
            color: '#3EB6AD'
        },
        {
            value: '60~80km/h',
            color: '#02B9F2'
        },
        {
            value: '80~100km/h',
            color: '#FF8400'
        },
        {
            value: '>100km/h',
            color: '#FF1E1E'
        }
    ],
    1: [
        {
            value: '0-10L/100km',
            color: '#99CC59'

        },
        {
            value: '10-20L/100km',
            color: '#3EB6AD'
        },
        {
            value: '20-30L/100km',
            color: '#02B9F2'
        },
        {
            value: '30-40L/100km',
            color: '#FF8400'
        },
        {
            value: '>40L/100km',
            color: '#FF1E1E'
        }
    ]
}



// 根据两个坐标获取连线的角度
function getAngle(pt1, pt2) {
    var angle = 0;
    if (pt1 && pt2) {
        var lon1 = pt1.lon,
            lat1 = pt1.lat,
            lon2 = pt2.lon,
            lat2 = pt2.lat;

        var xDiff = lon2 - lon1,
            yDiff = lat2 - lat1;

        angle = Math.atan(xDiff / (yDiff || 1)) / Math.PI * 180;


        if (xDiff > 0 && yDiff < 0) {
            angle = 180 + angle;
        } else if (xDiff < 0 && yDiff < 0) {
            angle = angle - 180;
        }

    }
    return angle;
}

export default class MapLine extends Component {
    constructor() {
        super();
        this.zoom = 0;
        this.center = {
            longitude: 104.621367,
            latitude: 35.317133
        };
        this.state = {
            showLegend: false,
            playType: PLAY_TYPE_SPEED,
            startTime: null,
            endTime: null,
            currentTime: null
        };
        this.carIdx = parseInt(Math.random() * 100);
        this.playType = PLAY_TYPE_SPEED;
        this.lineBounds = null;
        this.pointIndex = 0;
    }

    initLine(data) {
        this.Map && this.Map.clearOverlays();
        if(data) {
        //    console.info(data)
            data = Decode.setData(data);
            if(data.length) {
                line = data;
                this.setState({dataLength: data.length});
                this.addLine();
                this.addMarker();
                this.addCar();

                this.setTimes();
                this.setBounds();
            }
        }
    }
    addLine() {
        this.Line.clear();
        if (this.playType === PLAY_TYPE_SPEED) {
            this.addLineSpeed();
        } else {
            this.addLineOil();
        }
        this.moveCar(this.pointIndex);
    }
    setTimes() {
        if(!this.state.startTime) {
            let stime = line[0].time,
                etime = line[line.length - 1].time
            this.setState({
                startTime: stime,
                endTime: etime,
                totalTime: etime - stime
            });
        }
    }
    setCurrentTimes(index) {
        this.setState({
            currentTime: line[index].time
        });
    }
    setBounds() {
        if(!this.lineBounds) {
            this.lineBounds = Decode.bounds();
            setTimeout(() => {
                this.Map.setBounds(this.lineBounds.min, this.lineBounds.max);
            }, 300)
        }
    }

    addLineSpeed() {
        let lines = SpeedLine.get(line);
        this.Line.add(lines);
    }
    addLineOil(){
        let lines = OilLine.get(line);
        this.Line.add(lines);
    }

    addMarker() {
        let list = [line[0], line[line.length - 1]],
            pts = [],
            markers = [];
        list.forEach((item, idx) => {
            let imageName = idx ? "ic_end" : "ic_start",
                pt = item;
                mkOpts = {
                    longitude: pt.longitude,
                    latitude: pt.latitude,
                    imageName: imageName,
                    iconText: '',
                    iconTextColor: Env.color.main,
                    iconTextSize: 14,
                    id: idx,
                    offsetX: .5,
                    offsetY: .8,
                    click: true
                }
            markers.push(mkOpts);
            pts.push(pt);
        });
        this.Marker.add(markers);
    }

    addCar() {
        let pt = line[0];
        let title = this.playType === PLAY_TYPE_SPEED ? pt.speed : pt.o,
            unit = this.playType === PLAY_TYPE_SPEED ? 'km/h': 'L/100km';
        title = title + unit;
        let mkOpts = {
            longitude: pt.longitude,
            latitude: pt.latitude,
            title: '',
            imageName: 'ic_mask',
            iconText: title,
            iconTextColor: Env.color.main,
            iconTextSize: 14,
            id: this.carIdx,
            offsetX: .5,
            offsetY: 17,
            click: true
        };
        this.Marker.add([mkOpts]);

        mkOpts = {
            longitude: pt.longitude,
            latitude: pt.latitude,
            id: this.carIdx,
            title: '',
            click: true,
            imageName: "res/icons/c1002.png",
            direction: pt.direction
        };
        this.MarkerRotate.add([mkOpts]);
        this.setCurrentTimes(0);
    }

    moveCar(index) {
        this.pointIndex = index;
        let pt = line[index];
        let title = this.playType === PLAY_TYPE_SPEED ? pt.speed : pt.oil,
            unit = this.playType === PLAY_TYPE_SPEED ? 'km/h': 'L/100km';
        title = title + unit;
     //   console.info(title)
        let mkOpts = {
            longitude: pt.longitude,
            latitude: pt.latitude,
            imageName: 'ic_mask',
            title: title,
            iconText: title,
            iconTextColor: Env.color.main,
            iconTextSize: 14,
            id: this.carIdx
        };
        this.Marker.update([mkOpts]);
        mkOpts = {
            longitude: pt.longitude,
            latitude: pt.latitude,
            id: this.carIdx,
            direction: pt.direction
        };
        this.MarkerRotate.update([mkOpts]);
        this.setCurrentTimes(index);
    }

    onInit(instance) {
        this.mapRef = instance.getMapRef();
        this.Map = instance;
        this.MPoint = instance.MPoint;
        this.Marker = instance.Marker;
        this.MarkerRotate = instance.MarkerRotate;
        this.Line = instance.Line;
        this.initLine(this.props.data);
    }

    componentWillUnmount() {
        this.Map.finalize();
    }

    componentWillReceiveProps(props) {
   //     console.info(this.rnTime, props.time)
        if(this.rnTime != props.time) {
/*            console.info('*****************************************************************')
            console.info('---------------------------------------------------------------')*/
            this.initLine(props.data);
            this.rnTime = props.time;
        }
    }

    changePlayType() {
        if (this.state.playType === PLAY_TYPE_SPEED) {
            this.playType = PLAY_TYPE_OIL;
            Toast.show(`已切换到油耗模式`, Toast.SHORT);
        } else {
            this.playType = PLAY_TYPE_SPEED;
            Toast.show(`已切换到速度模式`, Toast.SHORT);
        }
        this.setState({playType: this.playType});
        this.state.dataLength && this.addLine();
    }

    renderLegend() {
        return <View style={styles.legendView}>
            {legend[this.state.playType].map((item, index) =>
                <View style={[styles.legendItem]} key={index}>
                    <View style={[styles.legendColor, {backgroundColor: item.color}]}/>
                    <Text style={styles.legendText}>{item.value}</Text>
                </View>
            )}
        </View>;
    }

    renderTypeBtn() {
        return <View style={[styles.controlView, {bottom: Env.font.base * 130}]}>
            <TouchableOpacity
                onPress={() => this.changePlayType()}
                style={[styles.controlButton]}>
                {
                    this.state.playType === PLAY_TYPE_SPEED
                        ? <Icons.IconSpeed size={Env.font.base * 60}/>
                        : <Icons.IconDrums size={Env.font.base * 60}/>
                }
            </TouchableOpacity>
        </View>;
    }

    renderTimes() {
        return this.state.startTime ? <View style={[estyle.fxRow,estyle.fxCenter,estyle.paddingHorizontal,{paddingLeft:70,marginTop:-10,paddingBottom:5}]}>
            <Text style={[estyle.text]}>{DateUtil.format(this.state.startTime,'MM-dd hh:mm')}</Text>
            <Text style={[estyle.fx1,estyle.text,{textAlign:'center',color:Env.color.main}]}>{DateUtil.format(this.state.currentTime,'MM-dd hh:mm')}</Text>
            <Text style={[estyle.text]}>{DateUtil.format(this.state.endTime,'MM-dd hh:mm')}</Text>
        </View> : null
    }

    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                {
                    this.state.dataLength ? <PlayView
                        dataLength={this.state.dataLength}
                        totalTime={this.state.totalTime}
                        play={(index) => {
                            this.moveCar(index);
                        }} pause={() => {
                        this.pauseMoveCar()
                    }}/> : null
                }
                {this.state.dataLength ? this.renderTimes() : null}

                <MapbarMap legend={this.renderLegend()}
                           center={this.center}
                           zoom={this.zoom}
                           onInit={(instance)=> {
                               this.onInit(instance);
                           }}
                />
                {this.renderTypeBtn()}
                {this.props.totalView || null}
                {this.props.rightButtomView || null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    controlView: {
        position: 'absolute',
        bottom: Env.font.base * 330,
        right: Env.font.base * 30,
        borderRadius: Env.font.base * 10,
        ...estyle.border,
        backgroundColor: '#FFF',
        borderWidth: 1
    },
    controlButton: {
        width: Env.font.base * 80,
        height: Env.font.base * 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    legendView: {
        position: 'absolute',
        backgroundColor: Env.color.modalBg,
        bottom: Env.font.base * 30,
        right: Env.font.base * 150,
        borderRadius: Env.font.base * 10,
        padding: Env.font.base * 10
    },
    legendItem: {
        flexDirection: 'row',
        padding: Env.font.base * 4,
        alignItems: 'center'
    },
    legendColor: {
        width: Env.font.base * 30,
        height: Env.font.base * 30,
        backgroundColor: 'blue',
        borderRadius: Env.font.base * 4,
        marginRight: Env.font.base * 10
    },
    legendText: {
        color: '#FFF',
        fontSize: Env.font.note
    }
});