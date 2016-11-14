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
        let center = instance.MPoint([115.95380, 28.68291]);
        this.options = {
            zoom: 8,
            center: {
                longitude: center.longitude,//2868291,11595380
                latitude: center.latitude
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
        console.info(this.options)
    }
    renderController() {
        return <View>
            {
                this.options.showZoomController && <View style={styles.controlView}>
                    <Button onPress={instance.zoomIn}
                            style={styles.controlButton}>
                        <Icons.IconAdd size={Env.font.base * 60}/>
                    </Button>
                    <Button onPress={instance.zoomOut}
                            style={[styles.controlButton,eStyles.borderTop]}>
                        <Icons.IconRemove size={Env.font.base * 60}/>
                    </Button>
                </View>
            }
        </View>
    }
    render() {
        return <View style={[estyle.fx1]}>
            <MapView
                style={[estyle.fx1]}
                zoomLevel={this.options.zoom}
                worldCenter={this.options.center}
                forbidGesture={this.options.forbidGesture}
                isZoom={this.options.isZoom}
                isMove={this.options.isMove}
                isRotate={this.options.isRotate}
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
    componentDidMount() {
        instance.initMap(this.refs.mapView);
        this.props.initMap(instance);
        console.info('map load')
    }


    componentWillUnmount() {
        console.info('map delete')
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
