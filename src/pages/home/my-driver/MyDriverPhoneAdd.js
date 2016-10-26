/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/25 手机联系人添加
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	Image,
	StyleSheet
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import ConfirmButton from '../../../components/ConfirmButton';
import Env from '../../../utils/Env';
const estyle = Env.style;
export default class MyDriverPhoneAdd extends Component {
	render() {
		return (
			<View>
				<TopBanner {...this.props} title="通讯录添加"/>
				<View style={[estyle.fx1]}>
					<ScrollView>
						<View style={[estyle.padding]}>
							<Text style={estyle.text}>A</Text>
						</View>
						<View style={[estyle.fxRow,estyle.borderBottom,estyle.cardBackgroundColor,estyle.padding]}>
							<View style={estyle.fxCenter}>
								<Image
									style={{borderRadius:100,width:40,height:40,borderWidth:4 * Env.font.base,
										borderColor:'#85C7E7',}}
									source={require('../../../assets/images/icon-1.png')}
								/>
							</View>
							<View style={[estyle.fxColumnCenter,estyle.marginLeft]}>
								<Text style={estyle.text}>阿华</Text>
							</View>
							<View style={[estyle.fxColumnCenter,estyle.marginLeft,estyle.fx1]}>
								<Text style={estyle.note}>13910158743</Text>
							</View>
							<View style={[estyle.fxRow,estyle.padding]}>
								<Text style={styles.noteBlue}>选择</Text>
							</View>
						</View>
						<View style={[estyle.fxRow,estyle.borderBottom,estyle.cardBackgroundColor,estyle.padding]}>
							<View style={estyle.fxCenter}>
								<Image
									style={{borderRadius:100,width:40,height:40,borderWidth:4 * Env.font.base,
										borderColor:'#85C7E7',}}
									source={require('../../../assets/images/icon-1.png')}
								/>
							</View>
							<View style={[estyle.fxColumnCenter,estyle.marginLeft]}>
								<Text style={estyle.text}>阿华</Text>
							</View>
							<View style={[estyle.fxColumnCenter,estyle.marginLeft,estyle.fx1]}>
								<Text style={estyle.note}>13910158743</Text>
							</View>
							<View style={[estyle.fxRow,estyle.padding]}>
								<Text style={styles.noteBlue}>选择</Text>
							</View>
						</View>
						<View style={[estyle.padding]}>
							<Text style={estyle.text}>B</Text>
						</View>
						<View style={[estyle.fxRow,estyle.borderBottom,estyle.cardBackgroundColor,estyle.padding]}>
							<View style={estyle.fxCenter}>
								<Image
									style={{borderRadius:100,width:40,height:40,borderWidth:4 * Env.font.base,
										borderColor:'#85C7E7',}}
									source={require('../../../assets/images/icon-1.png')}
								/>
							</View>
							<View style={[estyle.fxColumnCenter,estyle.marginLeft]}>
								<Text style={estyle.text}>白鹭</Text>
							</View>
							<View style={[estyle.fxColumnCenter,estyle.marginLeft,estyle.fx1]}>
								<Text style={estyle.note}>13910158743</Text>
							</View>
							<View style={[estyle.fxRow,estyle.padding]}>
								<Text style={styles.noteBlue}>选择</Text>
							</View>
						</View>
						<View style={[estyle.fxRow,estyle.borderBottom,estyle.cardBackgroundColor,estyle.padding]}>
							<View style={estyle.fxCenter}>
								<Image
									style={{borderRadius:100,width:40,height:40,borderWidth:4 * Env.font.base,
										borderColor:'#85C7E7',}}
									source={require('../../../assets/images/icon-1.png')}
								/>
							</View>
							<View style={[estyle.fxColumnCenter,estyle.marginLeft]}>
								<Text style={estyle.text}>白洁</Text>
							</View>
							<View style={[estyle.fxColumnCenter,estyle.marginLeft,estyle.fx1]}>
								<Text style={estyle.note}>13910158743</Text>
							</View>
							<View style={[estyle.fxRow,estyle.padding]}>
								<Text style={styles.noteBlue}>选择</Text>
							</View>
						</View>
						<View style={[estyle.padding]}>
							<Text style={estyle.text}>D</Text>
						</View>
						<View style={[estyle.fxRow,estyle.borderBottom,estyle.cardBackgroundColor,estyle.padding]}>
							<View style={estyle.fxCenter}>
								<Image
									style={{borderRadius:100,width:40,height:40,borderWidth:4 * Env.font.base,
										borderColor:'#85C7E7',}}
									source={require('../../../assets/images/icon-1.png')}
								/>
							</View>
							<View style={[estyle.fxColumnCenter,estyle.marginLeft]}>
								<Text style={estyle.text}>杜杜</Text>
							</View>
							<View style={[estyle.fxColumnCenter,estyle.marginLeft,estyle.fx1]}>
								<Text style={estyle.note}>13910158743</Text>
							</View>
							<View style={[estyle.fxRow,estyle.padding]}>
								<Text style={estyle.note}>已添加</Text>
							</View>
						</View>
						<View style={[estyle.fxRow,estyle.borderBottom,estyle.cardBackgroundColor,estyle.padding]}>
							<View style={estyle.fxCenter}>
								<Image
									style={{borderRadius:100,width:40,height:40,borderWidth:4 * Env.font.base,
										borderColor:'#85C7E7',}}
									source={require('../../../assets/images/icon-1.png')}
								/>
							</View>
							<View style={[estyle.fxColumnCenter,estyle.marginLeft]}>
								<Text style={estyle.text}>杜鑫</Text>
							</View>
							<View style={[estyle.fxColumnCenter,estyle.marginLeft,estyle.fx1]}>
								<Text style={estyle.note}>13910158743</Text>
							</View>
							<View style={[estyle.fxRow,estyle.padding]}>
								<Text style={estyle.note}>等待接受</Text>
							</View>
						</View>
					</ScrollView>
				</View>

			</View>
		);
	}
}
const styles = StyleSheet.create({
	noteBlue:{
		fontSize:Env.font.note,
		color:Env.color.main
	}
});