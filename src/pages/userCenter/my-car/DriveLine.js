/**
 * Created by ligj on 2016/10/9.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    RefreshControl
} from 'react-native';

import Env from '../../../utils/Env';
const estyle = Env.style;

import ListItem from '../../../components/ListItem';
import ListTitle from '../../../components/ListTitle';
import TopBanner from '../../../components/TopBanner';
import DriveLineMarkAnalysis from './DriveLineMarkAnalysis';
import {routeInfo} from '../../../services/AppService';
import Item from './components/MyCarItem'
import ViewForRightArrow from '../../../components/ViewForRightArrow';

export default class DriveLine extends Component {
    constructor(props){
        super(props);
    }
    fetchData() {
        this.setState({isRefreshing: true});
        routeInfo(this.props.nav.routeId)
            .then((data)=>{this.setState({data});})
            .catch()
            .finally(()=>{this.setState({isRefreshing: false});});
    };
    onRefresh() {
        this.fetchData();
    }
    componentWillMount() {
        this.fetchData();
    }
    renderList() {
        let data = this.state.data;
        /*
        * data.startCityCode	String	起点行程区划code
        * data.startPointPos	String	起点坐标
        * data.startPointDes	String	起点逆地理
        * data.startRadius	Integer	起点半径
        * data.endCityCode	String	终点行程区划code
         data.endPointPos	String	终点坐标
         data.endPointDes	String	终点逆地理
         data.endRadius	Integer	终点半径
         data.passbyPoints	String	途经点信息
         data.routeid	String	路线ID
         data.carNum	String	标杆车辆车牌号
        * */
        return <View>
            <ListTitle title="起终点"/>
            <ListItem left="起点" right={data.startPointName}/>
            <ListItem left="终点" right={data.endPointName}/>
            <ListTitle title="途经点"/>
            <ListItem left="途经点" right="北京"/>

            <ListTitle title="驾驶规定"/>
            <ListItem left="最高车速" right={data.maxSpeed + "Km/h"}/>
            <ListItem left="总油耗限制" right={data.oilwearLimit + "L"}/>
            <ListTitle title="标杆车辆驾驶分析"/>
            <ViewForRightArrow onPress={this.goToDriveLineMarkAnalysis.bind(this)}>
                <Item data={data}/>
            </ViewForRightArrow>
{/*
            <CarDetail data={data} onPress={this.goToDriveLineMarkAnalysis.bind(this)} />
*/}
            {/*<ViewForRightArrow
                style={[estyle.padding, estyle.borderBottom, estyle.cardBackgroundColor]}
                onPress={this.goToDriveLineMarkAnalysis.bind(this)}
            >
                <Text style={[estyle.text, {textAlign: 'left', color: Env.color.important}]}>{data.carNum}</Text>
                <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                    <IconUser color={Env.color.main}/>
                    <Text style={[estyle.note, estyle.marginLeft]}>主：</Text>
                    <Text style={[estyle.note, {color: Env.color.text}]}>{data.mainDriver||"无"}</Text>
                    <Text style={[estyle.note, estyle.marginLeft]}>副：</Text>
                    <Text style={[estyle.note, {color: Env.color.text}]}>{data.subDriver||"无"}</Text>
                </View>
            </ViewForRightArrow>*/}
        </View>
    }
    goToDriveLineMarkAnalysis() {
        this.props.router.push(DriveLineMarkAnalysis);
    }
    renderView() {
        if(this.state.data) {
            return this.renderList();
        }
        return <View/>
    }
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="线路详情"/>
                <ScrollView style={[estyle.fx1]}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this.onRefresh.bind(this)}
                                    colors={Env.refreshCircle.colors}
                                    progressBackgroundColor={Env.refreshCircle.bg}
                                />
                            }>
                    {this.renderView()}
                </ScrollView>
            </View>
        );
    }
}