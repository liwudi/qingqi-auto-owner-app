/**
 * Created by ligj on 2016/10/20.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    ListView,
    RefreshControl
} from 'react-native';

import Env from '../utils/Env';

import Toast from './Toast';


//https://github.com/hugohua/rn-listview-example/blob/master/index.ios.js
export default class PageList extends Component {

    pageNumber = 1;
    pageSize = 20;

    static defaultProps = {
        getSectionData: data => data
    }

    constructor(props){
        super(props);

        this.pageNumber = this.props.pageNumber || this.pageNumber;
        this.pageSize = this.props.pageSize || this.pageSize;

        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        this._data = {};
        this.state = {
            ds,
            refreshing: true,
            isLoading : false,
            isInit:false,
            pageTotal : 0,
            resultList : []
        };
        this.reInitField = this.props.reInitField || null;
    }

    getData(pageNumber){

        this.pageNumber = pageNumber || this.pageNumber;
        this.props.fetchData(this.pageNumber, this.pageSize)
            .then(rs => {
                this._data = rs.list && rs.list.length > 0 ? Object.assign({}, this._data, this.props.getSectionData(rs.list)) : this._data;

                if(this._data){
                    this.setState({
                        ds: this.state.ds.cloneWithRowsAndSections(this._data),
                        pageTotal : rs.page_total
                    });
                }
            })
            .catch(e => {
                Toast.show(e.message || '未获取到数据', Toast.SHORT);
            })
            .finally(() => {
                this.setState({
                    isLoading : false,
                    refreshing: false
                });
            });
    }

    nextPage(){
        this.setState({
            isLoading : true
        });
        this.pageNumber++;
        this.getData();
    }

    componentDidMount(){
        this.getData();
    }

    reInitFetch(){
        this._data = [];
        this.getData(1);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.reInitField){
            if(
                this.reInitField.some((item, index) => {
                    return item != nextProps.reInitField[index];
                })
            ){
                this._data = [];
                this._onRefresh();
            }
            this.reInitField = nextProps.reInitField;
        }
    }

    _onRefresh = ()=>{
        this.setState({
            refreshing: true
        });
        this._data = [];
        this.getData(1);
    }

    render() {
        return (
            <View  style={[this.props.style]}>
                <ListView
                    style={{flex:1}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                            colors={Env.refreshCircle.colors}
                            progressBackgroundColor={Env.refreshCircle.bg}
                        />
                    }
                    enableEmptySections={true}
                    dataSource={this.state.ds}
                    renderRow={this.props.renderRow}
                    renderSectionHeader={this.props.renderSectionHeader}
                    renderFooter={() => {
                        if((this.state.pageTotal || this._data.length) <= this.pageNumber){
                            return (this.state.isLoading || this.state.refreshing) ? null : <View style={[Env.style.fxCenter, Env.style.padding]}><Text>{this._data.length === 0 ? '没有数据' : '已经没有更多数据了'}</Text></View>;
                        }else {
                            return <View style={[Env.style.fxCenter, Env.style.padding]}><Text onPress={() => this.nextPage()}>{this.state.isLoading ? '加载中...' : '加载更多'}</Text></View>
                        }
                    }}
                />
            </View>

        );
    }
}
