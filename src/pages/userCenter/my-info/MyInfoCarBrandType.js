/**
 * Created by linyao on 2017/4/28.
 */
import React, {Component} from 'react';

import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    RefreshControl
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import {getCarGangCarBrandType} from '../../../services/AppService';
import Toast from '../../../components/Toast';
import ViewForRightArrow from '../../../components/ViewForRightArrow';

class MyInfoCarBrandType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing : true
        };
    }

    componentDidMount() {
       this.fetchData();
    }
    fetchData() {
        this.setState({isRefreshing: true}, () => {
            getCarGangCarBrandType()
                .then((data) => {
                    this.setState({carTypeList: data.list});
                })
                .catch((e) => {
                    Toast.show(e.messsage, Toast.SHORT);
                })
                .finally(() => {
                    this.setState({isRefreshing: false});
                })
        })
    }

    renderTypeList() {
       if(!this.state.carTypeList) return null;
       return this.state.carTypeList.map((item,index)=>{
           return <ViewForRightArrow key={index} onPress={()=>{ this.props.successFun({plateNumberType:item.name});this.props.router.pop()} }>
               <Text>{item.name}</Text>
           </ViewForRightArrow>
       })
    }

    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="车牌类型"/>
                <ScrollView style={[estyle.fx1]}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    colors={[Env.color.main]}
                                    progressBackgroundColor="#fff"
                                    onRefresh={ this.fetchData.bind(this) }
                                />
                            }
                >
                    {this.renderTypeList()}
                </ScrollView>
            </View>
        )
            ;
    }
}

const basefont = Env.font.base;
const estyle = Env.style;
const styles = StyleSheet.create({});

export default MyInfoCarBrandType