/**
 * Created by cryst on 2016/10/10.
 */
import React, {Component} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import StarGroup from '../../../../components/StarGroup'
import Icon from 'react-native-vector-icons/Entypo';
import ViewForRightArrow from '../../../../components/ViewForRightArrow'
import Env from '../../../../utils/Env';
import imgsrc from '../../../../assets/images/noPic.png';
const estyle = Env.style;
export default class ImgButton extends Component {
    _onPress() {
    }
    getLevel(value){
        let type;
        switch (value){
            case 3 : type='三星服务站'; break;
            case 4 : type='四星服务站'; break;
            case 5 : type='五星服务站'; break;
            case 6 : type='核心服务站'; break;
        }
        return type;
    }

    render() {
        let data = this.props.data;
        return (
            <ViewForRightArrow onPress={this.props.onPress} {...this.props}>
                <View style={[estyle.fxRow,estyle.fxCenter]}>
                    <View style={[styles.image]}>
                        <Image source={{uri:data.photo || './'} }
                               style={[styles.image, estyle.border,{position:'absolute',top:0,left:0,zIndex:100}]} />
                        <Image source={imgsrc}
                               style={[styles.image, estyle.border]} />
                    </View>
                    <View style={styles.infoContainer}>
                        <Text numberOfLines={1} style={[estyle.text,{color:Env.color.important}]}>{this.props.number}.{data.name}</Text>
                        <View style={styles.starContainer}>
                            <View style={{backgroundColor:Env.color.auxiliary,borderRadius:basefont*5,paddingHorizontal:basefont* 4}}>
                                <Text style={[estyle.note,{color:'#fff'}]}>{ data.level}</Text>
                            </View>
                            {
                                data.central ? <View style={{backgroundColor:Env.color.auxiliary,borderRadius:basefont*5,paddingHorizontal:basefont* 4,marginLeft:basefont * 30}}>
                                    <Text style={[estyle.note,{color:'#fff'}]}>{ data.central}</Text>
                                </View> : <View/>
                            }
                            <Text style={[estyle.note,{marginLeft:basefont * 30}]}>{data.distance || '-- '}km</Text>
                        </View>
                        <View style={styles.adrContainer}>
                            <Icon name="location-pin" size={16} color='#bbb' style={styles.location}/>
                            <View style={{flex: 1}}>
                                <Text numberOfLines={1} style={[{fontSize:Env.font.note,color: Env.color.note}]}>{data.address}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ViewForRightArrow>
        );
    }
}

const basefont = Env.font.base;
const styles = StyleSheet.create({
    image: {
        width: basefont * 200, //200,120 是设计中的图片尺寸
        height: basefont * 120
    },
    infoContainer: {
        flex: 1,
        marginLeft: basefont * 16
    },
    textKm: {
        fontSize: Env.font.text,
        color: Env.color.note,
        flex: 1,
        marginLeft: basefont * 16
    },
    starContainer: {
        flexDirection: 'row',
        marginVertical: basefont * 10,
        marginLeft: basefont * 10,
    },
    adrContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    location: {
        marginTop: basefont * 3,
        marginRight: basefont * 4
    }
});

