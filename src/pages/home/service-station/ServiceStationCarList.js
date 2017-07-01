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
import { queryRealTimeCarList } from '../../../services/MonitorService';
const estyle = Env.style;
import Item from './components/MyCarItem'
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import {IconCheckMark} from '../../../components/Icons';
import { getUserDetail , getCouponNum } from '../../../actions/UserActions';
import PageList from '../../../components/PageList';

class ServiceStationCarList extends Component {
    constructor(props) {
        super(props);
        this.state={
            doing:false
        }
    }

    fetchData() {
        this.props.dispatch(getUserDetail());
    };

    componentDidMount() {
        this.fetchData();
    }


    selectCar(carItem) {
        if(this.state.doing) return;
        this.setState({doing:true},()=>{
            this.props.selectCar(carItem);
            this.setState({doing:false});
            this.props.router.pop();
        })
    }

    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner
                    {...this.props}
                    title="选择预约车辆"
                />
                <PageList
                    ref='pagelist'
                    style={estyle.fx1}
                    renderRow={(row) => {
                        return (
                            <ViewForRightArrow
                                onPress={()=>{this.selectCar(row)}}
                            ><Item data={Object.assign(row,{mainDriver:row.mastDriver,subDriver:row.slaveDriver,carVin:row.vin})}/>
                            </ViewForRightArrow>
                        )
                    }}
                    fetchData={(pageNumber, pageSize)=>{
                        return queryRealTimeCarList(pageNumber,pageSize)
                    }}
                />
            </View>
        )
    }
}

export default connect(function(stores) {
    return { userStore: stores.userStore }
})(ServiceStationCarList);