/**
 * Created by cryst on 2016/11/13.
 */

import React, {Component} from "react";
import {
    NativeModules,
    findNodeHandle
} from "react-native";

const module = NativeModules.MapViewManager;
console.info('++++++++++++++++++++++++++++++++++++++++')
console.info(module)
console.info('++++++++++++++++++++++++++++++++++++++++')
let mapRef = null;
const e = 100000;
/*
* point=[lng, lat]
* */
export function MPoint(point) {
    let pt = {
        longitude: parseInt(point[0] * e),
        latitude: parseInt(point[1] * e)
    };
    //console.info('-----------------', pt)
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
     /*   console.info('*****************************************')
        console.info(opts)*/
    //    opts.imageName = opts.iconImageName || opts.imageName;
        module.addAnnotations(
            mapRef, opts
        )
    }
    /**opts=[{
    *   latitude: 1, longitude: 2, id:1, offsetX:12, offsetY:12, imageName:'',
    *   iconTextColor:'red', iconText:'text', iconTextSize:12,title:'tt'
     * */
    static update = (opts) => {
        module.setIconOverlayIcons(
            mapRef, opts
        )
        //return;
        /*module.setRotationAnnotations(
            mapRef, opts
        );*/
    }
    /**opts=[{
    *   id:1, offsetX:12, offsetY:12, imageName:''
    * }]
     * */
    static updateIcon = (opts) => {
        module.setRotationAnnotations(
            mapRef, opts
        );
    }
    /**opts=[{
    *   id:1,
    *   iconTextColor:'red', iconText:'text', iconTextSize:12
     * */
    static updataIconText = (opts) => {
        module.setRotationAnnotations(
            mapRef, opts
        );
    }
    /**opts=[{
    *   id:1,
    *   title:'tt'
     * */
    static updateTitle = (opts) => {
        module.setRotationAnnotations(
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
        return;
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
        return;
        opts.map((item) => {
            /*module.refreshAnnotationLocation(
                mapRef, item
            );*/
        });

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
        //console.info(opts)
        opts.map((item) => {
            item.width = +item.width;
            item.outlineColor = item.outlineColor.replace('#', '');
            item.strokeColor = item.strokeColor.replace('#', '');

            console.info(mapRef,  item)
            module.addLine(mapRef, item);
        });
    }
    /**
     * opts=[1,2,3,4] id数组
     * */
    static remove = (opts) => {
        module.deleteLine(mapRef, opts)
    }
    static clear = () => {
        module.deleteLine(mapRef);
//        Line.remove([-1]);
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
    //console.info(module, '**************************', ref)
    setMapRef(findNodeHandle(ref));
}
export function getMapRef() {
    return mapRef;
}
export function setMapRef(ref) {
    //console.info('setMapRef--------------------', ref,mapRef)
    mapRef = ref;
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
    console.info(zoom)
    console.info(mapRef)
    console.info('-------------------')
    return module.setZoomLevel(mapRef, zoom, true);
}
export function getZoomLevel() {
    //return Promise.resolve(2);
    return module.getZoomLevel(mapRef);
}
export function zoomIn() {
    module.setZoomIn(mapRef);
}
export function zoomOut() {
    module.setZoomOut(mapRef);
}

const MIN_LNG = 72.5,
    MIN_LAT = 32.5,
    MAX_LNG = 132.5,
    MAX_LAT = 50.5;
export function getBounds() {
/*    return Promise.resolve({
        minLongitude: MIN_LNG,
        minLatitude: MIN_LAT,
        maxLongitude: MAX_LNG,
        maxLatitude: MAX_LAT
    });*/
    return module.getWorldRect(mapRef).then(bounds => {
        let minlng = +bounds.minLongitude / e,
            minlat = +bounds.minLatitude / e,
            maxlng = +bounds.maxLongitude / e,
            maxlat = +bounds.maxLatitude / e;
        let _bounds = {
            minLongitude: minlng < MIN_LNG ? MIN_LNG : minlng,
            minLatitude: minlat < MIN_LAT ? MIN_LAT : minlat,
            maxLongitude: maxlng > MAX_LNG ? MAX_LNG : maxlng,
            maxLatitude: maxlat > MAX_LAT ? MAX_LAT : maxlat
        }
        console.info('getBounds', bounds);
        return _bounds;
    });
}

/**
 * opts={
 *      minLongitude: 1,
 *      minLatitude: 1,
 *      maxLongitude: 1,
 *      maxLatitude: 1
 * }
 * */
export function setBounds(pt1, pt2) {
    let p1lat = pt1.latitude,
        p1lng = pt1.longitude,
        p2lat = pt2.latitude,
        p2lng = pt2.longitude;
    module.fitWorldArea(mapRef, {
        minLongitude: Math.min(p1lng, p2lng),
        minLatitude: Math.min(p1lat, p2lat),
        maxLongitude: Math.max(p1lng, p2lng),
        maxLatitude: Math.max(p1lat, p2lat)
    });
}
export function pause() {
    module.setForbidGesture(mapRef, true);
    //module.onPauseMap(mapRef);
}
export function resume() {
    module.setForbidGesture(mapRef, false);
    //module.onResumeMap(mapRef);
}
export function clearOverlays() {
    module.removeAllOverlayAndAnnotation(mapRef);
}
export function disposeMap (mapRef) {
    setMapRef(mapRef);
    return;
    pause();
    clearOverlays();
    finalize();
    console.info('dispose', mapRef);
}
