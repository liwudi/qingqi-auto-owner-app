import React, { Component } from 'react';
import {
    NativeModules
} from 'react-native';
import Coord from './Coord';
const module = NativeModules.MapbarMapModule;
export function geolocation () {
    let promise = new Promise((resolve, reject) => {
        console.info('geolocation--android-geo')
        module.startLocation().then((res) => {
            console.log('位置-android-geo',res);
            let ll = Coord.wgs84togcj02(Math.abs(res.longitude),Math.abs(res.latitude));
            resolve({
                longitude: ll[0],
                latitude: ll[1]
            });
        },(error) => {reject(error)}).catch(()=> {
            console.info('startError-android-geo')
        }).finally(() => {
            console.info('stopLocation-android-geo')
            module.stopLocation();
        });
    });
    return promise;
}