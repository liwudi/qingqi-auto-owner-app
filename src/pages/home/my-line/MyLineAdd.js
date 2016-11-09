/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/19
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import * as Icons from '../../../components/Icons';
import PageList from '../../../components/PageList';
const estyle = Env.style;
import Env from '../../../utils/Env';
import {IconUser} from '../../../components/Icons'
import {IconTrash} from '../../../components/Icons'
import Toast from '../../../components/Toast'
import MyLineSetStart from './MyLineSetStart';
import MyLineSetPass from './MyLineSetPass';
import MyLineSetEnd from './MyLineSetEnd';
import MyLineAddCarList from './MyLineAddCarList';
import MyLineSetMaxSpeed from './MyLineSetMaxSpeed';
import MyLineSetOilwearLimit from './MyLineSetOilwearLimit';
import {routeCarList, delCarRoute, routeInfo, modifyRoute} from '../../../services/LineService';

export default class MyLineAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carList: false,
            renovate: false,
            pass:[]
        };
    }

    onRenovate(){
        this.setState({renovate:!this.state.renovate});
    }

    carList(){
        if (this.state.carList) {
            return <PageList
                style={estyle.fx1}
                reInitField={[this.state.renovate]}
                renderRow={(row) => {
                        return <View style={[estyle.fxRow,estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
                    <View style={estyle.fx1}>
                        <Text style={[estyle.articleTitle]}>{row.carCode}</Text>
                        <View style={[estyle.fxRow, estyle.fxRowCenter,estyle.paddingTop]}>
                            <IconUser color={Env.color.main}/>
                            <Text style={[estyle.note, estyle.marginLeft]}>主：</Text>
                            <Text style={[estyle.note, {color: Env.color.text}]}>{row.mainDriverName}</Text>
                            <Text style={[estyle.marginLeft]}>副：</Text>
                            <Text style={[estyle.note, {color: Env.color.text}]}>{row.subDriverName}</Text>
                        </View>
                    </View>
                    <View style={[estyle.paddingRight, estyle.fxCenter]}>
                        <IconTrash onPress={()=>{
                        this.delCarRoute(row.carId);
                    }}/>
                    </View>
                </View>;
                        }}
                fetchData={(pageNumber, pageSize) => {
                        return routeCarList(pageNumber,pageSize,this.props.routeId)
                        }}
            />
        }
    }

    delCarRoute(carId) {
        delCarRoute(carId)
            .then(()=>{
                Toast.show('删除成功', Toast.SHORT);
                this.onRenovate();
            })
            .catch((e)=>{
                Toast.show(e.message, Toast.SHORT);
            })
    }

    delPass(pass) {
        let opts={};
        routeInfo(this.props.routeId)
        	.then((data)=>{
        		opts = data;
        		opts.routeId = this.props.routeId;
        		opts.passbyPoints = JSON.stringify(pass);
        		modifyRoute(opts)
        			.then(()=>{
        				Toast.show('删除途经点成功', Toast.SHORT);
        			})
        			.catch((e)=>{
        				Toast.show(e.message, Toast.SHORT);
        			})
        	})
        	.catch((e)=>{
        		Toast.show(e.message, Toast.SHORT);
        	})
    }

    passVia(pass) {
        return pass.map((item, idx) => {
            return <View style={[estyle.fxRow,estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
                <View style={estyle.fx1}><Text>{item.pointName}</Text></View>
                <View style={[estyle.paddingRight, estyle.fxCenter]}>
                    <IconTrash onPress={()=>{
                        this.props.pass = pass.splice(idx,1);
                        this.delPass(this.props.pass);
                        this.forceUpdate();
                    }}/>
                </View>
            </View>
        })
    }

    componentWillReceiveProps() {
        if (!(typeof this.props.carList == 'undefined')) {
            this.setState({carList:true});
        }
        this.onRenovate();
        console.log(this.props.pass)
        if (!(typeof this.props.pass == 'undefined')) {
            this.setState({isPass:true});
        }
    }

    render() {
        return (
            <View style={estyle.fx1}>
                <TopBanner {...this.props} title="添加线路"/>
                <ScrollView style={[estyle.fx1,estyle.containerBackgroundColor]}>
                    <View style={estyle.padding}><Text style = {{color:Env.color.main}}>起终点</Text></View>
                    <View style={estyle.cardBackgroundColor}>
                        <View style={[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
                            <View style={estyle.fx1}><Text>起点</Text></View>
                            <Text onPress={() => {
                                this.props.router.push(MyLineSetStart);
                            }} style={styles.noteBlue}>{this.props.startPointName || '点击设置'}</Text>
                        </View>
                        <View style={[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
                            <Text style={estyle.fx1}>终点</Text>
                            <Text onPress={() => {
                                this.props.router.push(MyLineSetEnd,
                                {start:{
                                    startPointName:this.props.startPointName,
                                    startCityCode:this.props.startCityCode,
                                    startPointPos:this.props.startPointPos,
                                    startPointDes:this.props.startPointDes
                                }});
                            }} style={styles.noteBlue}>{this.props.endPointName || '点击设置'}</Text>
                        </View>
                    </View>

                    <View style={[estyle.padding,estyle.fxRow]}>
                        <View style={estyle.fx1}><Text style = {{color:Env.color.main}}>途径点</Text></View>
                        <View style={estyle.paddingRight}><Icons.IconPlus onPress={() => {
                            this.props.router.push(MyLineSetPass,{routeId:this.props.routeId, pass:this.props.pass});
                        }}/></View>
                    </View>
                    {this.passVia(this.props.pass || [])}

                    <View style={estyle.padding}><Text style = {{color:Env.color.main}}>驾驶规定</Text></View>
                    <View style={estyle.cardBackgroundColor}>
                        <View style={[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
                            <View style={estyle.fx1}><Text>最高时速</Text></View>
                            <Text style={[styles.noteBlue,estyle.paddingRight]}>{this.props.maxSpeed}</Text>
                            <Text style={styles.noteBlue} onPress={() => {
                                this.props.router.push(MyLineSetMaxSpeed,{routeId:this.props.routeId});
                            }}>点击设置</Text>
                        </View>
                        <View style={[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
                            <View style={estyle.fx1}><Text>总油耗限制</Text></View>
                            <Text style={[styles.noteBlue,estyle.paddingRight]}>{this.props.oilwearLimit}</Text>
                            <Text style={styles.noteBlue} onPress={() => {
                                this.props.router.push(MyLineSetOilwearLimit,{routeId:this.props.routeId});
                            }}>点击设置</Text>
                        </View>
                    </View>
                    <View style={[estyle.padding,estyle.fxRow]}>
                        <View style={estyle.fx1}><Text style = {{color:Env.color.main}}>设置车辆</Text></View>
                        <View style={estyle.paddingRight}><Icons.IconPlus onPress={() => {
                            this.props.router.push(MyLineAddCarList,{routeId:this.props.routeId});
                        }}/></View>
                    </View>
                    {this.carList()}
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    noteBlue:{
        fontSize:Env.font.note,
        color:Env.color.main
    }
});