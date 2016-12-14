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
import * as Icons from '../../../../components/Icons';
import Toast from '../../../../components/Toast';
import Env from '../../../../utils/Env';
const estyle = Env.style;
import Button from '../../../../components/widgets/Button'
let interVal = null;
let totalTime = 1; //总回放时间  单位  分钟
let onePonitTime = 0; // 一个点的时间 毫秒

let oneDayMin = 2; //24小时的播放时间，单位分钟
let oneHour = oneDayMin * 60 * 1000 / 24; //一天24的播放时间为一分钟，精确到每小时的播放时长
let minHour = 24 / 4; //最小播放小时数，时间小于这个，就按这个进行播放
let index = 0;

export default class PlayView extends Component {
    constructor() {
        super();
        this.state = {
            playing: false,
            progress: 0
        };
        this.cache_playing = null;
    }

    componentDidMount() {

    }
    getIntervalTime () {
        totalTime = this.props.totalTime;
        if(!onePonitTime && totalTime) {
            let hour = Math.round(totalTime / 1000 / 60 / 60);
            if(hour <= minHour) {
                hour = minHour;
            }
            onePonitTime =  hour * oneHour / this.props.dataLength;
        }
        return !!onePonitTime;
    }
/*    reset() {
        this.pause();
        this.cache_playing = null;
        this.ready();
    }
    componentWillReceiveProps(props) {
        if (this.rnTime !== props.time) {
            this.rnTime = props.time;
            this.reset();
        }
    }*/
    componentWillReceiveProps (props) {
        this.setState({progress: props.progress || 0});
    }
    componentWillUnmount() {
        this.pause();
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
        if(this.getIntervalTime()) {
            this.setState({playing: true});
            if (interVal) return;
            interVal = setInterval(() => {
                index++;
                if (index === this.props.dataLength) {
                    this.changePlay();
                    this.playComplete();
                } else {
                    this.run();
                }
            }, onePonitTime);
            this.run();
        }

    }
    run () {
        index = index >= this.props.dataLength - 1 ? this.props.dataLength - 1 : index;
        this.setState({progress: index});
        this.props.play && this.props.play(index);
    }

    playComplete() {
        setTimeout(() => {
            Toast.show(`播放结束`, Toast.SHORT);
            this.ready();
        }, 500);
    }

    ready() {
        this.setState({playing: false});
        index = 0;
        this.run();
    }


    pause() {
        this.setState({playing: false});
        clearInterval(interVal);
        interVal = null;
    }

    slidingComplete = (progress) => {
        index = Math.round(progress);
        if(this.cache_playing) this.play();
        this.cache_playing = null;
    };

    progressTo = (progress) => {
        this.pause();
        if(this.cache_playing === null) {
            this.cache_playing = this.state.playing;
        }
        index = Math.round(progress);
        this.run();
    };

    render() {
        return <View style={[estyle.fxRow, estyle.fxCenter, estyle.paddingHorizontal]}>
            <Button onPress={() => {
                this.changePlay()
            }}>{this.startPauseButton()}</Button>
            <Image source={require('../../../../assets/images/start.png')} style={{width: 25, height: 25, marginLeft: 10}}
                   resizeMode={Image.resizeMode.cover}/>
            <Slider
                style={{flex: 1}}
                minimumValue={0}
                maximumValue={this.props.dataLength}
                onSlidingComplete={(progress) => {
                    this.slidingComplete(progress);
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
            <Image source={require('../../../../assets/images/end.png')} style={{width: 25, height: 25}}
                   resizeMode={Image.resizeMode.cover}/>
        </View>;
    }
}