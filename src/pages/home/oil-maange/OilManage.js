/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/25
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Image
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import * as Icons from '../../../components/Icons';
import ConfirmButton from '../../../components/ConfirmButton';
import Env from '../../../utils/Env';
const estyle = Env.style;
export default class OilManage extends Component {
	render() {
		return (
			<View style={estyle.containerBackgroundColor}>
				<TopBanner {...this.props} title="油耗管理"/>
				<View style={[estyle.fxRow,estyle.fxCenter,estyle.padding]}>
					<View style={[estyle.fx1,estyle.fxRow,estyle.fxCenter]}>
						<Icons.IconCaretLeft style={styles.textBlue}/>
						<Text style={[styles.textBlue]}>上一周</Text>
					</View>
					<View style={[estyle.fx1,estyle.fxRow,estyle.fxCenter]}>
						<Text style={[estyle.note]}>下一周</Text>
						<Icons.IconCaretRight style={estyle.note}/>
					</View>
				</View>
				<View style={estyle.fxCenter}>
					<Image
						style={{width:200,height:100,borderWidth:4 * Env.font.base,
							borderColor:'#85C7E7',}}
						source={require('../../../assets/images/icon-1.png')}
					/>
				</View>
				<View style={estyle.padding}><Text>线路油耗详情</Text></View>
				<View style={estyle.fx1}>
					<View style={[estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
						<Text style={styles.articleBlue}>北京----青岛</Text>
						<View style={[estyle.fxRow]}>
							<View style={[estyle.fx1,estyle.text,estyle.paddingTop]}>
								<Text>总油耗：120.3L</Text>
								<Text>平均油耗：30.6L/100KM</Text>
							</View>
							<View style={[estyle.paddingRight,estyle.text,estyle.paddingTop]}>
								<Text style ={{textAlign:'right'}}>承运车辆数：4辆</Text>
								<Text style ={{textAlign:'right'}}>活跃车辆数：2辆</Text>
							</View>
						</View>
					</View>
					<View style={[estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
						<Text style={styles.articleBlue}>北京----青岛</Text>
						<View style={[estyle.fxRow]}>
							<View style={[estyle.fx1,estyle.text,estyle.paddingTop]}>
								<Text>总油耗：120.3L</Text>
								<Text>平均油耗：30.6L/100KM</Text>
							</View>
							<View style={[estyle.paddingRight,estyle.text,estyle.paddingTop]}>
								<Text style ={{textAlign:'right'}}>承运车辆数：4辆</Text>
								<Text style ={{textAlign:'right'}}>活跃车辆数：2辆</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	articleBlue:{
		fontSize:Env.font.articleTitle,
		color:Env.color.main
	},
	textBlue:{
		fontSize:Env.font.note,
		color:Env.color.main
	}
});