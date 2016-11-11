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
const legend = {
    0:[
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
    ]
}
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
            showLegend: true
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
        console.info('map load')
        this.setState({fill: true});
    }

    renderLegend () {
        return this.state.showLegend && <View style={[styles.legendView, estyle.padding, {paddingBottom:Env.font.base * 10}]}>
                {legend[0].map((item, index) =>
                    <View style={[styles.legendItem, {paddingBottom:Env.font.base * 10}]} key={index}>
                        <View style={[{backgroundColor: item.color, width: Env.font.base * 20, height: Env.font.base * 20, borderRadius:100}, estyle.marginRight]}/>
                        <Text style={[styles.legendText]}>{item.value}</Text>
                    </View>
                )}
            </View>
    }
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="地图模式"/>
                {this.state.fill && this.fillMap()}
                {this.renderLegend()}
            </View>
        );
    }

    componentWillUnmount() {
        console.info('map delete')
        module.onDestroyMap(0);
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