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

/*
* point=[lng, lat]
* */
export function MPoint(point) {
    let pt = {
        longitude: point[0] * 100000,
        latitude: point[1] * 100000
    };
    return pt;
}

export class Marker {
    /**opts=[{
    *   latitude: 1, longitude: 2, id:1, offsetX:12, offsetY:12, click:true, imageName:'',
    *   iconTextColor:'red', iconText:'text', iconTextSize:12,title:'tt',callOut:false
    * }]
     * */
    /*添加标注*/
    static add = (opts) => {
        module.addAnnotations(
            mapRef, opts
        )
    }
    /**opts=[{
    *   latitude: 1, longitude: 2, id:1, offsetX:12, offsetY:12, imageName:'',
    *   iconTextColor:'red', iconText:'text', iconTextSize:12,title:'tt'
     * */
    static update = (opts) => {
        module.refreshAnnotationLocation(
            mapRef, opts
        );
    }
    /**opts=[{
    *   id:1, offsetX:12, offsetY:12, imageName:''
    * }]
     * */
    static updateIcon = (opts) => {
        module.setIcon(
            mapRef, opts
        );
    }
    /**opts=[{
    *   id:1,
    *   iconTextColor:'red', iconText:'text', iconTextSize:12
     * */
    static updataIconText = (opts) => {
        module.setIconText(
            mapRef, opts
        );
    }
    /**opts=[{
    *   id:1,
    *   title:'tt'
     * */
    static updateTitle = (opts) => {
        module.setAnnotationTitle(
            mapRef, opts
        );
    }
    /*
     opts=[1,2,3]
     id数组
     * */
    static remove = (opts) => {
        module.removeAnnotation(
            mapRef, opts
        );
    }
    static clear = () => {
        remove([-1]);
    }
}
export class MarkerRotate {
    /**opts=[{
    *   latitude: 1, longitude: 2, id:1,click:true, imageName:'',
    *   direction: 45
    * }]
     * */
    static add = (opts) => {
        module.setIconOverlayIcons(
            mapRef, opts
        );
    }
    /**opts=[{
    *   latitude: 1, longitude: 2, id:1,imageName:'',
    *   direction: 45
    * }]
     * */
    static update = (opts) => {
        module.refreshIconOverlayLocation(
            mapRef, opts
        );
    }
    /**opts=[{
    *   id:1, imageName:''
    * }]
     * */
    static updateIcon = (opts) => {
        module.setIconOverlayIcon(
            mapRef, opts
        );
    }
    /**opts=[{
    *   id:1, direction:45
    * }]
     * */
    static updateDirection = (opts) => {
        module.setIconOverlayDirection(
            mapRef, opts
        );
    }
    /*
     opts=[1,2,3]
     id数组
     * */
    static remove = (opts) => {
        module.removeIconOverlay(
            mapRef, opts
        );
    }
    static clear = () => {
        remove([-1]);
    }
}

export class Line {
    /**
     * opts=[{
     *      isClose:true, width: '1', strokeColor:'red', outlineColor:'red', lineId:1,
     *      locations: [{latitude: 1, longitude: 2}]
     * }]
     * */
    static add = (opts) => {
        v
    }
    /**
     * opts=[1,2,3,4] id数组
     * */
    static remove = (opts) => {
        module.deleteLine(mapRef, opts)
    }
    static clear = () => {
        remove([-1]);
    }
    /**
     * opts=[{
     *      line: [], color:'red', width:'20', lineId:1
     * }]
     * */
    static update = (opts) => {
        module.updateLine(mapRef, opts);
    }
}



/**************************地图方法**************************/
export function initMap(ref) {
    mapRef = findNodeHandle(ref);
}
export function finalize () {
    module.onDestroyMap(mapRef);
    mapRef = null;
}

/**
 * opts={
 *      longitude: 1,
 *      latitude: 1
 * }
 * */
export function setCenter(opts) {
    module.setWorldCenter(mapRef, opts);
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
export function getBounds() {
    console.info('---------------------------------------------')
    console.info(mapRef)
    return module.getWorldRect(mapRef);
}

/**
 * opts={
 *      minLongitude: 1,
 *      minLatitude: 1,
 *      maxLongitude: 1,
 *      maxLatitude: 1
 * }
 * */
export function setBounds(opts) {
    module.fitWorldArea(mapRef, opts);
}
export function pause() {
    module.onPauseMap(mapRef);
}
export function resume() {
    module.onResumeMap(mapRef);
}
export function clearOverlays() {
    module.removeAllOverlayAndAnnotation(mapRef);
}
