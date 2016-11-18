import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    NativeModules,
    DeviceEventEmitter,
    findNodeHandle,
    TouchableHighlight,
    Image
} from "react-native";
import Slider from 'react-native-slider';
import * as Icons from '../../../components/Icons';
import Toast from '../../../components/Toast';
import Env from '../../../utils/Env';
const estyle = Env.style;
import Button from '../../../components/widgets/Button'
let interVal = null;
let totalTime = 1; //总回放时间  单位  分钟
let onPointTime = 1; // 一个点的时间 毫秒*/
let index = 0;
export default class PlayView extends Component {
    constructor() {
        super();
        this.state = {
            playing: false,
            progress: 0
        };
    }

    componentDidMount() {
        onePonitTime = 1000 * 1 /(this.props.dataLength / totalTime / 60);
        console.info(onePonitTime, '=================================================')
    }

    startPauseButton = () => {
        if (this.state.playing) {
            return <Text><Icons.IconPause size={50} color={Env.color.main}/></Text>
        } else {
            return <Text><Icons.IconPlay size={50} color={Env.color.main}/></Text>;
        }
    };

    changePlay() {
        if (this.state.playing) {
            this.pause();
        } else {
            this.play();
        }
        this.setState({playing: !this.state.playing});
    }


    play() {
        console.info('------------------------------play')
        if (interVal) return;
        interVal = setInterval(() => {
            this.setState({progress: index});
            this.props.play && this.props.play(index);
            index++;
            if (index === this.props.dataLength) {
                this.changePlay();
                this.playComplete();
            }
        }, onePonitTime);
    }

    playComplete() {
        setTimeout(() => {
            Toast.show(`播放结束`, Toast.SHORT);
            this.ready();
        }, 500);
    }

    ready() {
        index = 0;
        this.setState({progress: index});
        this.props.play && this.props.play(index);
    }


    pause() {
        console.info('------------------------------pause')
        clearInterval(interVal);
        interVal = null;
        //this.props.pause && this.props.pause(index);
    }

    fff = () => {
        console.info('------------------------------------sss')
    }
    progressTo = (progress) => {
        index = Math.round(progress);
        index = index >= this.props.dataLength - 1 ? this.props.dataLength - 1 : index;
        console.info(index)
        this.props.play && this.props.play(index);
        if(index === this.props.dataLength - 1) {
            this.playComplete();
        }
        console.info('hand move')
    };

    render() {
        return <View style={[estyle.fxRow, estyle.fxCenter, estyle.paddingHorizontal]}>
            <Button onPress={() => {
                this.changePlay()
            }}>{this.startPauseButton()}</Button>
            <Image source={require('../../../assets/images/start.png')} style={{width: 25, height: 25, marginLeft: 10}}
                   resizeMode={Image.resizeMode.cover}/>
            <Slider
                style={{flex: 1}}
                minimumValue={0}
                maximumValue={this.props.dataLength}
                onSlidingComplete={(progress) => {
                    this.fff(progress);
                }}
                onValueChange={(progress) => {
                    this.progressTo(progress);
                }}
                value={this.state.progress}
                minimumTrackTintColor='#169ADA'
                maximumTrackTintColor="#E5E5E5"
                thumbTintColor='#169ADA'
                thumbTouchSize={{width: 30, height: 30}}
                trackStyle={{height: 5}}
                thumbStyle={{height: 15, width: 15}}
            />
            <Image source={require('../../../assets/images/end.png')} style={{width: 25, height: 25}}
                   resizeMode={Image.resizeMode.cover}/>
        </View>
    }
}