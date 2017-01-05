/**
 * Created by cryst on 2016/10/11.
 */
import React, {Component} from 'react';
import {Platform, TouchableHighlight, View, Text, StyleSheet, Modal} from 'react-native';

import Env from '../../../../utils/Env';
import ModalBox from '../../../../components/widgets/Modal';
import ConfirmButton from '../../../../components/ConfirmButton'
import CancelButton from '../../../../components/CancelButton';
import Toast from '../../../../components/Toast';
const estyle = Env.style;
import ImageResizer from 'react-native-image-resizer';
import RNFetchBlob from 'react-native-fetch-blob';
import * as ImagePicker from 'react-native-image-picker';
//https://github.com/marcshilling/react-native-image-picker

let options = {
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

export default class ImagePickButton extends Component {

    static defaultProps = {
        maxHeight: 500,
        maxWidth: 500
    };

    constructor(props) {
        super(props);
        this.state = {
            visible:false
        }
    }

    show = () => {
        this.setState({
            visible: true
        })
    }

    close = () => {
        this.setState({
            visible: false
        })
    }

    _getImage = (response) => {
        this.close();
        if (response.didCancel) {
        }
        else if (response.error) {
            Toast.show('获取图像失败', Toast.SHORT);
        }
        else {
            ImageResizer.createResizedImage(response.path, this.props.maxWidth, this.props.maxHeight, 'JPEG', 100, 0).then((resizedImageUri) => {
                RNFetchBlob.fs.readFile(resizedImageUri, 'base64')
                    .then((data) => {
                        this.props.onImagePick && this.props.onImagePick({
                            ...response,
                            path: resizedImageUri,
                            data: data
                        });
                    });
            }).catch((err) => {
                Toast.show('获取图像失败', Toast.SHORT);
            });
        }
    }

    launchCamera = () => {
        ImagePicker.launchCamera(options, this._getImage);
    }

    launchImageLibrary = () => {
        ImagePicker.launchImageLibrary(options, this._getImage);
    }

    render() {
        return (
            <ModalBox visible={this.state.visible} style={{zIndex:999}} onClose={() => {}}>
                <View style={[estyle.fx1]}/>
                <View style={[estyle.cardBackgroundColor, estyle.padding, estyle.fxColumn]}>
                    <View style={[ estyle.fxCenter, estyle.paddingTop]}>
                        <ConfirmButton size="large" style={[estyle.marginTop]} onPress={this.launchCamera}>拍照</ConfirmButton>
                        <ConfirmButton size="large" style={[estyle.marginTop]} onPress={this.launchImageLibrary}>从相册选择</ConfirmButton>
                        <CancelButton size="large" style={[estyle.marginTop]}  onPress={this.close}>取消</CancelButton>
                    </View>
                </View>
            </ModalBox>
        );
    }
}