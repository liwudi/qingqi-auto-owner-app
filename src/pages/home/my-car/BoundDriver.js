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

const estyle = Env.style;
export default class MyDriver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch : false,
            keyWord: ''
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

    bindLine(driverId){
        bindDriver({
            driverId:driverId,
            carId:this.props.nav.carId,
            driverType:this.props.nav.driverType
        })
            .then(()=>{
                ToastAndroid.show('绑定成功！', ToastAndroid.SHORT);
                this.props.update();
                this.props.router.pop();
            })
            .catch((e)=>{
                ToastAndroid.show(e.message, ToastAndroid.SHORT);
            })
    }

    render() {
        return (
            <View style={[estyle.fx1,estyle.containerBackgroundColor]}>
                <TopBanner
                    {...this.props}
                    title="选择司机"
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
                                        {
                                            row.registerStatus == 1
                                                ? <BorderButton  style={[estyle.marginLeft]} onPress={() => this.bindLine(row.driverId)}>绑定</BorderButton>
                                                : <Text style={[estyle.note,estyle.marginLeft]}>未注册</Text>
                                        }

                                    </View>
                                </View>
                            )
                        }}
                        fetchData={(pageNumber, pageSize) => {
                            return queryDriver(pageNumber,pageSize,this.state.keyWord)
                        }}
                    />

                </View>
            </View>
        );
    }
}