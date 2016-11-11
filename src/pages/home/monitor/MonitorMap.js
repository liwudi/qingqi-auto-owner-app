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
const MapView = require('../../../MapView');
var module = NativeModules.MapbarMapModule;
import {IconList} from '../../../components/Icons';

import Env from '../../../utils/Env';
const estyle = Env.style;

export default class MonitorMap extends Component {
    constructor() {
        super();
        this.state = {
            zoom: 8,
            center: {
                longitude: 11595380,//2868291,11595380
                latitude: 2868291
            },
            isZoom: true,
            isMove: true,
            isRotate: true,
            forbidGesture: true,
        }
    }

    fillMap() {
        return <MapView
            zoomLevel={this.state.zoom}
            worldCenter={this.state.center}
            forbidGesture={this.state.forbidGesture}
            isZoom={this.state.isZoom}
            isMove={this.state.isMove}
            isRotate={this.state.isRotate}
            ref="mapView"
        />;
    }

    componentDidMount() {
        setTimeout(() => {
            console.info('map load')
            this.setState({fill: true});
        }, 2000);

    }

    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="地图模式"/>
                {this.state.fill && this.fillMap()}
            </View>
        );
    }

    componentWillUnmount() {
        console.info('map delete')
        module.onDestroyMap(0);
    }
}