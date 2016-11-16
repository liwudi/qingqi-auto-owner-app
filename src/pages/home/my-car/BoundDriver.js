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
    ToastAndroid
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import ListTitle from '../../../components/ListTitle';
import Env from '../../../utils/Env';
import {queryDriver, bindDriver} from '../../../services/MyDriverService';
import PageSectionList from '../../../components/PageSectionList';
import LabelInput from '../../../components/LabelInput';
import BorderButton from '../../../components/BorderButton';
import {IconTrash} from '../../../components/Icons';
import Alert from  '../../../components/Modals/Alert';

const estyle = Env.style;
export default class MyDriver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch : false,
            keyWord: '',
            alertCActive:false
        };
    }

    renderSearchView() {
        if(this.state.isSearch) {
            return <LabelInput
                style = {[estyle.borderBottom]}
                placeholder='请输入司机姓名或手机号'
                label="搜索"
                labelSize="3"
                ref="keyWord"
                onChangeText={keyWord => this.setState({keyWord:keyWord})}/>;
        }
    }
    //解绑司机
    deleteDriver(){
        let driverId = this.props.nav.driverType == 1 ? this.props.nav.mainDriverId : this.props.nav.subDriverId;
        //todo 接口还没提供
        delDriver(driverId,this.props.nav.driverType,this.props.nav.carId)
            .then(()=>{
                this.props.update.forEach((item)=>{ item()});
                this.props.router.pop();
            })
            .catch()
            .finally(()=>{this.setState({alertCActive: false})})
    }

    bindLine(driverId){
        bindDriver({
            driverId:driverId,
            carId:this.props.nav.carId,
            driverType:this.props.nav.driverType
        })
            .then(()=>{
                ToastAndroid.show('绑定成功！', ToastAndroid.SHORT);
                this.props.update.forEach((item)=>{item()});
                this.props.router.pop();
            })
            .catch((e)=>{
                ToastAndroid.show(e.message, ToastAndroid.SHORT);
            })
    }
    driverState(row){
        if( row.registerStatus == 1 ){
                return <BorderButton  style={[estyle.marginLeft]} onPress={() => this.bindLine(row.driverId)}>绑定</BorderButton>
        }else {
            return <Text style={[estyle.note,estyle.marginLeft]}>未注册</Text>
        }
    }

    render() {
        return (
            <View style={[estyle.fx1,estyle.containerBackgroundColor]}>
                <TopBanner
                    {...this.props}
                    title="选择司机"
                    rightView={ <TouchableOpacity onPress={()=> {
                        this.setState({alertCActive: true})
                    } }><Text style={{fontSize:Env.font.text,color:'#FFF'}}>解绑司机</Text></TouchableOpacity>  }
                />
                {this.renderSearchView()}
                <View style={[estyle.fx1]}>
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
                <Alert visible={this.state.alertCActive}
                       title="解绑司机"
                       confirmTitle="确认"
                       cancelTitle="取消"
                       onConfirm={(()=> {
                           this.deleteDriver()
                       })}
                       onCancel={(()=> {
                           this.setState({alertCActive: false})
                       })}>
                    您确定要解除绑定{ this.props.nav.driverType === 1 ? '主驾驶' : '副驾驶' }吗？
                </Alert>
            </View>
        );
    }
}