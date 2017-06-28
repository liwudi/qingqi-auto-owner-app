/**
 * Created by ligj on 2016/10/25.
 */
/**
 * Created by ligj on 2016/10/20.
 */
import React, { Component } from 'react';
import { View , TouchableOpacity, Text, WebView, Alert, Share } from 'react-native';
import ImagePickButton from './ImagePickButton';
import * as Icons from './Icons';
import { fileUpLoad } from '../services/AppService';
import { geolocation } from './location/Geolocation';

import TopBanner from './TopBanner';

import Env from '../utils/Env';

const estyle = Env.style;
const basefont = Env.font.base;

import CommonModule from './CommonModule';

export default class News extends Component {

    static defaultProps = {
        showBanner : true
    };

    constructor(props){
        super(props);
        this.state = {
            uri: this.props.uri,
            page: {},
            title: this.props.title || '卡友论坛'
        }
    }

    doBack(){
        if(this.state.page.canGoBack){
            //向webview发送后退操作
            this.refs.webview.injectJavaScript("history.back();");
        }else{
            this.props.doBack();
        }
    }

    onClose(){
        this.props.doBack();
    }

    onPageChange(page){
        this.setState({page});
        this.props.onPageChange && this.props.onPageChange(page);
    }

    onMessage(event){
        const e = JSON.parse(event.nativeEvent.data);
        switch (e.action) {
            case "location":
                geolocation().then(rs => console.log('123',rs)).catch(e => console.log(e))
                setTimeout(() => {
                    let err = null;
                    let rs = {
                        lonlat: '1111',
                        address: '北京市，东城区'
                    }
                    this.refs.webview.injectJavaScript(`window.mapbar['${e.callBack}'](${JSON.stringify(err)},${JSON.stringify(rs)})`);
                },5000);
                break;

            case "image":
                this.onImgUpload = (img, err) => {
                    if(err){
                        this.refs.webview.injectJavaScript(`window.mapbar['${e.callBack}'](${JSON.stringify({
                            message: '获取图像失败'
                        })})`);
                    } else {
                        let err = null;
                        let rs = [{
                            width: img.width,
                            height: img.height,
                            size: img.size,
                            path: img.fullPath,
                            name: img.fileName
                        }];
                        this.refs.webview.injectJavaScript(`window.mapbar['${e.callBack}'](${JSON.stringify(err)},${JSON.stringify(rs)})`);
                    }
                    this.onImgUpload = null;
                };
                this.refs['imagePick'].show();
                break;

            case "close":
                this.onClose();
                break;

            case "share":
                let url = e.params.url || "";
                if(url && !/^https?:\/\//.test(url)){
                    url = 'http://'+e.params.url;
                }
                CommonModule.share(
                    e.params.title || "",
                    e.params.content || "",
                    url,
                    e.params.imgPath || ""
                ).then(res => {
                    console.log(res)
                });

                // CommonModule.share(
                // //     e.params.title || "",
                // //     e.params.content || "",
                // //     url,
                // //     e.params.imgPath || ""
                // )
                break;

            case "back":
                this.doBack();
                break;
        }
    }

    onImagePick(img){
        fileUpLoad(img).then(rs => {
            this.onImgUpload && this.onImgUpload(Object.assign({}, img, rs));
        }).catch(e => {
            this.onImgUpload && this.onImgUpload(null, {});
        });
        /*

         height: 100,
         width: 856,
         type: 'image/png',
         fileName: 'Screenshot_2017-06-13-22-47-58.png',
         fileSize: 17443,
         path: 'file:/data/user/0/com.mapbar.qingqi.driver/cache/1498030226326.JPEG',
         data: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQE


         fullPath: 'http://jfx.mapbar.com/fs/group1/M00/00/BF/CgABa1lKIJWAKcJfAAAt9YZk_WM148.png',
         fileName: 'Screenshot_2017-06-13-22-47-58.png',
         group_name: 'group1',
         isDelete: 0,
         prefix: '',
         ext_name: 'png',
         is_used: 0,
         masterId: '',
         path: 'M00/00/BF/CgABa1lKIJWAKcJfAAAt9YZk_WM148.png',
         size: 11765,
         id: 'd17ea09ebc3d432c914ee1993f363187',
         account: ''
         */
    }

