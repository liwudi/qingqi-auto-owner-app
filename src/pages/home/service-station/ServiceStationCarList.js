/**
 * Created by linyao on 2017/4/28.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    RefreshControl
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import {driverCarList, setCurrentCar} from '../../../services/AppService';
const estyle = Env.style;
import Item from './components/MyCarItem'
import NoCar from '../my-car/components/NoCar'
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import {IconCheckMark} from '../../../components/Icons';
import { getUserDetail , getCouponNum } from '../../../actions/UserActions';

class ServiceStationCarList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    finaliy() {
        this.setState({
            isRefreshing: false
        });
    }

    fetchData() {
        this.setState({isRefreshing: true});
        this.props.dispatch(getUserDetail());
        driverCarList()
            .then((data) => {
                this.setState({'selecting': false, data: data});
            })
            .catch(this.finaliy.bind(this))
            .finally(this.finaliy.bind(this));
    };

    onRefresh() {
        this.fetchData();
    }

    componentWillMount() {
        this.fetchData();
    }

    selectCar(carItem) {
        this.props.selectCar(carItem);
        this.props.router.pop();
    }

    renderList() {
        let data = this.state.data;
        if(data === undefined || data.list === undefined) return ;
        return data.list.map((item, idx) => {
            item.status && (this.defaultCarId = item.carId);
            return <ViewForRightArrow key={idx}
                                      rightIcon={this.state.selecting && IconCheckMark}
                                      iconSize={this.state.selecting && Env.vector.checked.size.large}
                                      onPress={this.selectCar.bind(this, item)}
                                      iconColor={(this.state.selecting && this.state.carId == item.carId) && Env.color.auxiliary}
            ><Item
                router={this.props.router}
                data={item}/>
            </ViewForRightArrow>;
        })
    }

    renderView() {
        if (this.state.data) {
            return this.state.data.list.length ? this.renderList() : <NoCar  {...this.props}/>;
        }
        return <View/>;
    }


    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner
                    {...this.props}
                    title="选择预约车辆"
                />
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
        )
    }
}

export default connect(function(stores) {
    return { userStore: stores.userStore }
})(ServiceStationCarList);