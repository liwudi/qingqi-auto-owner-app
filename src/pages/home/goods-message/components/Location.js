import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import Button from '../../../../components/widgets/Button';
import {IconLocationMarker}  from '../../../../components/Icons';
import {getInverseGeocoding} from '../../../../services/GeoService';
import Toast from '../../../../components/Toast';
import {geolocation} from '../../../../components/location/Geolocation';
import Env from '../../../../utils/Env';
const estyle = Env.style;
export default class Area extends Component {
    constructor() {
        super();
        this.state = {}
    }

    setInfo(data) {
        console.info(data)
        let province = data.province,
            city = data.city,
            area = data.dist,
            isMc = province.value === '直辖市';
        let address = `${isMc ? '' : province.value}${city.value}${area.value}`;
        let info = [];
        if (isMc) {
            let name = city.value.replace('市', '');
            info.push({
                first: false,
                name: name,
                current: {code: province.code, level: 1, name: name},
                query: {code: '0', level: 1}
            });
            info.push({
                first: false,
                name: area.value,
                current: {code: area.code, name: area.value, level: 3},
                query: {level: 3, name: name, code: city.code}
            });

        } else {
            let name = province.value.replace('省', '');
            info.push({
                first: false,
                name: name,
                current: {code: province.code, name: name, level: 1},
                query: {code: '0', level: 1},

            });
            info.push({
                first: false,
                name: city.value,
                current: {code: province.code, name: city.value, level: 2},
                query: {code: province.code, level: 2, name: name},
            });
            if(area && area.value) {
                info.push({
                    first: false,
                    name: area.value,
                    current: {code: area.code, name: area.value, level: 3},
                    query: {level: 3, name: city.value, code: city.code}
                });
            }

        }
        info.tag = 'start';

        this.setState({address, info}, () => {
            global.gmAddress = address;
            global.gmInfo = info;
        });
    }

    fetchData = () => {
        let address = global.gmAddress || '';
        if(address) {
            this.setState({address: address});
        } else {
            geolocation().then((coords) => {
                getInverseGeocoding(coords.longitude, coords.latitude).then((data={}) => {
                    if(!data.resultCode) {
                        this.setInfo(data);
                    }
                }, (error) => {
                    Toast.show(error, Toast.SHORT);
                })
            });
        }
    }

    componentDidMount() {
        if(this.props.tag === 'start') {
            this.fetchData();
        }
    }

    componentWillUnmount() {
    }
    goToList = () => {
        let info = this.state.info || global.gmInfo;
        if (info.length) {
            this.props.set(info);
            this.props.router.pop();
        }
    }

    renderAddress() {
        let view = <View/>;
        if(this.state.address) {
            view = <View style={[estyle.cardBackgroundColor, estyle.padding, estyle.borderBottom, estyle.marginBottom]}>
                <Button style={[{alignItems: 'flex-start'}]} onPress={this.goToList}>
                    <Text style={[estyle.text, {color: Env.color.main}]} numberOfLines={1}>
                        <IconLocationMarker size={Env.font.base * 30} color={Env.color.main}/>
                        <Text> </Text>
                        当前位置：
                        <Text style={[estyle.text, {color: Env.color.main}]}>{this.state.address}</Text>
                    </Text></Button>
            </View>
        }
        return view;
    }

    render() {
        return <View>
            {this.props.tag === 'start' ?  this.renderAddress() : <View/>}
        </View>
    }
}