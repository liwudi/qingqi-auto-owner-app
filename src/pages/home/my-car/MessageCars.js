/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

import Env from '../../../utils/Env';
import PageList from '../../../components/PageList';
import {queryCarCondition} from '../../../services/MonitorService';
import StatusItem from '../monitor/components/StatusItem';
import TopBanner from '../../../components/TopBanner';
import {IconCall} from '../../../components/Icons';
import ConfirmButton from '../../../components/ConfirmButton';
import Button from '../../../components/widgets/Button';

const estyle = Env.style;
export default class MessageCars extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.props.nav.doBack && this.props.nav.doBack();
    }

    render() {
        return (
			<View style={[estyle.containerBackgroundColor,estyle.fx1]}>
				<TopBanner {...this.props} title={this.props.nav.carCode}/>
				<PageList
					style={[estyle.fx1]}
					renderRow={(row) => {
                        return <StatusItem data={row} />;
                    }}
					fetchData={(pageNumber, pageSize) => {
                        return queryCarCondition(pageNumber,10, this.props.nav.carId);
                    }}
				/>
				<View style={[{height:150* Env.font.base}]} />
                <View style={[estyle.cardBackgroundColor,{width: Env.screen.width,position:'absolute',bottom:0,left:0}]}>
                    <View style={[estyle.fxRow,estyle.fxCenter,estyle.paddingTop]}>
                        <Text style={[estyle.articleTitle]}>联系司机</Text>
                    </View>
                    {
                        (this.props.nav.data.mainDriverPhoneNum || this.props.nav.data.subDriverPhoneNum) ?
                            <View style={[estyle.fxRow,estyle.fxCenter,estyle.padding,]}>
                                {
                                    this.props.nav.data.mainDriverPhoneNum
                                        ?  <Button onPress={()=>{
                                                this.props.callTo(this.props.nav.data.mainDriverPhoneNum)
                                            }}
                                                   style={[styles.border,{width: Env.screen.width*0.4,height:Env.font.base*52}]}>
                                            <Text style={[{color:Env.color.main}]}>{this.props.nav.data.mainDriver +''+ this.props.nav.data.mainDriverPhoneNum}</Text></Button>
                                        : null
                                }
                                {
                                    this.props.nav.data.subDriverPhoneNum
                                        ? <Button onPress={()=>{
                                                this.props.callTo(this.props.nav.data.subDriverPhoneNum)
                                          }}
                                                  style={[estyle.marginLeft, styles.border,{width: Env.screen.width*0.4,height:Env.font.base*52}]}>
                                            <Text style={[{color:Env.color.main}]}>{this.props.nav.data.subDriver +''+ this.props.nav.data.subDriverPhoneNum}</Text></Button>
                                        : null
                                }
                            </View> : <View style={[estyle.fxCenter]}><Text style={[estyle.text]}>暂无司机</Text></View>
                    }
                </View>
			</View>
        );
    }
}
const basefont=Env.font.base;
const styles = StyleSheet.create({
    border: {
        borderWidth: basefont * 2,
        borderRadius: basefont * 5,
        borderColor:Env.color.main
    }
});