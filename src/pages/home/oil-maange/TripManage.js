/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/25
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
import {statisMileageByDay, statisOilwearByDay} from '../../../services/AppService';
import Env from '../../../utils/Env';
const estyle = Env.style;
import PageList from '../../../components/PageList';

import Echarts from '../../../components/ECharts';

import MyCarItem from './components/MyCarItem';

let currentDate = moment();
function getWeekDays(num) {
	let _d = currentDate.clone().add(num * 7, 'd');

	let weeks = [];
	for(let i = 0; i < 7; i++){
		weeks.push(_d.clone().add(i - 6, 'd'));
	}
	return weeks;
}

export default class TripManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentIndex:6,
			weeks: getWeekDays(),
            datas: []
		}
		this.weekIndex = 0;
	}

    /**
     * 这个方法是为了在内部更改完车牌号回退是列表能够刷新
     * */
    backRender(){
        this.setState({
            isRender: new Date().getTime()
        })
    }

	_preWeek(){
        this.weekIndex--;
		this.setState({
            weeks: getWeekDays(this.weekIndex)
		})
	}

    _nextWeek(){
		if(this.weekIndex >= 0) return;
        this.weekIndex++;
        this.setState({
            weeks: getWeekDays(this.weekIndex)
        })
    }

	_getStatisOilwearByDay(){
		statisOilwearByDay(
			this.state.weeks[0].format('YYYYMMDD'),
			this.state.weeks[this.state.weeks.length - 1].format('YYYYMMDD')
		).then(rs => {
			this.setState({datas : rs.list || []});
		}).catch(e => {
			Toast.show(e.message,Toast.SHORT);
		})
	}

	componentDidMount(){
		this._getStatisOilwearByDay();
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
                y:10,
                y2:40
            },
            legend: {
                data:['里程'],
                show:false
            },
            xAxis: {
                data: []
            },
            yAxis: {},
            series: [{
                name: '里程',
                type: 'bar',
                data: []
            }]
        };

		this.state.weeks.map((date, index) => {
			let _d = this.state.datas.filter((item) => item.statisDate == date.format('YYYYMMDD'));
            option.xAxis.data.push(date.format('MM-DD'));
            option.series[0].data.push({
                value : _d.length > 0 ? _d[0].mileage : 0,
                itemValue: (_d[0] || {}),
                index:index,
                label:{
                    normal:{show:true,position:'top'}
                },
                itemStyle:{
                    normal:{color: Env.color.main},
                    emphasis:{color: '#88C057'}
                }
            });
		});

        const chart = () => {
            if(!this.chart || JSON.stringify(option) !== JSON.stringify(this.option || {})){
                this.chart = <Echarts option={option} height={Env.font.base*340} onClick={e => {
                    this.setState({currentIndex: e.index})
                }}/>;
                this.option = option;
            }
            return this.chart;
        }

		return (
			<View style={[estyle.containerBackgroundColor,estyle.fx1]}>
				<TopBanner {...this.props} title="运营里程统计"/>
				<View style={[estyle.fxRow,estyle.fxCenter,estyle.padding,{backgroundColor:'#FFF'}]}>
					<TouchableOpacity onPress={this._preWeek.bind(this)}  style={[estyle.fx1,estyle.fxRow,estyle.fxCenter]}>
						<Icons.IconArrowLeft style={styles.textBlue}/>
						<Text style={[styles.textBlue]}>上一周</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this._nextWeek.bind(this)} style={[estyle.fx1,estyle.fxRow,estyle.fxCenter]}>
						<Text  style={[this.weekIndex >= 0 ? estyle.note : styles.textBlue]}>下一周</Text>
						<Icons.IconArrowRight style={this.weekIndex >= 0 ? estyle.note : styles.textBlue}/>
					</TouchableOpacity>
				</View>
                {chart()}
				<View style={estyle.padding}><Text>{this.state.weeks[this.state.currentIndex].format('YYYY年MM月DD日')} 车辆行驶里程详情</Text></View>
				<PageList
					style={[estyle.cardBackgroundColor, estyle.fx1]}
					renderRow={(row) => {
						return (
							<MyCarItem
								data={row}
								/>
						)
					}}
					fetchData={(pageNumber, pageSize) => {

						return statisMileageByDay(pageNumber, pageSize,this.state.weeks[this.state.currentIndex].format('YYYYMMDD'))
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
	}
});