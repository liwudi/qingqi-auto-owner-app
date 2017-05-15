/**
 * Created by linyao on 2017/4/10.
 */
import React from 'react';

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Navigator, Image
} from 'react-native';

import Swiper from 'react-native-swiper';
import Env from '../utils/Env';
import {getBannerInfo} from '../services/AppService';
import serviceStationDefault from '../assets/images/serviceStationDefault.png';
import defaultBanner from '../assets/images/defaultBanner.png';
import BannerWebView from '../pages/home/BannerWebView';
const estyle = Env.style;

export default class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerList: []
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        getBannerInfo()
            .then((data) => {
                this.setState({bannerList: data})
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    gotoWebView(page){
        this.props.router.push(BannerWebView,{uri: page.bannerLink,title: page.bannerName || '推广',...this.props})
    }

    renderView() {
        if (!this.state.bannerList || this.state.bannerList.length < 1) {
            return <View {...this.props} style={{height: 300 * basefont}}>
                <Image source={defaultBanner} style={[styles.image]}/>
            </View>
        }
        return <View {...this.props} >
            <Swiper height={300 * basefont} autoplay={true} autoplayTimeout={4} paginationStyle={{bottom:5}}>
                {this.state.bannerList.map((item, index) => {
                    return <TouchableOpacity key={index} style={[styles.image]} onPress={()=>{this.gotoWebView(item)}}>
                        {
                            item.imgPath ? <Image source={{uri: item.imgPath} }
                                                  style={[styles.image, {
                                                      position: 'absolute',
                                                      top: 0,
                                                      left: 0,
                                                      zIndex: 100
                                                  }]}/> : null
                        }
                        <Image source={serviceStationDefault}
                               style={[styles.image]}/>
                    </TouchableOpacity>
                })}
            </Swiper>
        </View>
    }

    render() {
        return (
            this.renderView()
        );
    }
}

const basefont = Env.font.base;

const styles = StyleSheet.create({
    wrapper: {
        height: 300 * basefont,
        backgroundColor: 'black',
        zIndex: 100
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300 * basefont
    },
    image: {
        height: 300 * basefont,
        width: Env.screen.width
    }
})