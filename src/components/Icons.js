/**
 * Created by ligj on 2016/10/11.
 */
import React from 'react';

import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMater from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Env from '../utils/Env';

const size = Env.font.navTitle;
const color = Env.color.text;

export class IconSearch extends React.Component {
	render(){
		return (
			<IconEntypo name="magnifying-glass" size={size} color={color} {...this.props}/>
		)
	}
}
/**
 * 地图
 */
export class IconMap extends React.Component {
	render(){
		return (
			<IconEntypo name="map" size={size} color={color} {...this.props}/>
		)
	}
}
/**
 * 右箭头 >
 */
export class IconArrowRight extends React.Component {
	render(){
		return (
			<IconEntypo name="chevron-thin-right" size={size} color={color} {...this.props}/>
		)
	}
}
/**
 * 左箭头 <
 */
export class IconArrowLeft extends React.Component {
	render(){
		return (
			<IconEntypo name="chevron-thin-left" size={size} color={color} {...this.props}/>
		)
	}
}

//ios-call-outline
export class IconCall extends React.Component {
	render(){
		return (
			<IconIonicons name="ios-call-outline" size={size} color={color} {...this.props}/>
		)
	}
}
export class IconWarning extends React.Component {
	render(){
		return (
			<IconEntypo name="warning" size={size} color={color} {...this.props}/>
		)
	}
}
/**
* 向下箭头
* */
export  class IconArrowDown extends React.Component {
	render(){
		return(
			<IconMater name="keyboard-arrow-down" size={size} color={color} {...this.props} />
		)
	}
}

/**
 * close
 * */
export  class IconClose extends React.Component {
	render(){
		return(
			<IconFontAwesome name="close" size={size} color={color} {...this.props} />
		)
	}
}

/**
 * location
 * */
export  class IconLocation extends React.Component {
	render(){
		return(
			<IconFontAwesome name="location-arrow" size={size} color={color} {...this.props} />
		)
	}
}

/**
 * list
 * */
export  class IconList extends React.Component {
	render(){
		return(
			<IconFontAwesome name="list-ul" size={size} color={color} {...this.props} />
		)
	}
}

export  class IconEye extends React.Component {
	render(){
		return(
			<IconIonicons name="ios-eye-outline" size={size} color={color} {...this.props} />
		)
	}
}

export  class IconEyeOff extends React.Component {
	render(){
		return(
			<IconIonicons name="ios-eye-off-outline" size={size} color={color} {...this.props} />
		)
	}
}
/**
 * user
 * */
export  class IconUser extends React.Component {
	render(){
		return(
			<IconFontAwesome name="user" size={size} color={color}  {...this.props} />
		)
	}
}
/**
 * add
 * */
export  class IconPlus extends React.Component {
	render(){
		return(
			<IconFontAwesome name="plus" size={size} color={Env.color.color} {...this.props} />
		)
	}
}

/**
 * fire
 * */
export  class IconFire extends React.Component {
	render(){
		return(
			<IconFontAwesome name="fire" size={size} color={color}  {...this.props} />
		)
	}
}

/**
 * 扫码
 * */
export  class IconBarcode extends React.Component {
	render(){
		return(
			<IconIonicons name="md-barcode" size={size} color={color}  {...this.props} />
		)
	}
}