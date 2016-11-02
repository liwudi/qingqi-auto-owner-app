/**
 * Created by ligj on 2016/10/9.
 * edit by zhaidongyou on 2016/10/13
 */
import React, {Component} from 'react';
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
import Button from '../../../components/widgets/Button'
import Item from './components/MyCarItem'
import NoCar from './components/NoCar'
import CarDetail from './CarDetail';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import {IconCheckCircle} from '../../../components/Icons';

export default class MyCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selecting : false,
            carId : '1'
        };
    }
    finaliy() {
        this.setState({isRefreshing: false});
        this.setState({selecting: false});
        this.setState({carId: this.defaultCarId});
    }

    fetchData() {
        this.setState({isRefreshing: true});
        driverCarList()
            .then((data)=>{
   /*             console.info('--------------------')
                console.info(data)*/
                this.setState({'selecting': false});
                this.setState({data});}
                )
            .catch(this.finaliy.bind(this))
            .finally(this.finaliy.bind(this));
    };
    onRefresh() {
        this.fetchData();
    }

    componentWillMount() {
        this.fetchData();
    }
    setCar() {
        if(this.state.selecting) {
            if(this.defaultCarId != this.state.carId) {
                this.setState({isRefreshing: true});
                setCurrentCar(this.state.carId)
                    .then(this.fetchData.bind(this))
                    .catch(this.finaliy.bind(this));

            } else {
                this.setState({'selecting': false});
            }
        } else {
            this.setState({'selecting': !this.state.selecting});
        }
    }
    goToDetail(carId) {
        this.props.router.push(CarDetail, {nav: {carId: carId}});
    }
    selectCar(carId) {
        if(this.state.selecting) {
            this.setState({'carId': carId});
        } else {
            this.goToDetail(carId);
        }
    }

    renderList() {
        let data = this.state.data;
        return data.list.map((item, idx) => {
            item.status && !this.defaultCarId && (this.defaultCarId = item.carId);
   /*         console.info(this.defaultCarId)
            console.info(item)*/
            return <ViewForRightArrow key={idx}
                rightIcon={this.state.selecting && IconCheckCircle}
                onPress={this.selectCar.bind(this, item.carId)}
                                      iconColor={(this.state.selecting && this.state.carId == item.carId) && Env.color.auxiliary}
            ><Item
                router={this.props.router}
                data={item}/>
            </ViewForRightArrow>;
        })
    }

    renderView() {
        if(this.state.data) {
            return this.state.data.list.length ? this.renderList() : <NoCar/>;
        }
        return <View/>;
    }
    
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner
                    {...this.props}
                    title="我的车辆"
                    rightView={<Button onPress={this.setCar.bind(this)}><Text style={{color: Env.color.navTitle, fontSize: Env.font.text}}>{this.state.selecting ? '完成' : '设置当前车辆'}</Text></Button>}
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