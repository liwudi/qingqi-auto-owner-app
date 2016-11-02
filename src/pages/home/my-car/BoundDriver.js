/**
 * Created by yaocy on 2016/11/1.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    ToastAndroid
} from 'react-native';

import Env from '../../../utils/Env';
import TopBanner from '../../../components/TopBanner';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import * as Icons from '../../../components/Icons';
import LabelInput from '../../../components/LabelInput';
import Item from '../my-driver/components/MyDriverItem';
import NoDriver from '../my-driver/components/NoDriver';
import CarDetail from './CarDetail';
import {queryDriver, bindDriver} from '../../../services/MyDriverService';
const estyle = Env.style;
export default class BoundDriver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing : false,
            isSearch : false,
            driverId : '',
            driverType:''
        };
    }

    finaliy() {
        this.setState({isRefreshing: false});
        this.setState({isSearch: false});
    }

    fetchData() {
        this.setState({isRefreshing: true});
        queryDriver(null,null,this.state.keyWord)
            .then((data)=>{
                console.info('--------------------')
                console.info(data)
                this.setState({data});
            })
            .catch(this.finaliy)
            .finally(this.finaliy);
    };

    onRefresh() {
        this.fetchData();
    }

    onSearch() {
        if (this.state.isSearch) {
            this.setState({isSearch:false});
        } else {
            this.setState({isSearch:true});
        }
    }

    doSearch() {
        this.setState({isSearch: false});
        this.fetchData();
        this.setState({keyWord: ''});
    }

    bindDriver(id) {
        bindDriver({driverId:id,carId:this.props.nav.carId,driverType:this.props.nav.driverType})
            .then(()=>{
                ToastAndroid.show('绑定成功！', ToastAndroid.SHORT);
                this.timer=setTimeout(()=>{
                    this.props.router.replace(CarDetail, {nav: {
                        carId: this.props.nav.carId
                    }});
                },500)
            })
            .catch((e)=>{
                ToastAndroid.show(e.message, ToastAndroid.SHORT);
            })
    }

    componentWillMount() {
        this.fetchData();
    }

    /**
     * 组件销毁时调用
     */
    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    //加载Item，司机列表
    itemList(dtoList){
        return dtoList.map((item, idx) => {
            return <ViewForRightArrow rightIcon={Icons.IconArrowRight} onPress={this.bindDriver.bind(item.id)}>
                <Item router={this.props.router} data={item}/>
            </ViewForRightArrow>;
        })
    }

    //加载字母View
    renderList() {
        let data = this.state.data;
        return data.list.map((item, idx) => {
            return <View>
                <View style={[estyle.padding]}>
                    <Text style={estyle.text}>{item.key}</Text>
                </View>
                {this.itemList(item.dtoList)}
            </View>
        })
    }

    renderView() {
        if(this.state.data) {
            return this.state.data.list.length ? this.renderList() : <NoDriver/>;
        }
        return <View/>;
    }

    renderSearchView() {
        if(this.state.isSearch) {
            return <ViewForRightArrow rightIcon={Icons.IconSearch} onPress={this.doSearch.bind(this)}>
                <LabelInput
                    style = {[estyle.borderBottom]}
                    placeholder='请输入司机姓名或手机号'
                    label="搜索"
                    labelSize="3"
                    ref="keyWord"
                    onChangeText={keyWord => this.setState({keyWord})}/>
            </ViewForRightArrow>;
        }
    }

    render() {
        return (
            <View style={[estyle.fx1,estyle.containerBackgroundColor]}>
                <TopBanner
                    {...this.props}
                    title="绑定司机"
                    rightView={(<Icons.IconSearch color='#FFF' onPress={this.onSearch.bind(this)}/>)}
                />
                {this.renderSearchView()}
                <View style={[estyle.fx1]}>
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
            </View>
        )
    }
}