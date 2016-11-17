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
const MapView = require('./MapView');
import * as instance from './MapbarMapInstance';
import Env from '../utils/Env';
import Button from '../components/widgets/Button';
import * as Icons from '../components/Icons';
const eStyles = Env.style;
export default class MapbarMap extends Component {
    constructor() {
        super();
        this.options = {
            zoom: 8,
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
    }
    renderController() {
        return <View>
            {
                this.options.showZoomController && <View style={styles.controlView}>
                    <Button onPress={() => {this.zoomIn()}}
                            style={styles.controlButton}>
                        <Icons.IconAdd size={Env.font.base * 60}/>
                    </Button>
                    <Button onPress={() => {this.zoomOut()}}
                            style={[styles.controlButton,eStyles.borderTop]}>
                        <Icons.IconRemove size={Env.font.base * 60}/>
                    </Button>
                </View>
            }
        </View>
    }

    zoomIn() {
        instance.zoomIn();
        this.onZoomIn();
    }
    zoomOut() {
        instance.zoomOut();
        this.onZoomOut();
    }
    onZoomIn(zoom) {
        this.props.onZoomIn && this.props.onZoomIn(zoom);
    }
    onZoomOut(zoom) {
        this.props.onZoomOut && this.props.onZoomOut(zoom);
    }
    onSpan() {
        this.props.onSpan && this.props.onSpan();
    }
    onInit() {
        instance.initMap(this.refs.mapView);
        this.props.onInit && this.props.onInit(instance);
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
                onZoomIn={(zoom) => {this.onZoomIn(zoom)}}
                onZoomOut={(zoom) => {this.onZoomOut(zoom)}}
                onSpan={() => {this.onSpan()}}
                onAnnotationClick={(pointId) => {this.clickMarker(pointId)}}
                onIconOverlayClick={(pointId) => {this.clickMarker(pointId)}}
                onInit={() => {this.onInit()}}
                ref="mapView"
            />
            {this.state.showLegend && this.props.legend}
            {this.renderController()}
            <View style={[styles.controlView,{bottom:Env.font.base * 30}]}>
                <Button
                    onPress={() => this.setState({showLegend:!this.state.showLegend})}
                    style={styles.controlButton}>
                    <Icons.IconBrowsers size={Env.font.base * 60}/>
                </Button>
            </View>
        </View>;
    }

    /*componentDidMount() {
        instance.initMap(this.refs.mapView);
        this.props.initMap && this.props.initMap(instance);
        console.info('map load')
    }
*/

    componentWillUnmount() {
        console.info('map delete1')
     /*   instance.clearOverlays();*/
        instance.finalize();
    }
}

const styles = StyleSheet.create({
    controlView:{
        position:'absolute',
        bottom: Env.font.base * 330,
        right: Env.font.base * 30,
        borderRadius:Env.font.base * 10,
        ...eStyles.border,
        backgroundColor:'#FFF',
        borderWidth:1
    },
    controlButton:{
        width: Env.font.base * 80,
        height: Env.font.base * 80,
        justifyContent:'center',
        alignItems:'center'
    }
});
