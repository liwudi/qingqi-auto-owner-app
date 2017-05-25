import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import Toast from '../components/Toast';
import Env from '../utils/Env';
import Button from '../components/widgets/Button';
import * as Icons from '../components/Icons';
const estyle = eStyles = Env.style;
import RnMap from 'rn-mapbar-navicore';
const BaseMapView = RnMap.MapView;

export default class MapbarMap extends BaseMapView {
    constructor() {
        super();
        this.state = {
            showLegend: false
        }
    };
    renderController = () => {
        return <View style={styles.controlView}>
            <Button onPress={this.zoomIn}
                    style={styles.controlButton}>
                <Icons.IconAdd size={Env.font.base * 60}/>
            </Button>
            <Button onPress={this.zoomOut}
                    style={[styles.controlButton, eStyles.borderTop]}>
                <Icons.IconRemove size={Env.font.base * 60}/>
            </Button>
        </View>;
    };
    onZoomMax = (zoom) => {
        Toast.show('已经是最大级别', Toast.SHORT);
        this.props.onZoomMax && this.props.onZoomMax(this.maxMapLevel);
    };
    onZoomMin = (zoom) => {
        Toast.show('已经是最小级别', Toast.SHORT);
        this.props.onZoomMin && this.props.onZoomMin(0);
    };

    onInit = () => {
        this.ridx = this.props.router.currentIndex();
        this.ready();
    };
    showLegend = () => {
        this.setState({showLegend: !this.state.showLegend});
    };
    shouldComponentUpdate(props) {
        let cidx = props.router.currentIndex();
        if(!this.ridx) this.ridx = cidx;
        if(cidx === this.ridx) {
            this.resume();
        }
        else  this.pause();
        return true;
    };
    componentWillUnmount () {
        this.clear();
        this.ridx = null;
        this.props.nav && this.props.nav.doBack && this.props.nav.doBack();
    };
    render() {
        return <View style={[estyle.fx1]}>
            {this.renderMap()}
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