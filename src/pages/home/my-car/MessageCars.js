/**
 * Created by ligj on 2016/10/9.
 */
import React, {Component} from 'react';
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

    callTo(number){
        this.props.callTo(number);
    }

    renderPhoneView() {
        let data = this.props.nav.data;
        let text = <Text style={[estyle.text]}>暂无司机</Text>,
            view = text,
            hasDriver = data.mainDriverPhoneNum || data.subDriverPhoneNum,
            hasSplit = data.mainDriverPhoneNum && data.subDriverPhoneNum;
        if (hasDriver) {
            text = <Text style={[estyle.articleTitle, estyle.paddingBottom, {textAlign: 'center'}]}>联系司机</Text>;
            let mbtn = data.mainDriverPhoneNum ? <Button style={styles.btn} onPress={()=>{this.callTo(data.mainDriverPhoneNum)}}>
                    <Text style={[estyle.text, {color: Env.color.main}]}>{data.mainDriver}</Text>
                    <Text style={[estyle.text, {color: Env.color.main}]}>{data.mainDriverPhoneNum}</Text>
                </Button> : null,
                sbtn = data.subDriverPhoneNum ? <Button style={styles.btn} onPress={()=>{this.callTo(data.subDriverPhoneNum)}}>
                    <Text style={[estyle.text, {color: Env.color.main}]}>{data.subDriver}</Text>
                    <Text style={[estyle.text, {color: Env.color.main}]}>{data.subDriverPhoneNum}</Text>
                </Button> : null;
            view = <View>
                {text}
                <View style={[estyle.fxRow, estyle.fxCenter]}>
                    {mbtn}{hasSplit ? <Text style={estyle.marginRight}/> : null}{sbtn}
                </View>
            </View>;
        }
        return <View style={[estyle.cardBackgroundColor, estyle.paddingVertical, estyle.fxCenter]}>{view}</View>;
    }

    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title={this.props.nav.carCode}/>
                <PageList
                    style={[estyle.fx1]}
                    renderRow={(row) => {
                        return <StatusItem data={row}/>;
                    }}
                    fetchData={(pageNumber, pageSize) => {
                        return queryCarCondition(pageNumber, 10, this.props.nav.carId);
                    }}
                />
                {this.renderPhoneView()}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    btn: {
        ...estyle.border,
        ...estyle.fxCenter,
        borderColor: Env.color.main, borderRadius: Env.font.base * 4,
        width: Env.screen.width * .4
    }
});