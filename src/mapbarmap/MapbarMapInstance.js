/**
 * Created by cryst on 2016/11/13.
 */

import React, {Component} from "react";
import {
    TouchableOpacity,
    NativeModules,
    DeviceEventEmitter,
    findNodeHandle,
    TouchableHighlight,
    Image
} from "react-native";

const module = NativeModules.MapbarMapModule;
let mapRef = null;
export function initMap(ref) {
    mapRef = findNodeHandle(ref);
    console.info(mapRef)
    console.info('---------------------------------')
}
/*
* point=[lng, lat]
* */
export function MPoint(point) {
    let pts = point.map((p) => {return p * 100000;});
    return pts;
}

export function finalize () {
    module.onDestroyMap(mapRef);
    mapRef = null;
}

/*export class Marker {
    constructor (opts) {

    }
}

export class MarkerAngle {

}

export class Line {

}*/

/**opts = [{
*   latitude: line[line.length - 1].lat,
    longitude: line[line.length - 1].lon,
    title: '终点',
    imageName: "ic_end",
    iconText: "",
    iconTextColor: "#ff4b4b",
    iconTextSize: 18,
    id: 2,
    offsetX: 0.5,
    offsetY: 0.8,
    click: true
    }]
 * */
/*添加标注*/
export function addMarkers(opts) {
    module.addAnnotations(
        mapRef, opts
    );
}
/*
 opts=[1,2,3]
 id数组
* */
export function removeMarkers(opts) {
    module.removeAnnotation(
        mapRef, opts
    );
}
export function clearMarkers() {
    removeMarkers([-1]);
}
export function setMarkerIconText(opts) {
    module.setIconText(mapRef, opts);
}

/*添加可旋转（带角度）的标注*/
export function addMarkersWithAngle(opts) {
    console.info(mapRef)
    console.info(opts)
    module.setIconOverlayIcons(
        mapRef, opts
    );
}
export function setCenter(mpoint) {
    module.setWorldCenter(mapRef, {
        longitude: mpoint[0],
        latitude: mpoint[1]
    });
}
export function setZoomLevel(zoom) {
    module.setZoomLevel(mapRef, zoom);
}
export function zoomIn() {
    module.setZoomIn(mapRef, 1);
}
export function zoomOut() {
    module.setZoomOut(mapRef, 1);
}