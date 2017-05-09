/**
 * Created by linyao on 2017/5/6.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    RefreshControl
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import {queryFollowLine,delFollowLine} from '../../../services/AppService';
import RemoveItem from './components/RemoveItem';
import Toast from '../../../components/Toast';
const estyle = Env.style;
const basefont = Env.font.base;

export  default class RemoveFollowLine extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    fetchData() {
        this.setState({isRefreshing: true});
        queryFollowLine()
            .then((data) => {
                this.setState({data: data});
            })
            .catch((err) => {
                Toast.show(err.message, Toast.SHORT)
            })
            .finally(() => {
                this.setState({isRefreshing: false})
            });
    };

    onRefresh() {
        this.fetchData();
    }

    componentWillMount() {
        this.fetchData();
    }
    selectLine(item){
        if(this.state.doing) return;
        this.setState({doing:true},()=>{
            delFollowLine(item.id)
                .then(()=>{
                    Toast.show('删除成功',Toast.SHORT);
                    this.props.callBack();
                    this.props.router.pop();
                })
                .catch((err)=>{Toast.show(err.message,Toast.SHORT)})
                .finally(()=>{this.setState({doing:false})})
        });
    }

    renderList() {
        let data = this.state.data;
        if(!data) return <View/>;
        return data.map((item, idx) => {
            return <RemoveItem data={item} onPress={()=>{this.selectLine(item)}} key={idx}/>
        })
    }

    render() {
        return (
            <View style={[estyle.fx1, estyle.containerBackgroundColor]}>
                <View style={[estyle.fx1]}>
                    <TopBanner {...this.props} title="删除线路"/>
                    <ScrollView style={[estyle.fx1,estyle.marginTop]}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this.onRefresh.bind(this)}
                                        colors={Env.refreshCircle.colors}
                                        progressBackgroundColor={Env.refreshCircle.bg}
                                    />
                                }>
                        {this.renderList()}
                    </ScrollView>
                </View>
            </View>
        )
    }
}