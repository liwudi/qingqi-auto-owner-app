/**
 * Created by cryst on 2016/10/18.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import Env from '../../utils/Env';
import TopBanner from '../../components/TopBanner';
import LabelInput from '../../components/LabelInput';
import ViewForRightArrow from '../../components/ViewForRightArrow';
import PageList from '../../components/PageList';
import CarDetail from './my-car/CarDetail';
import {IconUser} from '../../components/Icons';
import {IconSearch} from '../../components/Icons';
import {queryRealTimeCarList} from '../../services/MonitorService';
const estyle = Env.style;
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: ''
        };
    }
    carDetail(data) {
        this.props.router.push(CarDetail,{nav:data});
    }
    render() {
        const SpeedView= (realtimeSpeed) => {
            if (realtimeSpeed == 0) {
                return "静止";
            } else {
                return realtimeSpeed + "km/h";
            }
        }

        const itemView= (item) => {
            return (
                <View style={[estyle.fxRow,estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
                    <View style={estyle.fx1}>
                        <View style={[estyle.fxRow]}>
                            <View style={[estyle.fx1,estyle.text,estyle.paddingTop]}>
                                <Text style={[estyle.articleTitle,{color: Env.color.main}]}>{item.carCode}</Text>
                            </View>
                            <View style={[estyle.paddingRight,estyle.text,estyle.paddingTop]}>
                                <Text style ={{textAlign:'right'}}>今日：<Text style ={[styles.noteBlue]}>{item.todayLen}</Text> 公里</Text>
                            </View>
                        </View>
                        <View style={[estyle.fxRow, estyle.fxRowCenter,estyle.paddingTop]}>
                            <IconUser color={Env.color.main}/>
                            <Text style={[estyle.note, estyle.marginLeft]}>主：</Text>
                            <Text style={[estyle.note, {color: Env.color.main}]}>{item.mastDriver}</Text>
                            <Text style={[estyle.marginLeft]}>副：</Text>
                            <Text style={[estyle.note, {color: Env.color.main}]}>{item.slaveDriver}</Text>
                        </View>
                        <View style={[estyle.fxRow, estyle.fxRowCenter,estyle.paddingTop]}>
                            <View style={[estyle.fx1,estyle.text,estyle.paddingTop]}>
                                <View style={[estyle.fxRow]}>
                                    <Image
                                        style={{borderRadius:10,width:20,height:20,borderWidth:4 * Env.font.base,borderColor:'#85C7E7',}}
                                        source={require('../../assets/images/icon-4.png')}
                                    />
                                    <Text style={[estyle.marginFont,{color: Env.color.main}]}>{item.position}</Text>
                                </View>
                            </View>
                            <View style={[estyle.paddingRight,estyle.text,estyle.paddingTop]}>
                                <Text style={[estyle.marginFont,{color: Env.color.main,textAlign:'right'}]}>{SpeedView(item.realtimeSpeed)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        };

        return (
            <View>

                <ViewForRightArrow rightIcon={IconSearch}>
                    <LabelInput
                        style = {[estyle.borderBottom]}
                        placeholder='请输入司机姓名、VIN或车牌号'
                        labelSize="0"
                        ref="key"
                        onChangeText={key => this.setState({key:key})}/>
                </ViewForRightArrow>
                <PageList
                    style={estyle.fx1}
                    reInitField={[this.state.key]}
                    renderRow={(row) => {
                        return <TouchableOpacity onPress={() => this.carDetail(row)}>
                                    {itemView(row)}
                                </TouchableOpacity>
                        }}
                    fetchData={(pageNumber, pageSize) => {
                        return queryRealTimeCarList(pageNumber,pageSize,this.state.key)
                        }}
                />
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