import React, {Component, PropTypes} from "react";
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
import Toast from '../components/Toast';
const MapView = require('./MapView');
import * as instance from './MapbarMapInstance';
import Env from '../utils/Env';
import Button from '../components/widgets/Button';
import * as Icons from '../components/Icons';
const estyle = eStyles = Env.style;
export default class MapbarMap extends Component {
    constructor() {
        super();
        this.maxMapLevel = 14;
        this.options = {
            zoom: 0,
            center: {
                longitude: 115.95380,//2868291,11595380
                latitude: 28.68291
            },
            isZoom: true,
            isMove: true,
            isRotate: true,
            forbidGesture: true,
            showZoomController: true
        }
        this.state = {
            showLegend: false
        }
        this.zoomTimer = null;
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

    zoomIn() {
        instance.zoomIn();
        this.zoomTimeout(() => {
            instance.getZoomLevel().then((zoom) => {
                this.onZoomIn(zoom);
            });
        })
    }

    zoomOut() {
        instance.zoomOut();
        this.zoomTimeout(() => {
            instance.getZoomLevel().then((zoom) => {
                this.onZoomOut(zoom);
            });
        })
    }

    zoomTimeout(fun, timeout) {
        this.zoomTimer && clearTimeout(this.zoomTimer);
        this.zoomTimer = setTimeout(fun, timeout ||500);
    }

    onZoomIn(zoom) {
        //    console.info('onZoomIn', zoom)
        /*  let _zoom = zoom;
         zoom = Math.ceil(zoom);
         if(zoom > 14) zoom = 14;*/
        this.zoomTimeout(() => {
            if (zoom >= this.maxMapLevel) Toast.show('已经是最大级别', Toast.SHORT);
            this.props.onZoomIn && this.props.onZoomIn(Math.ceil(zoom));
        }, 300);
    }

    onZoomOut(zoom) {
        //    console.info('onZoomOut', zoom)
        /*   zoom = Math.floor(zoom);
         if(zoom < 0) zoom = 0;*/
        this.zoomTimeout(() => {
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
        if(cidx === this.ridx) this.resume();
        else  this.pause();
        return true;
    }

    componentWillUnmount() {
        this.clearTimer();
        this.ridx = null;
        this.mapRef = null;
        this.props.nav && this.props.nav.doBack && this.props.nav.doBack();
    }

    clickMarker(pointId) {
        this.props.clickMarker && this.props.clickMarker(pointId);
    }

    getCenter() {
        let center = this.props.center || this.options.center;
        return instance.MPoint([center.longitude, center.latitude]);
    }

    render() {
        return <View style={[estyle.fx1]}>
            <MapView
                style={[estyle.fx1]}
                zoomLevel={isNaN(this.props.zoom) ? this.options.zoom : this.props.zoom}
                worldCenter={this.getCenter()}
                forbidGesture={this.options.forbidGesture}
                isZoom={this.options.isZoom}
                isMove={this.options.isMove}
                isRotate={this.options.isRotate}
                onZoomIn={(zoom) => {
                    this.onZoomIn(zoom)
                }}
                onZoomOut={(zoom) => {
                    this.onZoomOut(zoom)
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
            />
            {this.state.showLegend ? this.props.legend : null}
            {this.renderController()}
            {this.props.hideLegend ? null : <View style={[styles.controlView, {bottom: Env.font.base * 30}]}>
                <Button
                    onPress={() => this.setState({showLegend: !this.state.showLegend})}
                    style={styles.controlButton}>
                    <Icons.IconBrowsers size={Env.font.base * 60}/>
                </Button>
            </View>}
        </View>;
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
