/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NativeModules,
    findNodeHandle,
    NativeAppEventEmitter,
    TouchableHighlight


} from 'react-native';

import MapView from  './MapView';
const MyViewManager = NativeModules.MapViewManager;
import * as instance from './MapbarMapInstance';
import Toast from '../components/Toast';


let a = 0;
let lastTag = 0;
const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
import Env from '../utils/Env';
import Button from '../components/widgets/Button';
import * as Icons from '../components/Icons';
const estyle = eStyles = Env.style;
export default class MapbarMap extends Component {
    constructor() {
        super();
        this.maxMapLevel = 14;
        this.options = {
            zoom: 2,
            center: {
                longitude: 115.95380,//2868291,11595380
                latitude: 28.68291
            },
            isZoom: true,
            isMove: true,
            isRotate: true,
            forbidGesture: false,
            showZoomController: true
        }
        this.state = {
            showLegend: false
        }
        this.zoomTimer = null;
    }
    zoomIn() {
        this.zoomTimeout(() => {
            instance.getZoomLevel().then((zoom) => {
                instance.zoomIn();
                this.onZoomIn(+zoom + 1);
            });
        })
    }

    zoomOut() {
        this.zoomTimeout(() => {
            instance.getZoomLevel().then((zoom) => {
                instance.zoomOut();
                this.onZoomOut(+zoom - 1);
            });
        })
    }

    zoomTimeout(fun, timeout) {
        this.zoomTimer && clearTimeout(this.zoomTimer);
        this.zoomTimer = setTimeout(fun, timeout ||500);
    }
    onZoom(zoom) {
        console.info('zoom change', zoom)
   /*     let _zoom = this.zoom;
        this.zoom = zoom;
        if(zoom > _zoom) {
            this.onZoomOut(zoom);
        } else if(zoom < _zoom) {
            this.onZoomIn(zoom);
        }*/
    }

    onZoomIn(zoom) {
            console.info('onZoomIn', zoom)
        this.zoomTimeout(() => {
            this.zoom = zoom;
            if (zoom >= this.maxMapLevel) Toast.show('已经是最大级别', Toast.SHORT);
            this.props.onZoomIn && this.props.onZoomIn(Math.ceil(zoom));
        }, 300);
    }

    onZoomOut(zoom) {
            console.info('onZoomOut', zoom)
        this.zoomTimeout(() => {
            this.zoom = zoom;
            if (zoom == 0) Toast.show('已经是最小级别', Toast.SHORT);
            this.props.onZoomOut && this.props.onZoomOut(Math.floor(zoom));
        }, 300);
    }

    onSpan() {
        //    console.info('span')
        this.props.onSpan && this.props.onSpan();
    }

    onInit() {
        instance.initMap(this.refs.mapView);
        this.Map = instance;
        this.zoom = isNaN(this.props.zoom) ? this.options.zoom : this.props.zoom;
        this.mapRef = this.Map.getMapRef();
        this.ridx = this.props.router.currentIndex();
        this.props.onInit && this.props.onInit(this.Map);

    }

    clearTimer() {
        if(this.mapTimer) clearTimeout(this.mapTimer);
        if(this.zoomTimer) clearTimeout(this.zoomTimer);
    }
    pause() {
        console.info('map pause', this.mapRef)
        this.clearTimer();
        this.Map.pause();
    }

    resume() {
        this.clearTimer();
        this.mapTimer = setTimeout(() => {
            if(this.mapRef) {
                console.info('map resume', this.mapRef)
                this.Map.setMapRef(this.mapRef);
                this.Map.resume();
            }
        }, 500);
    }
    shouldComponentUpdate(props) {
        let cidx = props.router.currentIndex();
        if(!this.ridx) this.ridx = cidx;
        console.info(cidx, this.ridx, this.mapRef)
        if(cidx === this.ridx) {
            this.resume();
        }
        else  this.pause();
        return true;
    }

    componentWillUnmount() {
        this.clearTimer();
        this.ridx = null;
        this.mapRef = null;
        this.props.nav && this.props.nav.doBack && this.props.nav.doBack();
    }

    getCenter() {
        let center = this.props.center || this.options.center;
        return instance.MPoint([center.longitude, center.latitude]);
    }
    clickMarker(event) {
        console.info(arguments)
        this.props.clickMarker && this.props.clickMarker(event.nativeEvent.tag);
    }
    renderController() {
        return <View>
            {
                this.options.showZoomController && <View style={styles.controlView}>
                    <Button onPress={() => {
                        this.zoomIn()
                    }}
                            style={styles.controlButton}>
                        <Icons.IconAdd size={Env.font.base * 60}/>
                    </Button>
                    <Button onPress={() => {
                        this.zoomOut()
                    }}
                            style={[styles.controlButton, eStyles.borderTop]}>
                        <Icons.IconRemove size={Env.font.base * 60}/>
                    </Button>
                </View>
            }
        </View>
    }
    render() {
        return (
            <View style={[estyle.fx1]}>
                <MapView
                    style={[estyle.fx1]}
                    zoomLevel={isNaN(this.props.zoom) ? this.options.zoom : this.props.zoom}
                    center={this.getCenter()}

                    forbidGesture={this.options.forbidGesture}
                    isZoom={this.options.isZoom}
                    isMove={this.options.isMove}
                    isRotate={this.options.isRotate}
                    onChange={(zoom) => {
                        this.onZoom(zoom);
                    }}
                    onSpan={() => {
                        this.onSpan()
                    }}
                    onAnnotationClick={(pointId) => {
                        this.clickMarker(pointId)
                    }}
                    onIconOverlayClick={(pointId) => {
                        this.clickMarker(pointId)
                    }}
                    onInit={() => {
                        this.onInit()
                    }}
                    ref="mapView"
                    onTap={()=>{}}
                />
                {this.renderController()}
                {this.props.hideLegend ? null : <View style={[styles.controlView, {bottom: Env.font.base * 30}]}>
                    <Button
                        onPress={() => this.setState({showLegend: !this.state.showLegend})}
                        style={styles.controlButton}>
                        <Icons.IconBrowsers size={Env.font.base * 60}/>
                    </Button>
                </View>}
            </View>
        );
    }

}


const styles = StyleSheet.create({
    controlView: {
        position: 'absolute',
        bottom: Env.font.base * 330,
        right: Env.font.base * 30,
        borderRadius: Env.font.base * 10,
        ...eStyles.border,
        backgroundColor: '#FFF',
        borderWidth: 1
    },
    controlButton: {
        width: Env.font.base * 80,
        height: Env.font.base * 80,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
