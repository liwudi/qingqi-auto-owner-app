/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/25
 * Edit by yaocy on 2016/10/31
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import ListTitle from '../../../components/ListTitle';
import Env from '../../../utils/Env';
import {queryDriver, bindDriver,unbindDriver} from '../../../services/MyDriverService';
import PageSectionList from '../../../components/PageSectionList';
import LabelInput from '../../../components/LabelInput';
import BorderButton from '../../../components/BorderButton';
import {IconSearch} from '../../../components/Icons';
import Alert from  '../../../components/Modals/Alert';
import Toast from '../../../components/Toast';

const estyle = Env.style;
export default class MyDriver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch : false,
            keyWord: ''
        };
    }
    //解绑司机
    deleteDriver(){
        let driverId = this.props.nav.driverType == 1 ? this.props.nav.mainDriverId : this.props.nav.subDriverId;
        unbindDriver(driverId,this.props.nav.carId,this.props.nav.driverType)
            .then(()=>{
                this.props.update.forEach((item)=>{ item()});
                this.props.router.pop();
            })
            .catch()
            .finally(()=>{})
    }

    bindLine(driverId){
        if(this.state.doing) return;
        this.setState({doing:true});
        bindDriver({
            driverId:driverId,
            carId:this.props.nav.carId,
            driverType:this.props.nav.driverType
        })
            .then(()=>{
                Toast.show('绑定成功！', Toast.SHORT);
                this.props.update.forEach((item)=>{item()});
                this.props.router.pop();
            })
            .catch((e)=>{
                Toast.show(e.message, Toast.SHORT);
            })
            .finally(()=>{this.setState({doing:false})})
    }
    driverState(row){
        if( row.registerStatus == 1 ){
                return <BorderButton  style={[estyle.marginLeft]} onPress={() => this.bindLine(row.driverId)}>绑定</BorderButton>
        }else {
            return <Text style={[estyle.note,estyle.marginLeft]}>未注册</Text>
        }
    }

    rightView(){
        if(this.props.nav.driverType === 1 && this.props.nav.mainDriverId != null){
            return <TouchableOpacity onPress={()=> {
                this.removeBound();
            } }><Text style={{fontSize:Env.font.text,color:'#FFF'}}>解绑司机</Text></TouchableOpacity>
        }else if(this.props.nav.driverType === 2 && this.props.nav.subDriverId != null){
            return <TouchableOpacity onPress={()=> {
                this.removeBound();
            } }><Text style={{fontSize:Env.font.text,color:'#FFF'}}>解绑司机</Text></TouchableOpacity>
        }else {
            return <View/>
        }
    }

    removeBound(){
        this.props.alert(
            '提示',
            `您确定要解除绑定${ this.props.nav.driverType === 1 ? '主驾驶' : '副驾驶' }吗？`,
            [
                {text:'确认',onPress:() => {
                    this.deleteDriver();
                }},
                {text:'取消'}
            ]
        )
    }
    setKeyword = (keyWord) => {
        if(this.ktimer) {
            clearTimeout(this.ktimer);
        }
        this.ktimer = setTimeout(() => {
            let _k = this.state.keyWord.trim();
            if(_k != keyWord) {
                this.setState({keyWord}, this.fetchData);
            }
        }, 500);
    }
    render() {
        return (
            <View style={[estyle.fx1,estyle.containerBackgroundColor]}>
                <TopBanner
                    {...this.props}
                    title="选择司机"
                    rightView={ this.rightView.bind(this)() }
                />
                <LabelInput
                    style = {[estyle.borderBottom,  estyle.marginBottom]}
                    placeholder='请输入司机姓名或手机号'
                    labelSize="0"
                    ref="key"
                    rightView={<IconSearch color={Env.color.note}/>}
                    onChangeText={this.setKeyword}/>
                    <PageSectionList
                        ref="list"
                        style={estyle.fx1}
                        reInitField={[this.state.keyWord]}
                        getSectionData={(list) => {
                            let rs = {};
                            list.forEach(item => {
                                if(item.key){
                                    rs[item.key] = item.dtoList || [];
                                }
                            })
                            return rs;
                        }}
                        renderSectionHeader={(sectionData, sectionId) => {
                            return <ListTitle title={sectionId}/>
                        }}
                        renderRow={(row) => {
                            return (
                                <View style={[estyle.borderBottom, estyle.cardBackgroundColor, this.props.style]}>
                                    <View style={[estyle.margin, estyle.fxRow]}>
                                        <Text style={[estyle.text, {textAlign: 'left'}]}>{row.name}</Text>
                                        <Text style={[estyle.fx1,estyle.text,{textAlign: 'right', color: Env.color.note}]}>{row.phone}</Text>
                                        { this.driverState.bind(this)(row)}
                                    </View>
                                </View>
                            )
                        }}
                        fetchData={(pageNumber, pageSize) => {
                            return queryDriver(pageNumber,pageSize,this.state.keyWord)
                        }}
                    />
            </View>
        );
    }
}