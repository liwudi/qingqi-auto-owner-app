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
    Image,
    Platform
} from "react-native";

import Toast from '../../../../components/Toast';
import MapbarMap from '../../../../mapbarmap/MapbarMap';
import * as Icons from '../../../../components/Icons';
import PlayView from './PlayView';
import * as DateUtil from '../../../../utils/Date';
import Env from '../../../../utils/Env';
const estyle = Env.style;

let line = [];
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



export default class MapLine extends Component {
    constructor() {
        super();
        this.initZoom = 1;
        this.zoom = this.initZoom;
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

    clearMap() {
        SpeedLine.clear();
        this.Map && this.Map.clearOverlays();
        line = [];
        this.dataLength = 0;
    }

    initLine(data) {
        if(data.noResult) return;

        setTimeout(() => {
            line = data = Decode.setData(data);
            if (data.length) {
                this.dataLength = data.length;
                this.setState({progress: 0});
                this.lineBounds = Decode.getBounds();
                this.Map.setBounds(this.lineBounds.min, this.lineBounds.max);

                this.addMarker();
                this.addCar();

                this.setTimes();
                this.addLine(true);
            }
        }, 500);
    }

    onInit(instance) {
        this.mapRef = instance.getMapRef();
        this.Map = instance;
        this.MPoint = instance.MPoint;
        this.Marker = instance.Marker;
        this.MarkerRotate = instance.MarkerRotate;
        this.Line = instance.Line;
        this.setState({initMap: true});
    }
    shouldComponentUpdate(props, state) {
        let result = props.data && state.initMap;
        if(result) {
        //    console.info('--------------------------------------')
        //    console.info(props.data)
            if (this.rnTime !== props.time) {
                this.rnTime = props.time;
                this.clearMap();
                this.setState({time: this.rnTime, progress: 0});
            //    console.info(props.data.noResult, 'noResult')


                this.initLine(Object.assign({},props.data));
            }
        }
        return true;

    }
    componentWillReceiveProps(props) {

    }

    setTimes() {
        let stime = line[0].time,
            etime = line[line.length - 1].time;
        this.setState({
            startTime: stime,
            endTime: etime,
            totalTime: etime - stime
        });
        this.setCurrentTimes(0);
    }

    setCurrentTimes(index) {
        if(line[index]) {
            this.setState({
                currentTime: line[index].time
            });
        }
    }


    onZoomChange(zoom) {
        this.zoom = zoom;
        this.addLine();
    }

    addLine(paint) {
        if(this.dataLength) {
            let lines = SpeedLine.get(line, this.zoom, !!paint, this.playType);
            if (lines.length) {
                this.Line.clear();
                this.Line.add([lines.shift()]);
                lines.length && this.Line.add(lines);
                this.moveCar(this.pointIndex);
            }
        }
    }


    addMarker() {
        let s = Object.assign({}, line[0]),
            e = Object.assign({}, line[line.length - 1]);
        let list = [s, e],
            pts = [],
            markers = [],
            textColor = Platform.OS === 'ios' ? Env.color.main.replace('#','') : Env.color.main;

        list.forEach((item, idx) => {
            let imageName = idx ? "10020" : "10010",
                pt = item;
            mkOpts = {
                longitude: pt.longitude,
                latitude: pt.latitude,
                title: '',
                imageName: Platform.OS === 'ios' ? imageName : 'and_' + imageName,
                iconText: '',
                iconTextColor: textColor,
                iconTextSize: 14,
                iconTextY:0,
                iconTextX:0,
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
        let pt = Object.assign({}, line[0]);
        let title = this.playType === PLAY_TYPE_SPEED ? pt.speed : pt.o,
            unit = this.playType === PLAY_TYPE_SPEED ? 'km/h' : 'L/100km',
            textColor = Platform.OS === 'ios' ? Env.color.main.replace('#','') : Env.color.main;
        title = title + unit;
        let mkOpts = {
            longitude: pt.longitude,
            latitude: pt.latitude,
            title: '',
            imageName: Platform.OS === 'ios' ? '910000' : 'and_0',
            iconText: title,
            iconTextColor: textColor,
            iconTextSize: Platform.OS === 'ios' ? 18 : 14,
            id: this.carIdx,
            offsetX: .5,
            offsetY: .5,
            iconTextX: .5,
            iconTextY: -.35,
            callOut: false,
            click: true
        };
        this.Marker.add([mkOpts]);
       // console.info(mkOpts)
        mkOpts = {
            longitude: pt.longitude,
            latitude: pt.latitude,
            imageName: Platform.OS === 'ios' ? '91002' : 'res/icons/91002.png',
            iconTextColor: textColor,
            iconTextSize: 14,
            click: true,
            id: this.carIdx,
            direction: pt.direction
        };
      //  console.info(mkOpts)
        this.MarkerRotate.add([mkOpts]);
        this.setCurrentTimes(0);
    }

    moveCar(index) {
        //if(index <= 0) index = 0;
    //    console.info('-------------------------------------------------------', index)
        this.pointIndex = index;
        if(line[index]) {
            let pt = Object.assign({}, line[index]);
        //    console.info(pt)
            let title = this.playType === PLAY_TYPE_SPEED ? pt.speed : pt.oil,
                unit = this.playType === PLAY_TYPE_SPEED ? 'km/h' : 'L/100km',
                npt = index === line.length - 1 ? line[index] : line[index + 1],
                textColor = Platform.OS === 'ios' ? Env.color.main.replace('#','') : Env.color.main;
            title = title + unit;
            //   console.info(title)
            let mkOpts = {
                iconTextX: .5,
                iconTextY: -.35,
                longitude: pt.longitude,
                latitude: pt.latitude,
                iconText: title,
                iconTextColor: textColor,
                iconTextSize: Platform.OS === 'ios' ? 18 : 14,
                id: this.carIdx
            };
        //    console.info('------------------', 'move car')
        //    console.info(mkOpts)

            this.Marker.update([mkOpts]);
            mkOpts = {
                longitude: pt.longitude,
                latitude: pt.latitude,
                imageName: Platform.OS === 'ios' ? '91002' : 'res/icons/91002.png',
                id: this.carIdx,
                direction: pt.direction
            };
        //    console.info(mkOpts)

            this.MarkerRotate.update([mkOpts]);
            this.setCurrentTimes(index);
        }

    }

    componentWillUnmount() {
        this.Map.disposeMap(this.mapRef);
        SpeedLine.clear();
        line = [];
        this.dataLength = 0;
        this.mapRef = null;
        this.rnTime = null;
        this.data = null;
    }



    changePlayType() {
    //    console.info(this.playType)
        this.changeTimer && clearTimeout(this.changeTimer);
        this.changeTimer = setTimeout(() => {
            if (this.state.playType === PLAY_TYPE_SPEED) {
                this.playType = PLAY_TYPE_OIL;
                Toast.show(`已切换到油耗模式`, Toast.SHORT);
            } else {
                this.playType = PLAY_TYPE_SPEED;
                Toast.show(`已切换到速度模式`, Toast.SHORT);
            }
            this.Line.clear();
            this.setState({playType: this.playType});
            this.addLine(true);
        }, 500);

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
        return this.state.startTime ? <View style={[estyle.fxRow, estyle.fxCenter, estyle.paddingHorizontal, {
            paddingLeft: 70,
            marginTop: -10,
            paddingBottom: 5
        }]}>
            <Text style={[estyle.text]}>{DateUtil.format(this.state.startTime, 'MM-dd hh:mm')}</Text>
            <Text style={[estyle.fx1, estyle.text, {
                textAlign: 'center',
                color: Env.color.main
            }]}>{DateUtil.format(this.state.currentTime, 'MM-dd hh:mm')}</Text>
            <Text style={[estyle.text]}>{DateUtil.format(this.state.endTime, 'MM-dd hh:mm')}</Text>
        </View> : null
    }

    render() {
    //    console.info(this.state)
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                {
                    <PlayView
                        dataLength={this.dataLength}
                        totalTime={this.state.totalTime}
                        progress={this.state.progress}
                        time={this.state.time}
                        play={(index) => {
                            this.moveCar(index);
                        }} pause={() => {
                        this.pauseMoveCar()
                    }}/>
                }

                {this.dataLength ? this.renderTimes() : null}

                <MapbarMap legend={this.renderLegend()}
                           zoom={this.initZoom}
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
                           router={this.props.router}
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