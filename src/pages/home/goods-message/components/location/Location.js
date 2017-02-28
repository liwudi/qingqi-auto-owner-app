import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import Button from '../../../../../components/widgets/Button';
import {IconLocationMarker}  from '../../../../../components/Icons';
import {getInverseGeocoding} from '../../../../../services/GeoService';
import {geolocation} from './Geolocation';
import Env from '../../../../../utils/Env';
const estyle = Env.style;
export default class Area extends Component {
    constructor() {
        super();
        this.state = {
            location: global.location || '',
            info: global.info || []
        }
    }

    setInfo(data) {
        console.info(data)
        let province = data.province,
            city = data.city,
            area = data.dist,
            isMc = province.value === '直辖市';
        let location = `${isMc ? '' : province.value}${city.value}${area.value}`;
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

        this.setState({location, info}, () => {
            global.location = location;
            global.info = info;
        });
    }

    error(error) {
        console.info('error')
        console.info(error)
    }

    componentDidMount() {
        if (this.state.location) return;
        geolocation().then((position) => {
            getInverseGeocoding(position.longitude, position.latitude).then((data={}) => {
                if(!data.resultCode) {
                    this.setInfo(data);
                }
            }, (error) => this.error);
        }, (error) => this.error);
    }

    goToList() {
        let info = this.state.info || [];
    //    console.info('--------------info', info)
        if (info.length) {
            this.props.set(this.state.info);
            this.props.router.pop();
        }
    }

    renderLocation() {
        let color = this.state.location ? Env.color.main : Env.color.note,
            text = <Text style={[estyle.text, {color: Env.color.main}]} numberOfLines={1}>
                <IconLocationMarker size={Env.font.base * 30} color={Env.color.main}/><Text> </Text>
                当前位置：<Text style={[estyle.text, {color: color}]}>{this.state.location || '正在定位中...'}</Text>
            </Text>,
            view = text;
        if (this.state.location) {
            view = <Button style={[{alignItems: 'flex-start'}]} onPress={()=> {
                this.goToList();
            }}>{text}</Button>;
        }
        return view;
    }

    render() {
        return (
            <View style={[estyle.cardBackgroundColor, estyle.padding, estyle.borderBottom]}>
                {this.renderLocation()}
            </View>
        )
    }
}