    /*

    1、关闭当前窗口
    window.mapbar.closeWindow();

    2、后退（同window.history.back()）
    window.mapbar.goBack();

    3、获取位置信息
    window.mapbar.fetchLocation(function(err, rs){
     //定位完成后回调
     //err为错误信息，无错误信息时则定位成功，返回位置信息
     //rs = {
     //     lonlat: '1111',
     //     address: '北京市，东城区'
     //     }
     })

     4、获取上传图片
     window.mapbar.fetchImage(function(err, rs){
     //上传图片完成后回调
     //err为错误信息，无错误信息时则上传图片成功，返回图片信息
     //rs = {
     //     width: 11111,
     //     height: 11111,
     //     path: 'http://xxxx/ddd.jpg'
     // }
     })

     5、分享
        参数： 标题，内容，图片地址，跳转url
     window.mapbar.sharePage(title , content,imagePath, url);

    */

    render(){
        const injectScript = `
                window.mapbar = window.mapbar || {};

    (function (mapbar, window) {

        var _postMessage = function (action, params, callBack) {
            window.postMessage(JSON.stringify({
                action : action,
                params : params,
                callBack : callBack
            }));
        };

        mapbar.closeWindow = function () {
            _postMessage('close');
        };

        mapbar.goBack = function () {
            _postMessage('back');
        };

        mapbar.sharePage = function (title, content, imagePath, url) {
            var callBackMethodName = 'callBack' + Math.random();
            mapbar[callBackMethodName] = function (err, rs) {
                callBack(err, rs);
                mapbar[callBackMethodName] = null;
                callBackMethodName = null;
            };

            _postMessage(
                'share',
                {
                    title: title, content: content, imagePath: imagePath, url: url 
                },
                callBackMethodName
            )
        };

        mapbar.fetchLocation = function (callBack) {
            var callBackMethodName = 'callBack' + Math.random();
            mapbar[callBackMethodName] = function (err, rs) {
                callBack(err, rs);
                mapbar[callBackMethodName] = null;
                callBackMethodName = null;
            };
            _postMessage(
                'location',
                null,
                callBackMethodName
            )
        };
        
        mapbar.fetchImage = function (callBack) {
            var callBackMethodName = 'callBack' + Math.random();
            mapbar[callBackMethodName] = function (err, rs) {
                callBack(err, rs);
                mapbar[callBackMethodName] = null;
                callBackMethodName = null;
            };
            _postMessage(
                'image',
                null,
                callBackMethodName
            )
        };

    })(window.mapbar || {}, window);
`;

        const _renderButton = () => {
            return <View style={[estyle.fxRow,estyle.fxRowCenter]}>
                    <TouchableOpacity style={[estyle.fxCenter,{height:basefont * 80,width:basefont * 70, }]} onPress={() => this.doBack()}>
                        <Text ><Icons.IconArrowLeft color="#FFF" /></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[estyle.fxCenter,{height:basefont * 80,width:basefont * 70,}]} onPress={() => this.onClose()}>
                        <Text><Icons.IconClose color="#FFF" size={basefont*75} /></Text>
                    </TouchableOpacity>
                </View>;

        };
        return (
            <View  style={[estyle.fx1]}>
                { this.props.showBanner ? <TopBanner
                    {...this.props}
                    leftShow={true}
                    leftView={_renderButton()}
                    doBack={this.doBack.bind(this)}
                    title={this.state.title}
                /> : null}
                <WebView
                    ref="webview"
                    onNavigationStateChange={(page) => {
                        this.onPageChange(page)
                    }}
                    style={{flex:1}}
                    onMessage={this.onMessage.bind(this)}
                    source={{uri: this.state.uri}}
//                    source={{html: `<!DOCTYPE html>
//<html>
//<head>
//    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
//    <title>WebviewTest</title>
//
//
//</head>
//
//<body>
//
//<button onclick="mapbar.closeWindow()">关闭</button>
//<button onclick="mapbar.goBack()">后退</button>
//<button onclick="mapbar.sharePage('标题','内容','','http://baidu.com')">分享</button>
//<button onclick="mapbar.fetchLocation(function (err, rs) {alert(JSON.stringify(rs))})">定位</button>
//<button onclick="mapbar.fetchImage(function (err, rs) {alert(JSON.stringify(rs))})">获取图片</button>
//
//</body>
//
//<script>
//
//</script>
//</html> `}}
                    injectedJavaScript={injectScript}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                />
                <ImagePickButton ref="imagePick" onImagePick={this.onImagePick.bind(this)}/>
            </View>
        )
    }
}