/**
 * Created by ligj on 2016/12/15.
 */
import React,{ PropTypes }from 'react';
import {requireNativeComponent,View} from 'react-native';

var VideoView = {
    name:'VideoView',
    propTypes:{
        style: View.propTypes.style,
        source:PropTypes.shape({
            url:PropTypes.string,
            headers:PropTypes.object,
        }),
        ...View.propTypes,//包含默认的View的属性，如果没有这句会报‘has no propType for native prop’错误
    }
};
var RCTVideoView = requireNativeComponent('VideoView',VideoView);
module.exports = RCTVideoView;