/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/25 油耗管理 车辆列表
 *  Edit by zhaidongyou on 2016/11/7 添加逻辑
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
const estyle = Env.style;
import PageList from '../../../components/PageList';
import {statisOilwearForOneRoute,viewStandard,statisOilwearForNoRoute} from '../../../services/AppService';
import OilManageSetMark from './OilManageSetMark';
import OilManageShowMark from './OilManageShowMark';
import BorderButton from '../../../components/BorderButton';
import Toast from '../../../components/Toast';
import ManageCarItem from './components/ManageCarItem';

export default class OilManageCarList extends Component {
	constructor(props) {
		super(props);
		this.state={
			statisDate: this.props.date.format('YYYYMMDD'),
			routeId: this.props.routeId,
            flag: 1 // 1是查看标杆 2是设置标杆
		}
	}

    toPage = (component, props = {}) => {
        this.props.router.push(component, {
			...props,
            routeId: this.props.routeId,
            routeName: this.props.routeName,
            date: this.props.date,
            backFuns:[this.setFlag.bind(this),this.backRender.bind(this),this.props.updata.bind(this)]
		});
    };

    setFlag(num) {
        this.setState({flag:num})
    }

    componentDidMount(){
    	if(this.props.lineInfo){
            !this.props.lineInfo.carId && this.setFlag(2);
		}else {
            this.setFlag(3);
		}
    }
    /**
     * 这个方法是为了在内部更改完车牌号回退是列表能够刷新
     * */
    backRender(){
        this.setState({
            isRender: new Date().getTime()
        })
    }


    setRightView(){
        if(this.state.flag == 1){
            return <View>
                <BorderButton color="#FFF" onPress = {() => this.toPage(OilManageShowMark,{...this.props})}>查看标杆</BorderButton>
            </View>
        }else if(this.state.flag == 2){
            return <View>
                <BorderButton color="#FFF" onPress = {() => {
                	if(this.data && this.data.list.length) {
						this.toPage(OilManageSetMark,{...this.props})
					} else {
						Toast.show('当前没有车辆',Toast.SHORT);
					}
				}}>设定标杆</BorderButton>
            </View>
        }else { return null }
    }

	render() {
		return (
			<View style={[estyle.fx1,estyle.containerBackgroundColor]}>
				<TopBanner
					{...this.props}
					title="车辆列表"
					rightView={ this.setRightView.bind(this)()}
				/>
				<View style={estyle.fx1}>
					<PageList
						style={[estyle.cardBackgroundColor, estyle.fx1]}
                        reInitField={[this.state.isRender]}
						renderRow={(list) => {
							return (
                            	<ManageCarItem data={list} />
							)
						}}
						fetchData={(pageNumber, pageSize) => {
							var fun = this.state.routeId ? statisOilwearForOneRoute : statisOilwearForNoRoute;
							return fun(pageNumber, pageSize,this.state.routeId,this.state.statisDate).then((data={list:[]}) => {
								this.data = data;
								return data;
							});
						}}
					/>
				</View>
			</View>
		);
	}
}
