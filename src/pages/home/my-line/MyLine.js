/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/21
 * Edit by yaocy on 2016/11/2
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    RefreshControl,
    TouchableOpacity
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import * as Icons from '../../../components/Icons';
import ConfirmButton from '../../../components/ConfirmButton';
import Env from '../../../utils/Env';
import Item from './components/MyLineItem';
import NoLine from './components/NoLine';
import MyLineAdd from './MyLineAdd';
import {queryRouteList} from '../../../services/LineService';

const estyle = Env.style;

export default class MyLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing : false,
            isSearch : false
        };
    }
    toPage = (component) => {
        this.props.router.push(component);
    }

    finaliy() {
        this.setState({isRefreshing: false});
        this.setState({isSearch: false});
    }

    fetchData() {
        this.setState({isRefreshing: true});
        queryRouteList()
            .then((data)=>{
                console.info('--------------------')
                console.info(data)
                this.setState({data});}
            )
            .catch(()=>{
                this.finaliy();
            })
            .finally(()=>{
                this.finaliy();
            });
    };

    componentWillMount() {
        this.fetchData();
    }

    onRefresh() {
        this.fetchData();
    }

    renderList() {
        let data = this.state.data;
        return data.list.map((item, idx) => {
            return <Item router={this.props.router} data={item}/>;
        })
    }

    renderView() {
        if(this.state.data) {
            return this.state.data.list.length ? this.renderList() : <NoLine/>;
        }
        return <View/>;
    }

    render() {
        const topRightView= () => {
            return (
                <View>
                    <Icons.IconSearch  onPress={() => {this.toPage()}}/>
                </View>
            )
        };
        return (
            <View style={[estyle.fx1,estyle.containerBackgroundColor]}>
                <TopBanner {...this.props} title="我的线路" rightView={ topRightView()}/>
                <View style={estyle.fx1}>
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
                <View style={[estyle.fxRow,estyle.cardBackgroundColor,estyle.fxCenter]}>
                    <View style={estyle.padding}>
                        <ConfirmButton size="small" onPress={() => {this.toPage(MyLineAdd)}}>添加线路</ConfirmButton>
                    </View>
                </View>

            </View>
        );
    }
}