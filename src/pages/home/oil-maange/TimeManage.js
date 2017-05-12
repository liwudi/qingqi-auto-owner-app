/**
 * Created by linyao on 2017/5/4.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';

import moment from 'moment';
import Toast from '../../../components/Toast';
import TopBanner from '../../../components/TopBanner';
import * as Icons from '../../../components/Icons';
import {statisRunningTime, statisRunningTimeByDay} from '../../../services/AppService';
import Env from '../../../utils/Env';
import PageList from '../../../components/PageList';
import Echarts from '../../../components/ECharts';
import MyCarTimeItem from './components/MyCarTimeItem';
import {IconQuestion} from '../../../components/Icons';
import CountQuestion from './CountQuestion';

const estyle = Env.style;
let currentDate = moment();
function getWeekDays(num) {
    let _d = currentDate.clone().add(num * 7, 'd');

    let weeks = [];
    for(let i = 0; i < 7; i++){
        weeks.push(_d.clone().add(i - 6, 'd'));
    }
    return weeks;
}

export default class TimeManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex:6,
            weeks: getWeekDays(),
            value:'',
            datas: [],
            type : 1 //1行驶时长 2是怠速时长
        };
        this.weekIndex = 0;
    }

    _preWeek(){
        this.weekIndex--;
        this.setState({
            weeks: getWeekDays(this.weekIndex)
        },()=>{ this._getStatisOilwearByDay() })
    }

    _nextWeek(){
        if(this.weekIndex >= 0) return;
        this.weekIndex++;
        this.setState({
            weeks: getWeekDays(this.weekIndex)
        },()=>{ this._getStatisOilwearByDay() })
    }

    _getStatisOilwearByDay(){
        statisRunningTime(
            this.state.weeks[0].format('YYYYMMDD'),
            this.state.weeks[this.state.weeks.length - 1].format('YYYYMMDD')
        ).then(rs => {
            this.setState({datas : rs.list || []},()=>{
                this.initValue();
            });
        }).catch(e => {
            Toast.show(e.message,Toast.SHORT);
        })
    }
    initValue(){
        let val;
        if(!this.state.datas|| this.state.datas.length<1){
            val = 0;
        }else {
            if(this.state.datas[this.state.datas.length-1].statisDate == this.state.weeks[6].format('YYYYMMDD')){
                val = this.state.type === 1 ? this.state.datas[this.state.datas.length-1].runningMinutes : this.state.datas[this.state.datas.length-1].idleMinutes ;
                val = (val/60).toFixed(2);
            }else {
                val = 0;
            }
        }
        this.setState({value : val })
    }

    componentDidMount(){
        this._getStatisOilwearByDay();
    }
    selectType(t){
        this.setState({type:t},()=>{this.initValue()});
    }

    render() {

        const option = {
            title: {
                show:false
            },
            tooltip: {
                show:false
            },
            grid:{
                x:50,
                x2:20,
                y:20,
                y2:40
            },
            legend: {
                data:['时长'],
                show:false
            },
            xAxis: {
                data: []
            },
            yAxis: {},
            series: [{
                name: '时长',
                type: 'bar',
                data: []
            }]
        };

        let _curDate =  this.state.weeks[this.state.currentIndex].format('YYYY-MM-DD');
        this.state.weeks.map((date, index) => {
            let _d = this.state.datas.filter((item) => item.statisDate == date.format('YYYYMMDD'));
            let _d_ = date.format('YYYY-MM-DD'),
                _cd = _curDate,val;
            if(_d.length > 0){
                val = this.state.type === 1 ? _d[0].runningMinutes : _d[0].idleMinutes;
                val = val ? (val/60).toFixed(2): 0;
            }else {
                val = 0;
            }
            option.xAxis.data.push(_d_);
            option.series[0].data.push({
                value : val,
                itemValue: (_d[0] || {}),
                index:index,
                label:{
                    normal:{show:true,position:'top'}
                },
                itemStyle:{
                    normal: {color: _d_ === _cd ? '#88C057' : Env.color.main}
                    /*normal: {color: Env.color.main},
                     emphasis:{color: '#88C057'}*/
                }
            });
        });

        const chart = () => {
            if(!this.chart || JSON.stringify(option) !== JSON.stringify(this.option || {})){
                this.chart = <Echarts option={option} height={Env.font.base*340} onClick={e => {
                    this.setState({currentIndex: e.index,value : e.value})
                }}/>;
                this.option = option;
            }
            return this.chart;
        }

        return (
            <View style={[estyle.containerBackgroundColor,estyle.fx1]}>
                {/*<TopBanner {...this.props} title="运营里程统计"/>*/}
                <View style={[estyle.fxRow,estyle.cardBackgroundColor,estyle.fxColumnCenter,estyle.fxCenter]}>
                    <View style={[estyle.fxRow,estyle.fxCenter,estyle.marginLeft]}>
                        <TouchableOpacity onPress={()=>{this.selectType(1)}}>
                            <Text style={[estyle.paddingHorizontal,estyle.note,this.state.type === 1 ? styles.currrntBtn : styles.btn]}>行驶时长</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.selectType(2)}}>
                            <Text style={[estyle.paddingHorizontal,estyle.note,this.state.type === 2 ? styles.currrntBtn : styles.btn]}>怠速时长</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[estyle.fx1,estyle.fxRow,estyle.fxCenter,estyle.padding]}>
                        <TouchableOpacity onPress={this._preWeek.bind(this)}  style={[estyle.fx1,estyle.fxRow,estyle.fxCenter]}>
                            <Icons.IconArrowLeft style={styles.textBlue}/>
                            <Text style={[styles.textBlue]}>上一周</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._nextWeek.bind(this)} style={[estyle.fx1,estyle.fxRow,estyle.fxCenter]}>
                            <Text  style={[this.weekIndex >= 0 ? estyle.note : styles.textBlue]}>下一周</Text>
                            <Icons.IconArrowRight style={this.weekIndex >= 0 ? estyle.note : styles.textBlue}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[estyle.fxCenter,estyle.paddingVertical]}><Text style={[estyle.note]}>{this.state.weeks[this.state.currentIndex].format('YYYY年MM月DD日')}{this.state.type === 1 ? '行驶时长' : '怠速时长' }{this.state.value+'h'}</Text></View>
                {chart()}
                <View style={[estyle.padding,estyle.fxRow]}>
                    <Text style={[estyle.note,estyle.fx1]}>{this.state.weeks[this.state.currentIndex].format('YYYY年MM月DD日')} 车辆运行时长详情</Text>
                    <TouchableOpacity style={[estyle.fxRow,estyle.fxCenter]} onPress={()=>{
                        this.props.router.push(CountQuestion);
                    }}>
                        <IconQuestion color={Env.color.main}/>
                        <Text style={[estyle.note]}>名称解释</Text>
                    </TouchableOpacity>
                </View>
                <PageList
                    style={[estyle.cardBackgroundColor, estyle.fx1]}
                    renderRow={(row) => {
                        return (
                            <MyCarTimeItem
                                data={row}
                            />
                        )
                    }}
                    fetchData={(pageNumber, pageSize) => {

                        return statisRunningTimeByDay(pageNumber, pageSize,this.state.weeks[this.state.currentIndex].format('YYYYMMDD'))
                    }}
                    reInitField={[this.state.weeks[this.state.currentIndex].format('YYYYMMDD')]}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    articleBlue:{
        fontSize:Env.font.articleTitle,
        color:Env.color.main
    },
    textBlue:{
        fontSize:Env.font.note,
        color:Env.color.main
    },
    currrntBtn:{
        backgroundColor: Env.color.auxiliary,
        color: '#fff'
    },
    btn:{
        backgroundColor: '#fff',
    }
});