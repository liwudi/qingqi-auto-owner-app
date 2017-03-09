import React, { Component } from 'react';
import {
    NativeModules
} from 'react-native';
import Coord from './Coord';
const module = NativeModules.MapbarMapModule;
let coords = null;
export function _geolocation () {
    let promise = new Promise((resolve, reject) => {
        console.info('geolocation--android-geo')
        if(coords) resolve(coords);
        else {
            module.startLocation().then((res) => {
                console.log('位置-android-geo',res);
                let ll = Coord.wgs84togcj02(Math.abs(res.longitude),Math.abs(res.latitude));
                coords = {
                    longitude: ll[0],
                    latitude: ll[1]
                };
                console.info('success-geolocation', coords)
                resolve(coords);
            }).catch((error)=> {
                reject(error);
                console.info('startError-android-geo')
            }).finally(() => {
                console.info('stopLocation-android-geo')
                module.stopLocation();
            });
        }
    });
    return promise;
}
if(!global.coords) _geolocation();

export function geolocation () {
    console.info('geolocation', coords)
    return _geolocation();
}