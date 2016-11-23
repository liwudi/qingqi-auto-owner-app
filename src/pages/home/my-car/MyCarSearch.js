/**
 * Created by ligj on 2016/10/9.
 * edit by zhaidongyou on 2016/10/13
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
const estyle = Env.style;
import CarDetail from './CarDetail';
import PageList from '../../../components/PageList';
import LabelInput from '../../../components/LabelInput';
import MyCarItem from './components/MyCarItem';

import { IconSearch } from '../../../components/Icons';
import { queryRealTimeCarList } from '../../../services/MonitorService';

export default class MyCarSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key:'',
            selecting : false,
            myCarsInfo:{}
        };
    }

    componentWillMount() {
    }

    /**
     * 这个方法是为了在内部更改完车牌号回退是列表能够刷新
     * */
    backRender(){
        this.refs.list.reInitFetch();
    }

    goToDetail(carId) {
        this.props.router.push(CarDetail, {nav: {
            carId: carId ,
            backRender: this.backRender.bind(this)
        }});
    }

    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner
                    {...this.props}
                    title="搜索车辆"
                />
                <LabelInput
                    style = {[estyle.borderBottom, estyle.marginBottom]}
                    placeholder='请输入司机姓名、VIN或车牌号'
                    labelSize="0"
                    autoFocus={true}
                    ref="key"
                    rightView={<IconSearch color={Env.color.note}/>}
                    onChangeText={(key) => {this.setState({key})}}/>
                <PageList
                    ref="list"
                    style={estyle.fx1}
                    reInitField={[this.state.key]}
                    renderRow={(row) => {
                        return <MyCarItem data={row} onPress={() => this.goToDetail(row.carId)}/>
                    }}
                    pageSize={5}
                    fetchData={(pageNumber, pageSize) => {
                        return queryRealTimeCarList(pageNumber, pageSize, this.state.key)
                    }}
                />
            </View>
        )
    }

}