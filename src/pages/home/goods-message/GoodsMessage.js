/**
 * Created by ligj on 2016/10/9.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';

import {goodsSourceList,userAuth,getCarGoDetail} from '../../../services/AppService';
import SetStartEnd from './SetStartEnd';
import SetCarModelLength from './SetCarModelLength';
import GoodsDetail from './GoodsDetail';
import PageList from '../../../components/PageList';
import Button  from '../../../components/widgets/Button';
import Item from './components/GoodsInfoItem';
import {IconArrowDown} from '../../../components/Icons'
import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
const estyle = Env.style;

import HomeRouter from '../../HomeRouter';
import MyInfoIndex from '../../userCenter/my-info/MyInfoIndex';
import UserCenterHome from '../../userCenter';
import Toast from '../../../components/Toast';
export default class GoodsMessage extends Component {


    constructor(props) {
        super(props);
        let current = {code: '', level: 1},
            query = {code: '0', level: 1},
            info = {
                current: {...current}, query: {...query}
            };

        this.startInfo = [{...info}];
        this.endInfo = [{...info}];
        if (global.locationInfo) {
            this.setStartInfo();
        } else {
            this.state = {
                startName: '',
                endName: '',
                options: {
                    startPoint: '0',//行政区码，传 0 时为不限
                    startLevel: 1,
                    endPoint: '0', //行政区码，传 0 时为不限
                    endLevel: 1,
                    carModel: '',
                    carLength: ''
                },
                locationAddress: ''
            };
        }
    }

    setStartInfo = () => {
        let info = [], locationAddress;
        if (global.gmInfo) {
            info = global.gmInfo;
            locationAddress = global.locationAddress;
        }
        else {
            let data = global.locationInfo;
            if(!(data.province && data.city && data.dist)){
                this.state = {
                    startName: '',
                    endName: '',
                    options: {
                        startPoint: '0',//行政区码，传 0 时为不限
                        startLevel: 1,
                        endPoint: '0', //行政区码，传 0 时为不限
                        endLevel: 1,
                        carModel: '',
                        carLength: ''
                    },
                    locationAddress: ''
                };
                return;
            }
            let province = data.province,
                city = data.city,
                area = data.dist,
                isMc = province.value === '直辖市';
            locationAddress = global.locationAddress = `${isMc ? '' : province.value}${city.value}${area.value}`;

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
                if (area && area.value) {
                    info.push({
                        first: false,
                        name: area.value,
                        current: {code: area.code, name: area.value, level: 3},
                        query: {level: 3, name: city.value, code: city.code}
                    });
                }
            }
        }

        this.startInfo = global.gmInfo = info;
        let key = info.length - 1,
            current = info[key].current;
        this.state = {
            startName: current.name,
            endName: '',
            options: {
                startPoint: current.code,//行政区码，传 0 时为不限
                startLevel: current.level,
                endPoint: '0', //行政区码，传 0 时为不限
                endLevel: 1,
                carModel: '',
                carLength: ''
            },
            locationAddress: locationAddress
        };
    }

    setStartEnd(isStart) {
        let title = isStart ? '选择始发地' : '选择目的地',
            tag = isStart ? 'start' : 'end';
        this.props.router.push(SetStartEnd, {
            locationAddress: isStart ? this.state.locationAddress : '',
            title: title,
            info: this[`${tag}Info`],
            set: (obj) => {
                console.info('list --------- list')
                console.info(obj.length)
                console.info(obj)

                let key = obj.length - 1,
                    current = obj[key].current;
                tag = obj.tag || tag;
                delete obj.tag;
                this[`${tag}Info`] = obj;

                this.setState({
                    [`${tag}Name`]: current.name,
                    options: Object.assign(this.state.options, {
                        [`${tag}Point`]: current.code,
                        [`${tag}Level`]: current.level
                    }),
                    random: Math.random()
                });
            }
        });
    }

    goToCarModelLength = () => {
        this.props.router.push(SetCarModelLength, {
            carModel: this.state.options.carModel,
            carLength: this.state.options.carLength,
            set: (obj) => {
                this.setState({
                    options: Object.assign(this.state.options, obj),
                    random: Math.random()
                });
            }
        });
    }

    renderCarModelLength() {
        let model = this.state.options.carModel,
            length = this.state.options.carLength,
            emptyEl = <Text style={estyle.text}>车型车长</Text>,
            mEl = null,
            lEl = null;
        if (model || length) {
            emptyEl = null;
            model && (mEl = <Text style={[estyle.text, {color: Env.color.main}]}>{`${model}`}</Text>)
            length && (lEl = <Text style={[estyle.text, {color: Env.color.main}]}>{`${length}米`}</Text>)
        }


        return <View style={[estyle.fxCenter]}>{emptyEl && emptyEl}{mEl && mEl}{lEl && lEl}</View>;
    }

    alert = (type) => {
        let mainMsg = '查看货源详情需要进行资料认证',confirmMsg = '去认证';
        if(type == 4) return;
        switch (parseInt(type)) {
            case 2 : mainMsg = '您的认证信息正在审核中请耐心等待'; confirmMsg = '查看详情'; break;
            case 5 : mainMsg = '您的认证信息已过期请更新信息'; confirmMsg = '去更新'; break;
            default : mainMsg = '查看货源详情需要进行资料认证';confirmMsg = '去认证';
        }
        this.props.alert(
            '提示', mainMsg, [
                {text: confirmMsg, onPress: this.goToMyInfo},
                {text: '取消'}
            ]
        )
        this.setState({doing: false})
    };

    goToMyInfo = () => {
        this.props.router.push(MyInfoIndex);
    }

    goToDetail = (data) => {
        if (data.dataSourcesCode == 1) {
            this.props.router.push(GoodsDetail, {
                nav: {
                    goodssourceid: data.goodsSourceId,
                    onlycode: data.onlyCode
                }
            });
            this.setState({doing: false});
        } else if (data.dataSourcesCode == 2) {
            let id = data.goodsSourceId;
            getCarGoDetail(id)
                .then((res) => {
                    this.props.router.push(GoodsDetail, {
                        url: res.url
                    });
                })
                .catch((e) => {
                    Toast.show(e.message, Toast.SHORT);
                })
                .finally(() => {
                    this.setState({doing: false})
                })
        }
    }

    clickItem = (data1) => {
        if(this.state.doing) return;
        this.setState({doing: true});
        userAuth(data1.dataSourcesCode).then((data) => {
            let validStatus = data.status;
            if (validStatus == 4) {
                this.goToDetail(data1);
            } else {
                this.alert(validStatus);
            }
        }).catch((e = {}) => {
            Toast.show(e.message, Toast.SHORT);
        });
    }

    renderNoData() {
        return <View><Text style={[estyle.marginFontBottom, estyle.text]}>该线路货源已经被抢光了,</Text><Text
            style={[{textAlign: 'center'}, estyle.text]}>换个线路试试吧！</Text></View>
    }

    render() {
        return (
            <View style={[estyle.fx1, estyle.containerBackgroundColor]}>
                {/*<TopBanner {...this.props} title="货源信息"/>*/}
                <View
                    style={[estyle.fxRow, estyle.cardBackgroundColor, estyle.marginBottom, estyle.border, {height: Env.font.base * 84}]}>
                    <Button style={[estyle.fxCenter, estyle.fx1, estyle.fxRow, {paddingHorizontal: Env.font.base * 10}]}
                            onPress={() => {
                                this.setStartEnd(true)
                            }}>
                        <Text
                            style={[estyle.text, {textAlign: 'center'}, this.state.startName && {color: Env.color.main}]}>{this.state.startName || '始发地'}</Text>
                        <IconArrowDown size={12}/>
                    </Button>
                    <Button
                        style={[estyle.borderRight, estyle.borderLeft, estyle.fxCenter, estyle.fx1, estyle.fxRow, {paddingHorizontal: Env.font.base * 10}]}
                        onPress={() => {
                            this.setStartEnd()
                        }}>
                        <Text
                            style={[estyle.text, {textAlign: 'center'}, this.state.endName && {color: Env.color.main}]}>{this.state.endName || '目的地'}</Text>
                        <IconArrowDown size={12}/>
                    </Button>
                    <Button style={[estyle.fxCenter, estyle.fx1, estyle.fxRow]}
                            onPress={this.goToCarModelLength}>
                        {this.renderCarModelLength()}
                        <IconArrowDown size={12}/>
                    </Button>
                </View>
                <View style={estyle.fx1}>
                    <PageList
                        ref="list"
                        noDataView={this.renderNoData()}
                        noMore="无更多货源信息"
                        style={estyle.fx1}
                        reInitField={[this.state.random]}
                        renderRow={(row) => {
                            return <Item
                                router={this.props.router}
                                data={row}
                                onPress={() => {
                                    this.clickItem(row)
                                }}
                            />
                        }}
                        fetchData={(pageNumber, pageSize) => {
                            /**
                             *因为货车帮的搜索条件与陆鲸不同，车辆类型加上车字就搜不到货源，所以查询时把车子过滤
                             */
                            let type = typeof(this.state.options.carModel) === 'string' &&  this.state.options.carModel.indexOf('车') >=0 ? this.state.options.carModel.substring(0,this.state.options.carModel.length-1) : this.state.options.carModel;
                            return goodsSourceList(
                                pageNumber,
                                pageSize,
                                Object.assign({},this.state.options,{carModel: type })
                            );
                        }}
                    />
                </View>
            </View>
        );
    }
}