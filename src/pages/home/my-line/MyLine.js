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
import PageList from '../../../components/PageList';
import Env from '../../../utils/Env';
import Item from './components/MyLineItem';
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

    render() {
        const topRightView= () => {
            return (
                <TouchableOpacity style={{marginRight:Env.font.base * 10}} onPress={() => {this.toPage(MyLineAdd)}}>
                    <Icons.IconPlus color="#FFF" size={Env.font.base * 40}/>
                </TouchableOpacity>
            )
        };
        return (
            <View style={[estyle.fx1,estyle.containerBackgroundColor]}>
                <TopBanner {...this.props} title="我的线路" rightView={ topRightView()}/>
                <View style={estyle.fx1}>
                    <PageList
                        style={estyle.fx1}
                        renderRow={(row) => {
                            return <Item
                                router={this.props.router}
                                data={row}
                                onPress={() => {
                                    this.props.router.push(MyLineAdd,{routeId: row.routeId, title: '编辑线路'});
                                }}
                            />
                        }}
                        fetchData={(pageNumber, pageSize) => {
                            return queryRouteList(pageNumber,pageSize)
                        }}
                    />
                </View>
            </View>
        );
    }
}