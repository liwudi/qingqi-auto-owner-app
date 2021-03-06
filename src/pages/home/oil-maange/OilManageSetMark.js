/**
 * Created by ligj on 2016/10/9.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import moment from 'moment';


import {IconArrowDown, IconQuestion} from '../../../components/Icons';

import TrackPlayback from '../components/TrackPlayback';

import OilManageSelectCar from './OilManageSelectCar';
import {standardMark} from '../../../services/AppService';

import Toast from '../../../components/Toast';
import ListItem from '../../../components/ListItem';
import {statisOilwearForOneRoute} from '../../../services/AppService';
import BorderButton from '../../../components/BorderButton';
import PageList from '../../../components/PageList';

import Env from '../../../utils/Env';
const estyle = Env.style;


export default class OilManageSetMark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '请选择车辆',
            timeType: 1,
            showSelect: true
        }
    }

    //跳转去选择车辆
    selectCar() {
        this.props.router.push(OilManageSelectCar, {
            routeId: this.props.routeId,
            date: this.props.date,
            setCar: this.setCar.bind(this)
        })
    }

    //选择车辆之后执行的方法
    setCar(carInfo) {
        this.setState({
            title: carInfo.carCode,
            carId: carInfo.carId,
            showSelect:false
        })
    }

    //设置标杆
    setStandard() {
        let msg = this.props.isOccupy ? this.props.routeName + '的线路已存在标杆，是否替换？' : '是否将此段轨迹设为线路标杆？';
        if (this.selectDate) {
            this.props.alert('设置标杆', msg, [
                {
                    text: '确认', onPress: () => {

                    standardMark({
                        routeId: this.props.routeId,
                        carId: this.state.carId,
                        startTime: moment(this.selectDate.beginDate).format('YYYY-MM-DD HH:mm'),
                        endTime: moment(this.selectDate.endDate).format('YYYY-MM-DD HH:mm'),
                        // totalMileage: Math.floor(rs.mileageTotal),
                        // totalOilwear: rs.oilwearTotal,
                        // avgOilwear: rs.oilwearAvg,
                        // avgSpeed: 66,
                        // level: 0,
                    })
                        .then(rs => {
                            this.props.backFuns.forEach((item, index) => {
                                index == 0 ? item(1) : item()
                            });
                            this.props.isOccupy ? this.props.router.popN(2) : this.props.router.pop();
                        }).catch(e => {
                        Toast.show(e.message, Toast.SHORT);
                    });

                }
                },
                {text: '取消'},
            ])
        } else {
            Toast.show('请选择车辆与时间', Toast.SHORT);
        }
    }

    componentDidMount() {
        // this.props.alert('提示', '请选择一辆车查看轨迹', [{text: '选择车辆', onPress: this.selectCar.bind(this)}])
    }

    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner
                    {...this.props}
                    titleView={
                        <TouchableOpacity onPress={() => this.setState({showSelect:true})}
                                          style={[estyle.fx1, estyle.fxRow, estyle.fxRowCenter, {backgroundColor: 'transparent'}]}>
                            <Text style={[estyle.articleTitle, {color: '#FFF'}]}>{this.state.title}</Text><IconArrowDown
                            color="#FFF"/>
                        </TouchableOpacity>
                    }
                />
                <View style={[
                    styles.optionContainer,
                    {
                        zIndex: 10,
                        height: ( this.state.showSelect ?  Env.screen.height - 84 * basefont : 0)}
                        ]
                } visible={false}>
                    <PageList
                        style={[{height:(this.state.showSelect ? Env.screen.height/2 : 0)}]}
                        renderRow={(row) => {
                            return (
                                <ListItem left={row.carCode} right={<BorderButton onPress={() => this.setCar(row)}>选择</BorderButton>} />
                            )
                        }}
                        fetchData={(pageNumber, pageSize) => {
                            return statisOilwearForOneRoute(
                                pageNumber,
                                pageSize,
                                this.props.routeId,
                                this.props.date.format('YYYYMMDD'))
                        }}
                    />
                </View>
                {this.state.carId ?
                    <TrackPlayback
                        {...this.props}
                        onTimeChange={(date) => {
                            this.selectDate = date
                        }}
                        nav={{carId: this.state.carId}}
                    /> :
                    <View style={[estyle.fx1]}/>}
                <View>
                    <View style={[
                        estyle.padding,
                        estyle.borderBottom,
                        estyle.fxRow,
                        estyle.fxRowCenter
                    ]}>
                        <Text style={estyle.fx1}> </Text>
                        <BorderButton style={{marginRight: Env.font.base * 6}} onPress={() => {
                            this.setStandard()
                        }}>设为标杆</BorderButton>
                        <TouchableOpacity onPress={ () => {
                            this.props.alert('为什么设定标杆？', '线路标杆将自动推荐给您车队内的所有司机师傅，让优秀的驾驶经验快速传播，全车队省油效率整体提高。')
                        } }><IconQuestion color={Env.color.main} size={Env.font.text * 1.5}/></TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const basefont = Env.font.base;
const styles = StyleSheet.create({
    optionContainer: {
        position: 'absolute',
        width: Env.screen.width,
        height:0,
        backgroundColor: Env.color.modalBg,
        top: 84 * basefont + Env.style.iosStatusBarHeight.paddingTop
    }
});