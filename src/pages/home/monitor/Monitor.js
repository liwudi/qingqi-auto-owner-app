/**
 * Created by ligj on 2016/10/9.
 * Edit by yaocy on 2016/11/3
 */
import React, { Component,PropTypes } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import Env from '../../../utils/Env';
import TopBanner from '../../../components/TopBanner';
import LabelInput from '../../../components/LabelInput';
import PageList from '../../../components/PageList';
import {IconSearch} from '../../../components/Icons';
import {queryRealTimeCarList} from '../../../services/MonitorService';
import MyCarItem from './components/MyCarItem';
import MonitorMap from './MonitorMap';
import {IconMap} from '../../../components/Icons';
import Button from '../../../components/widgets/Button';
import Toast from '../../../components/Toast';
const estyle = Env.style;
const TIMEOUT = 500;
export default class Monitor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: ''
        };
    }


    clearTimer() {
        this.timer = clearTimeout(this.timer);
        this.timer = null;
    }
    componentWillUnmount() {
        this.clearTimer();
    }

    setkey(key) {
        this.clearTimer();
        this.timer = setTimeout(() => {
            this.setState({key:key})
        }, TIMEOUT);
    }

    goToMap(carId) {
        this.props.router.replace(MonitorMap, {nav: {carId: carId}});
    }
    render() {
        return (
            <View style={[estyle.fx1,estyle.containerBackgroundColor]}>
                <TopBanner {...this.props} title="实时监控"
                           rightView={
                               <Button onPress={()=> {this.goToMap()}}
                                       style={estyle.topBtn}>
                                   <IconMap color="#ffffff"/>
                               </Button>
                           }
                />
                <LabelInput
                    style = {[estyle.borderBottom, estyle.marginBottom]}
                    placeholder='请输入司机姓名、VIN或车牌号'
                    labelSize="0"
                    ref="key"
                    rightView={<IconSearch color={Env.color.note}/>}
                    onChangeText={(key) => {this.setkey(key)}}/>
                <PageList
                    style={estyle.fx1}
                    reInitField={[this.state.key]}
                    renderRow={(row) => {
                        return <MyCarItem data={row} router={this.props.router} onPress={(position) => {
                            console.info('press')
                            if(position) {
                                this.goToMap(row.carId);
                            } else {
                                Toast.show('未获取到位置信息', Toast.SHORT);
                            }

                        }}/>
                    }}
                    fetchData={(pageNumber, pageSize) => {
                        return queryRealTimeCarList(pageNumber,pageSize,this.state.key);
                    }}
                />
            </View>
        );
    }
}