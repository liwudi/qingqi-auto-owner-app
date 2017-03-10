import React, { Component } from 'react';
import {
    DeviceEventEmitter,
    NativeModules
} from 'react-native';
import Coord from './Coord';
const module = NativeModules.MapbarMapModule;
let coords = null;
function _geolocation () {
    let promise = new Promise((resolve, reject) => {
        console.info('geolocation--android-geo', coords)
        if(coords) resolve(coords);
        else {
            console.info('noLocation-android-geo')
            reject();
        }
    });
    return promise;
}

if(!coords) {
    DeviceEventEmitter.addListener('receiveLocationData', (event={}) => {
        if(event.longitude && event.latitude) {
            let ll = Coord.wgs84togcj02(Math.abs(event.longitude),Math.abs(event.latitude));
            coords = {
                longitude: ll[0],
                latitude: ll[1]
            };
        }
        console.info('receiveLocationData', coords)
        module.stopLocation();
    });
    module.startLocation();
}

export function geolocation () {
    console.info('geolocation', coords)
    return _geolocation();
}